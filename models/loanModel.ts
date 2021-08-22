import { model, Schema, Model, models } from "mongoose";
import type { LoanType } from "types";

const schema = new Schema<LoanType>(
  {
    status: {
      type: String,
      enum: ["pending", "approved", "disapproved"],
      required: true,
    },
    isPaid: { type: Boolean, default: false },
    maxLoanable: {
      type: Number,
      min: 0,
      default: 10000,
    },
    monthlyInterestRate: { type: Number, min: 0, default: 0.1 },
    totalInterest: {
      type: Number,
      min: 0,
      get(this: any) {
        return this.amountDue - this.amount;
      },
    },
    amount: { type: Number, min: 0 },
    amountDue: {
      type: Number,
      min: 0,
      get(this: any, v: number) {
        if (this.isPaid) return 0;
        // if deadline is violated
        if (+this.deadline < Date.now()) {
          // add another 30 days to deadline
          this.deadline = `${+this.deadline + 2.592e9}`;
          // then implement penalty on amountDue
          return this.amount * this.monthlyInterestRate + v;
        }
        // if within deadline
        return this.monthlyInterestRate * this.amount + this.amount;
      },
    },
    deadline: {
      type: Date,
      get(this: any) {
        // 30 days deadline
        return `${+this.createdAt + 2.592e9}`;
      },
    },
  },
  { timestamps: true }
);

export default (models.Loan as Model<LoanType, {}, {}>) ||
  model<LoanType>("Loan", schema);
