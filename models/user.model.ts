import { models, Schema, model, Model } from "mongoose";
import type { UserType } from "../types";

export default (models.UserModel as Model<UserType, {}, {}>) ||
  model<UserType>(
    "UserModel",
    new Schema<UserType>(
      {
        avatar: String,
        isAdmin: { type: Boolean, default: false },
        firstname: { type: String, required: true },
        lastname: { type: String, required: true },
        email: {
          type: String,
          trim: true,
          unique: "Email already exists",
          match: [/.+\@.+\..+/, "Please fill a valid email address"],
          required: true,
        },
        password: { type: String, required: true },
        salt: { type: String, required: true },
        phone: { type: String, required: true, unique: true },
        street: String,
        city: String,
        state: String,
        country: String,
        accountNumber: String,
        accountBalance: String,
        transaction: {
          moneyOut: [{ type: [Schema.Types.ObjectId], ref: "MoneyOut" }],
          moneyIn: [{ type: [Schema.Types.ObjectId], ref: "MoneyIn" }],
        },
        loan: {
          loanBalance: { type: Number, default: 0 },
          deadline: { type: Date, require: true },
          penaltyMultiplier: { type: Date, require: true },
          interest: { type: Number, required: true },
          loanDate: { type: Date, require: true },
        },
      },
      { timestamps: true }
    )
  );
