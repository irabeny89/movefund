import { models, Schema, model, Model } from "mongoose";
import type { UserType } from "types";

const schema = new Schema<UserType>(
  {
    isDeleted: {
      type: Boolean,
      default: false,
    },
    isAdmin: { type: Boolean, default: false },
    firstname: { type: String, required: [true, "First name is required"] },
    lastname: { type: String, required: [true, "Last name is required"] },
    email: {
      type: String,
      trim: true,
      unique: "Email already exists",
      match: [/.+\@.+\..+/, "Please fill a valid email address"],
      required: [true, "Email is required"],
      lowercase: true,
    },
    phone: {
      type: String,
      required: "Phone number is required",
      trim: true,
      maxLength: 15,
    },
    accountBalance: { type: Number, default: 0, min: 0 },
    transfersOut: [{ type: Schema.Types.ObjectId, ref: "TransferOut" }],
    transfersIn: [{ type: Schema.Types.ObjectId, ref: "TransferIn" }],
    withdrawals: [{ type: Schema.Types.ObjectId, ref: "Withdrawal" }],
    loans: [{ type: Schema.Types.ObjectId, ref: "Loan" }],
    selfTransfers: [{ type: Schema.Types.ObjectId, ref: "SelfTransfer" }],
  },
  { timestamps: true }
);

export default (models.User as Model<UserType, {}, {}>) ||
  model<UserType>("User", schema);
