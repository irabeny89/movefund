import { model, Schema, Model, models } from "mongoose";
import type { LoanType } from "types";
import config from "config";

const { maxLoan, monthlyInterestRate } = config.environmentVariable;

const schema = new Schema<LoanType>(
  {
    status: {
      type: String,
      enum: ["PENDING", "APPROVED", "DISAPPROVED"],
      default: "PENDING",
    },
    amount: {
      type: Number,
      min: 0,
    },
    isPaid: { type: Boolean, default: false },
    maxLoanable: {
      type: Number,
      min: 0,
      default: maxLoan,
    },
    monthlyInterestRate: {
      type: Number,
      min: 0,
      default: monthlyInterestRate,
    },
    amountDue: {
      type: Number,
      min: 0,
      default: 0,
      get(this: any, v: number) {
        const present = Date.now();
        const multiplier = Math.ceil(
          present / (+this.deadline - +this.approvedDate)
        );
        const amountDue = this.amount * this.monthlyInterestRate + this.amount;
        // if deadline is passed return new amount due
        if (+this.deadline < present) return amountDue * multiplier;
        // if loan is approved return the amount due
        if (this.status === "APPROVED") return amountDue;
        // else return the default value
        return v
      },
    },
    deadline: Date,
    approvedDate: Date,
  },
  { timestamps: true }
);

export default (models.Loan as Model<LoanType, {}, {}>) ||
  model<LoanType>("Loan", schema);
