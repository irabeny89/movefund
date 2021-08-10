import { model, Schema, Model, models } from "mongoose";
import type { MoneyInType } from "../types";

export default (models.MoneyInModel as Model<MoneyInType, {}, {}>) || model<MoneyInType>(
  "MoneyInModel",
  new Schema<MoneyInType>(
    {
      amount: { type: Number, required: true },
      balanceBefore: { type: Number, required: true },
      balanceAfter: { type: Number, required: true },
      sender: {
        firstname: { type: String, required: true },
        lastname: { type: String, required: true },
        accountNumber: { type: String, required: true },
      },
    },
    { timestamps: true }
  )
);
