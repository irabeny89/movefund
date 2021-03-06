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
      unique: true,
      match: /.+\@.+\..+/,
      required: [true, "Email is required"],
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    salt: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
      maxLength: 15,
      minLength: 5,
      match: /^\d+$/
    },
    currency: {
      type: String, enum: ["NGN", "USD"], default: "NGN"
    },
    balance: { type: Number, default: 0, min: 0 },
    credits: [{ type: Schema.Types.ObjectId, ref: "Credit" }],
    debits: [{ type: Schema.Types.ObjectId, ref: "Debit" }],
    loans: [{ type: Schema.Types.ObjectId, ref: "Loan" }],
    withdrawals: [{ type: Schema.Types.ObjectId, ref: "Withdrawal" }],
  },
  { timestamps: true }
);

export default (models.User as Model<UserType, {}, {}>) ||
  model<UserType>("User", schema);
