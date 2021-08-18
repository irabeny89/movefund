import { MongoDataSource } from "apollo-datasource-mongodb";
import mongoose, { Document, Connection, Model } from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";
import Dataloader from "dataloader"

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
    | (string | number | boolean | mongoose.Types.ObjectId)[];
};

export type GraphContextType = {
  dataSources?: DatasourcesType;
  users: Dataloader<unknown, UserType, unknown>
  moneyIns: Dataloader<unknown, MoneyInType, unknown>,
  moneyOuts: Dataloader<unknown, MoneyOutType, unknown>,
  UserModel: Model<UserType>
} & ContextArgType;

export type ContextArgType = {
  req: NextApiRequest;
  res: NextApiResponse
};

export type UserType = {
  _id?: mongoose.Types.ObjectId;
  avatar?: string;
  isAdmin: boolean;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  street?: string;
  localGovernmentArea?: string;
  city?: string;
  state?: string;
  country?: string;
  accountNumber?: string;
  accountBalance?: number;
  transaction?: {
    moneyOuts: mongoose.Types.ObjectId[] | MoneyOutType[];
    moneyIns: mongoose.Types.ObjectId[] | MoneyInType[];
  };
  loan?: {
    loanBalance: number;
    deadline: Date;
    penaltyMultiplier: number;
    interest: number;
    loanDate: Date;
  };
} & Timestamp

export type MoneyOutType = {
  _id?: mongoose.Types.ObjectId;
  amount: number;
  balanceBefore: number;
  balanceAfter: number;
  recipient: {
    firstname: string;
    lastname: string;
    accountNumber: string;
  };
} & Timestamp

export type MoneyInType = {
  _id?: mongoose.Types.ObjectId;
  amount: number;
  balanceBefore: number;
  balanceAfter: number;
  sender: {
    firstname: string;
    lastname: string;
    accountNumber: string;
  };
} & Timestamp
