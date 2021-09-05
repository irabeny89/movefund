import { model, Schema, Model, models } from "mongoose";
import type { DebitType } from "types";

const schema = new Schema<DebitType>(
  {
    amount: { type: Number, required: true, min: 0 },
    to: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export default (models.Debit as Model<DebitType, {}, {}>) ||
  model<DebitType>("Debit", schema);
