import { model, models, Schema, Model } from "mongoose";
import type { TransferOutType } from "types";

const schema = new Schema<TransferOutType>(
  {
    amount: { type: Number, required: true, min: 0 },
    recipient: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export default (models.TransferOut as Model<TransferOutType, {}, {}>) ||
  model<TransferOutType>("TransferOut", schema);
