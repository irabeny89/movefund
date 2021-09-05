import { model, models, Schema, Model } from "mongoose";
import type { CreditType } from "types";

const schema = new Schema<CreditType>(
  {
    amount: { type: Number, required: true, min: 0 },
    from: String,
    method: {
      type: String,
      enum: ["APP_TRANSFER", "PAYMENT_GATEWAY"],
    },
  },
  { timestamps: true }
);

export default (models.Credit as Model<CreditType, {}, {}>) ||
  model<CreditType>("Credit", schema);
