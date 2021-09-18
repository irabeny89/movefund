import mongoose from "mongoose";
import { GraphContextType, UserType } from "types";
import { handleAdminAuth, handleError } from ".";

const sendMoney = async (
  _: any,
  {
    amount,
    to,
  }: {
    to: mongoose.Types.ObjectId;
    amount: number;
  },
  {
    CreditModel,
    DebitModel,
    UserModel,
    req: {
      headers: { authorization },
    },
  }: GraphContextType
) => {
  // admin cannot send
  const { id } = handleAdminAuth(authorization!, false);
  // get user properties
  const userFewData = (await UserModel.findById(id)
    .select("balance firstname lastname")
    .exec()) as (Pick<UserType, "balance" | "firstname" | "lastname">) | null;
  // throw error if user not found
  handleError(!userFewData, Error, "User not found")
  // destructure
  const { balance, firstname, lastname } = userFewData!
  // throw error if user balance is low or undefined
  handleError(balance! < amount, Error, "Insufficient fund.");
  // create debit document for sender
  const debit = new DebitModel({
    amount,
    to,
  });
  // create credit document for recipient
  const credit = new CreditModel({
    amount,
    from: `${firstname} ${lastname}`,
    method: "APP_TRANSFER",
  });
  // run query in transacions
  const session = await mongoose.startSession();
  await session.withTransaction(async () => {
    await credit.save();
    await debit.save();
    // update sender debit record
    await UserModel.findByIdAndUpdate(
      id,
      {
        $inc: { balance: -amount },
        $push: { debits: debit._id },
      },
      { session }
    );
    // update recipient credit record
    await UserModel.findByIdAndUpdate(
      to,
      {
        $inc: { balance: amount },
        $push: { credits: credit._id },
      },
      { session }
    ).exec();
  });
  session.endSession();

  mongoose.disconnect();

  return "Sent successfully.";
};

export default sendMoney;
