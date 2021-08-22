import { model, Schema, Model, models } from "mongoose";
import type { SelfTransferType } from "types";

const schema = new Schema<SelfTransferType>(
  {
    amount: { type: Number, required: true, min: 0 },
  },
  { timestamps: true }
);

export default (models.SelfTransfer as Model<SelfTransferType, {}, {}>) ||
  model<SelfTransferType>("SelfTransfer", schema);
