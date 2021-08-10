import { model, models, Schema, Model } from "mongoose";
import type { MoneyOutType } from "../types";

export default (models.MoneyOut as Model<MoneyOutType, {}, {}>) ||
  model<MoneyOutType>(
    "MoneyOut",
    new Schema<MoneyOutType>(
      {
        amount: { type: Number, required: true },
        balanceBefore: { type: Number, required: true },
        balanceAfter: { type: Number, required: true },
        recipient: {
          firstname: { type: String, required: true },
          lastname: { type: String, required: true },
          accountNumber: { type: String, required: true },
        },
      },
      { timestamps: true }
    )
  );
