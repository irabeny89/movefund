import { GraphContextType, LoanType, UserType } from "types";
import mongoose, { ClientSession, Model } from "mongoose";
import { handleAdminAuth, handleError, USER_POPULATION_OPTION } from ".";
import { UserInputError } from "apollo-server-micro";

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
    } catch (error) {
      console.error(error);
      handleError(error, Error, "Oops! Something went wrong. Try again.");
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
      .populate(USER_POPULATION_OPTION)
      .exec()
  )?.loans as LoanType[];
  // check if user is on loaned
  const isLoanedBefore = userLoans.length > 0;
  // get last loan record
  const lastLoan = userLoans[userLoans.length - 1];
  // if user has loaned before throw error
  isLoanedBefore &&
    handleError(
      !lastLoan.isPaid,
      Error,
      "Your loan is still pending or you are still owing. Please, pay back your loan or wait for a reply. "
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
