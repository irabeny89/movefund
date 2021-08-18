import { model, models, Schema, Model } from "mongoose";
import type { MoneyOutType } from "../types";

const schema = new Schema<MoneyOutType>(
  {
    amount: { type: Number, required: true, min: 0 },
    balanceBefore: { type: Number, required: true, min: 0 },
    balanceAfter: { type: Number, required: true, min: 0 },
    recipient: {
      firstname: { type: String, required: true },
      lastname: { type: String, required: true },
      accountNumber: { type: String, required: true },
    },
  },
  { timestamps: true }
);

// const MoneyOutModel = model<MoneyOutType>("MoneyOut", schema)

// export default (models.MoneyOut as Model<MoneyOutType, {}, {}>) ||
//   model<MoneyOutType>("MoneyOut", schema);

export default models.MoneyOut as Model<MoneyOutType, {}, {}> || model<MoneyOutType>("MoneyOut", schema)