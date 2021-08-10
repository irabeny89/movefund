import mongoose, { Document, Connection } from "mongoose";
import { NextApiRequest } from "next";

type Timestamp = {
  createdAt?: Date;
  updatedAt?: Date;
};

export type Fields = {
  [fieldName: string]:
    | string
    | number
    | boolean
    | mongoose.Types.ObjectId
    | (string | number | boolean | mongoose.Types.ObjectId)[]
}

export type GraphContextType = {
  db: Connection | undefined
} & ContextArgType

export type ContextArgType = {
  req: NextApiRequest;
};

export type UserType = {
  _id?: mongoose.Types.ObjectId
  avatar?: string;
  isAdmin: boolean;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  salt: string;
  phone: string;
  street?: string;
  city?: string;
  state?: string;
  country?: string;
  accountNumber?: string;
  accountBalance?: number;
  transaction?: {
    transferOuts: string[];
    transferIns: string[];
  };
  loan?: {
    loanBalance: number;
    deadline: Date;
    penaltyMultiplier: number;
    interest: number;
    loanDate: Date;
  };
} & Timestamp & Document;

export type MoneyOutType = {
  _id?: mongoose.Types.ObjectId
  amount: number
  balanceBefore: number
  balanceAfter: number
  recipient: {
    firstname: string
    lastname: string,
    accountNumber: string
  }
} & Timestamp & Document;

export type MoneyInType = {
  _id?: mongoose.Types.ObjectId
  amount: number
  balanceBefore: number
  balanceAfter: number
  sender: {
    firstname: string
    lastname: string
    accountNumber: string
  }
} & Timestamp & Document;
