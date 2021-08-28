import { model, models, Schema, Model } from "mongoose";
import type { CreditType } from "types";

const schema = new Schema<CreditType>(
  {
    amount: { type: Number, required: true, min: 0 },
    from: String,
    option: {
      type: String,
      enum: ["USER", "ONLINE"],
    },
  },
  { timestamps: true }
);

export default (models.Credit as Model<CreditType, {}, {}>) ||
  model<CreditType>("Credit", schema);
