import { model, Schema, Model, models } from "mongoose";
import type { WithdrawalType } from "types";

const schema = new Schema<WithdrawalType>(
  {
    amount: { type: Number, required: true, min: 0 },
  },
  { timestamps: true }
);

export default (models.Withdrawal as Model<WithdrawalType, {}, {}>) ||
  model<WithdrawalType>("Withdrawal", schema);
