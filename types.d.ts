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
  users: Dataloader<unknown, UserType, unknown>;
  transfersIn: Dataloader<unknown, TransferInType, unknown>;
  transfersOut: Dataloader<unknown, TransferOutType, unknown>;
  withdrawals: Dataloader<unknown, WithdrawType>;
  loans: Dataloader<unknown, LoanType, unknown>;
  UserModel: Model<UserType>;
  TransferInModel: Model<TransferInType>;
  TransferOutModel: Model<TransferOutType>;
  WithdrawalModel: Model<WithdrawType>;
  LoanModel: Model<LoanType>;
  SelfTransferModel: Model<SelfTransferType>;
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
  accountBalance?: number;
  transfersOut?: mongoose.Types.ObjectId[] | TransferOutType[];
  transfersIn?: mongoose.Types.ObjectId[] | TransferInType[];
  withdrawals?: mongoose.Types.ObjectId[] | Withdrawal[];
  loans?: mongoose.Types.ObjectId[] | LoanType[];
  selfTransfers?: mongoose.Types.ObjectId[] | SelfTransferType[];
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

export type SelfTransferType = {
  amount: number;
} & TimestampAndId;

export type TransferOutType = {
  amount: number;
  recipient: mongoose.Types.ObjectId | UserType;
} & TimestampAndId;

export type TransferInType = {
  amount: number;
  sender: mongoose.Types.ObjectId | UserType;
} & TimestampAndId;

export type WithdrawType = {
  amount: number;
} & TimestampAndId;
