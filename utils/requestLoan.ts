import { GraphContextType, LoanType, UserType } from "types";
import mongoose, { ClientSession, Model } from "mongoose";
import {
  handleAdminAuth,
  handleError,
  CREDITS_LOANS_WITHDRAWALS_POPULATION,
  DEBITS_POPULATION,
} from ".";

const loanRequestTransaction = async (
  session: ClientSession,
  UserModel: Model<UserType>,
  {
    loan,
    userId,
  }: {
    loan: any;
    userId: mongoose.Types.ObjectId;
  }
) => {
  await session.withTransaction(async () => {
    try {
      await loan.save({ session });
      await UserModel.findByIdAndUpdate(
        userId,
        {
          $push: {
            loans: loan._id,
          },
        },
        { session }
      ).exec();
    } catch (error: any) {
      handleError(error, Error, error._message);
    }
  });
};

const requestLoan = async (
  _: any,
  { userId, amount }: { userId: mongoose.Types.ObjectId; amount: number },
  {
    LoanModel,
    UserModel,
    req: {
      headers: { authorization },
    },
  }: GraphContextType
): Promise<string> => {
  // only regular users can request loan
  handleAdminAuth(authorization!, false);
  // get user loans record
  const userLoans = (
    await UserModel.findById(userId)
      .select("loans")
      .populate(CREDITS_LOANS_WITHDRAWALS_POPULATION)
      .populate(DEBITS_POPULATION)
      .exec()
  )?.loans as LoanType[];
  // check if user is on loan
  const isLoanedBefore = userLoans.length > 0;
  // get last loan record
  const lastLoan = userLoans[userLoans.length - 1];
  // if user loaned before and last loan status is pending
  handleError(
    isLoanedBefore && lastLoan.status === "PENDING",
    Error,
    "Your loan is still pending. Please wait for a  some time."
  );

  handleError(
    isLoanedBefore && lastLoan.status === "APPROVED" && !lastLoan.isPaid,
    Error,
    `Kindly pay back your last approved loan with interest.`
  );
  // create loan document
  const loan = new LoanModel({ amount });
  // run query with transaction
  const session = await mongoose.startSession();
  // start transaction session
  await loanRequestTransaction(session, UserModel, { loan, userId });
  // end transaction session
  session.endSession();

  return "Loan request sent. You will be replied after verification.";
};

export default requestLoan;
