import { models, Schema, model, Model } from "mongoose";
import type { UserType } from "types";

const schema = new Schema<UserType>(
  {
    avatar: {
      type: String,
      default: "/1naira.jpg"
    },
    lastSeen: {
      type: Date,
      default: Date.now
    },
    isDeleted: {
      type: Boolean,
      default: false
    },
    isAdmin: { type: Boolean, default: false },
    firstname: { type: String, required: "First name is required" },
    lastname: { type: String, required: "Last name is required" },
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
      unique: "Phone number already exist",
      trim: true,
      maxLength: 15,
    },
    street: String,
    localGovernmentArea: String,
    city: String,
    state: String,
    country: String,
    accountNumber: String,
    accountBalance: { type: Number, default: 0, min: 0 },
    transaction: {
      moneyOuts: [{ type: [Schema.Types.ObjectId], ref: "MoneyOut" }],
      moneyIns: [{ type: [Schema.Types.ObjectId], ref: "MoneyIn" }],
    },
    loan: {
      loanBalance: { type: Number, default: 0, min: 0 },
      deadline: { type: Date, require: true },
      penaltyMultiplier: { type: Date, require: true },
      interest: { type: Number, required: true, default: 0, min: 0 },
      loanDate: { type: Date, require: true },
    },
  },
  { timestamps: true }
);

export default (models.User as Model<UserType, {}, {}>) ||
  model<UserType>("User", schema);
