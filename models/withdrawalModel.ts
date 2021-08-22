import { model, Schema, Model, models } from "mongoose";
import type { WithdrawType } from "types";

const schema = new Schema<WithdrawType>(
  {
    amount: { type: Number, required: true, min: 0 },
  },
  { timestamps: true }
);

export default (models.Withdrawal as Model<WithdrawType, {}, {}>) ||
  model<WithdrawType>("Withdrawal", schema);
