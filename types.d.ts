import mongoose, { Document, Connection, Model } from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";
import Dataloader from "dataloader";

type TimestampAndId = {
  _id?: mongoose.Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
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
  status: "pending" | "approved" | "disapproved";
  maxLoanable?: number;
  monthlyInterestRate?: number;
  totalInterest?: number;
  amount?: number;
  amountDue?: number;
  deadline?: Date;
  isPaid: boolean;
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
