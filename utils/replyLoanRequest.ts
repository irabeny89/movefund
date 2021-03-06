import { GraphContextType, LoanType } from "types";
import mongoose from "mongoose";
import {
  handleAdminAuth,
  handleError,
  CREDITS_LOANS_WITHDRAWALS_POPULATION,
  DEBITS_POPULATION,
} from ".";
import { UserInputError } from "apollo-server-core";
import config from "config";

const {
  maxLoan,
  monthlyInterestRate,
  deadline: loanDeadline,
} = config.environmentVariable;

const replyLoanRequest = async (
  _: any,
  {
    userId,
    reply,
  }: {
    userId: mongoose.Types.ObjectId;
    reply: "APPROVED" | "DISAPPROVED";
  },
  {
    req: {
      headers: { authorization },
    },
    UserModel,
    LoanModel,
    DebitModel,
  }: GraphContextType
): Promise<string> => {
  // only admin has permission
  const { sub } = handleAdminAuth(authorization!);
  // get admin balance
  const adminBalance = (await UserModel.findById(sub).select("balance").exec())
    ?.balance as number;
  // get user loans record
  const userLoans = (
    await UserModel.findById(userId)
      .populate(CREDITS_LOANS_WITHDRAWALS_POPULATION)
      .populate(DEBITS_POPULATION)
      .exec()
  )?.loans as LoanType[];
  // if user not found throw error
  handleError(!userLoans, UserInputError, "User not found.");
  // get user last loan
  const userLastLoan = userLoans[userLoans.length - 1];
  // throw error when admin balance is low
  handleError(
    adminBalance < userLastLoan.amount,
    Error,
    "Loan is unavailable for now."
  );

  // start transactions
  const session = await mongoose.startSession();
  await session.withTransaction(async () => {
    // if loan is disapproved update loan document status
    if (reply === "DISAPPROVED")
      await LoanModel.findByIdAndUpdate(
        userLastLoan._id,
        { status: reply },
        { session }
      ).exec();
    // if loan is approved update user, debit and loan documents
    if (reply === "APPROVED") {
      const deadline = new Date(Date.now() + loanDeadline);
      // update loan document
      await LoanModel.findByIdAndUpdate(
        userLastLoan._id,
        {
          status: reply,
          deadline,
          approvedDate: new Date(),
        },
        { session }
      ).exec();
      // increment user balance
      await UserModel.findByIdAndUpdate(
        userId,
        {
          $inc: { balance: +userLastLoan.amount },
        },
        { session }
      ).exec();
      // create debit document for admin
      const [{ _id: debitId }] = await DebitModel.create(
        [
          {
            amount: userLastLoan.amount,
            to: userId,
          },
        ],
        { session }
      );
      // update admin balance and add debit record
      await UserModel.findByIdAndUpdate(
        sub,
        {
          $inc: { balance: -userLastLoan.amount },
          $push: { debits: debitId },
        },
        { session }
      );
    }
  });
  session.endSession();
  // disconnect database
  mongoose.disconnect();

  return "Loan replied successfully.";
};

export default replyLoanRequest;
