import { model, Schema, Model, models } from "mongoose";
import type { TransferInType } from "types";

const schema = new Schema<TransferInType>(
  {
    amount: { type: Number, required: true, min: 0 },
    sender: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export default (models.TransferIn as Model<TransferInType, {}, {}>) ||
  model<TransferInType>("TransferIn", schema);
