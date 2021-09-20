import mongoose, { Document, Connection, Model } from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";
import Dataloader from "dataloader";
import { JwtPayload } from "jsonwebtoken";

type TimestampAndId = {
  _id?: mongoose.Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
};

export type TokenType = {
  accessToken: string;
  refreshToken: string;
};

export type RefreshTokenType = {
  email: string;
  token: string;
} & TimestampAndId;

export type UserPayloadType = {
  firstname: string;
};

export type GraphContextType = {
  UserModel: Model<UserType>;
  DebitModel: Model<DebitType>;
  CreditModel: Model<CreditType>;
  LoanModel: Model<LoanType>;
  WithdrawalModel: Model<WithdrawalType>;
  RefreshTokenModel: Model<RefreshTokenType>;
} & ContextArgType;

export type ContextArgType = {
  req: NextApiRequest;
  res: NextApiResponse;
};

export type UserType = {
  isDeleted?: boolean;
  isAdmin?: boolean;
  firstname: string;
  lastname: string;
  password: string;
  salt: string;
  email: string;
  phone: string;
  currency: "NGN" | "USD";
  balance?: number;
  credits?: mongoose.Types.ObjectId[] | CreditType[];
  debits?: mongoose.Types.ObjectId[] | DebitType[];
  loans?: mongoose.Types.ObjectId[] | LoanType[];
  withdrawals?: mongoose.Types.ObjectId[] | WithdrawalType[];
} & TimestampAndId;

export type LoanType = {
  status?: "PENDING" | "APPROVED" | "DISAPPROVED";
  isPaid?: boolean;
  maxLoanable?: number;
  monthlyInterestRate?: number;
  totalInterest?: number;
  amount: number;
  amountDue?: number;
  deadline?: Date;
} & TimestampAndId;

export type CreditType = {
  amount: number;
  from: string;
  method: "APP_TRANSFER" | "PAYMENT_GATEWAY";
} & TimestampAndId;

export type DebitType = {
  amount: number;
  to: mongoose.Types.ObjectId | UserType;
} & TimestampAndId;

export type WithdrawalType = {
  amount: number;
} & TimestampAndId;
