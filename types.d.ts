import { MongoDataSource } from "apollo-datasource-mongodb";
import mongoose, { Document, Connection, Model } from "mongoose";
import { NextApiRequest } from "next";
import Dataloader from "dataloader"

type Timestamp = {
  createdAt?: Date;
  updatedAt?: Date;
};

type DatasourcesType = {
  [name: string]: MongoDataSource<UserType | MoneyInType | MoneyOutType>;
};

export type UserCredentialType = {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  phone: string;
  isAdmin: boolean;
};

export type TokenArgsType = {
  id: string;
  firstname: string;
  secret: string;
  audience: string;
  issuer: string;
};

export type AuthUserType = {
  id: string;
  firstname: string;
  isAdmin: boolean;
  accessToken: string;
  refreshToken: string;
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
  users: DataLoader<unknown, UserType, unknown>
  moneyIns: Dataloader<unknown, MoneyInType, unknown>,
  moneyOuts: Dataloader<unknown, MoneyOutType, unknown>,
} & ContextArgType;

export type ContextArgType = {
  req: NextApiRequest;
};

export type UserType = {
  _id?: mongoose.Types.ObjectId;
  avatar?: string;
  isAdmin: boolean;
  firstname: string;
  lastname: string;
  email: string;
  hashedPassword: string;
  salt: string;
  phone: string;
  street?: string;
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
