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
    password: {
      type: String,
      required: true,
    },
    salt: String,
    phone: {
      type: String,
      required: "Phone number is required",
      trim: true,
      maxLength: 15,
    },
    balance: { type: Number, default: 0, min: 0 },
    credits: [{ type: Schema.Types.ObjectId, ref: "Credit" }],
    debits: [{ type: Schema.Types.ObjectId, ref: "Debit" }],
    loans: [{ type: Schema.Types.ObjectId, ref: "Loan" }],
  },
  { timestamps: true }
);

export default (models.User as Model<UserType, {}, {}>) ||
  model<UserType>("User", schema);
