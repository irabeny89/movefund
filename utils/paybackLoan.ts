import { UserInputError } from "apollo-server-core";
import mongoose from "mongoose";
import { GraphContextType, LoanType } from "types";
import { handleAdminAuth, handleError, USER_POPULATION_OPTION } from ".";

const paybackLoan = async (
  _: any,
  {
    amount,
    method,
  }: { amount: number; method: "APP_TRANSFER" | "PAYMENT_GATEWAY" },
  {
    req: {
      headers: { authorization },
    },
    UserModel,
    DebitModel,
    CreditModel,
    LoanModel,
  }: GraphContextType
): Promise<string> => {
  // only authorized user
  const { id } = handleAdminAuth(authorization!, false);
  // get user loans record
  const { balance, loans: userLoans } = (await UserModel.findById(id)
    .select("loans balance")
    .populate(USER_POPULATION_OPTION)
    .exec()) as { balance: number; loans: LoanType[] };
  // user last loan record
  const { _id, amountDue, status, isPaid } = userLoans![userLoans!.length - 1];
  // throw error if user balance is low
  handleError(
    amount < balance,
    UserInputError,
    "You do not have enough balance. Transfer using payment gateway."
  );
  // throw error if amount is less than amount due
  handleError(
    amount < amountDue!,
    UserInputError,
    `Please pay back the amount due: ${amountDue}`
  );
  // throw error if user is not owing
  handleError(
    isPaid || status !== "APPROVED",
    Error,
    "You are not owing. Your loan may have not been approved yet."
  );
  // throw error if payback method is PAYMENT_GATEWAY- coming soon
  handleError(
    method === "PAYMENT_GATEWAY",
    Error,
    "This payment method not available yet. Try again later."
  );
  // get admin account
  let admin = await UserModel.findOne({ isAdmin: true })
    .select("_id balance")
    .exec();
  // debit user to credit admin
  const userDebit = new DebitModel({ amount, to: admin?._id });
  // credit admin
  const adminCredit = new CreditModel({ amount, from: id, method });
  // start query transaction
  const session = await mongoose.startSession();
  await session.withTransaction(async () => {
    // save user debit document
    await userDebit.save({ session });
    // save admin credit document
    await adminCredit.save({ session });
    // append user debit record and reduce balance
    await UserModel.findByIdAndUpdate(
      id,
      {
        $inc: { balance: -amount },
        $push: { debits: userDebit._id },
      },
      { session }
    ).exec();
    // deduct amount from loan amount due
    await LoanModel.findByIdAndUpdate(
      _id,
      {
        isPaid: true,
        $inc: { amountDue: -amount },
      },
      { session }
    ).exec();
    // append admin credit record and increase balance
    await UserModel.findByIdAndUpdate(
      admin?._id,
      {
        $push: { credits: adminCredit._id },
        $inc: { balance: amount },
      },
      { session }
    ).exec();
  });
  session.endSession();

  mongoose.disconnect();

  return "Thanks, payment received and loan settled completely.";
};

export default paybackLoan;
