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
  token: string;
} & TimestampAndId;

export type UserPayloadType = {
  id: mongoose.Types.ObjectId;
  isAdmin: boolean;
};

export type GraphContextType = {
  UserModel: Model<UserType>;
  DebitModel: Model<DebitType>;
  CreditModel: Model<CreditType>;
  LoanModel: Model<LoanType>;
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
  balance?: number;
  credits?: mongoose.Types.ObjectId[] | CreditType[];
  debits?: mongoose.Types.ObjectId[] | DebitType[];
  loans?: mongoose.Types.ObjectId[] | LoanType[];
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
  option: "USER" | "ONLINE";
} & TimestampAndId;

export type DebitType = {
  amount: number;
  to: mongoose.Types.ObjectId;
  option: "WITHDRAW" | "TRANSFER";
} & TimestampAndId;
