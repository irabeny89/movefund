import { gql } from "apollo-server-micro";

const typeDefs = gql`
  type Query {
    hello: String
    register(credentials: Credentials!): User!
  }

  input Credentials {
    firstname: String
    lastname:  String
    email: String
    password: String
    phone: String
  }

  type User {
    _id: ID!
    firstname: String!
    lastname:  String!
    email: String!
    password: String!
    salt: String!
    phone: String!
    isAdmin: Boolean!
    avatar: String
    street: String
    city: String
    state: String
    country: String
    accountNumber: String
    accountBalance: Float
    transaction: Transaction
    loan: Loan
    createdAt: String
    updatedAt: String
  }
  type MoneyOut {
    _id: ID!
    amount: Float
    balanceBefore: Float
    balanceAfter: Float
    recipient: Recipient
    createdAt: String
    updatedAt: String
  }
  type MoneyIn {
    _id: ID!
    amount: Float
    balanceBefore: Float
    balanceAfter: Float
    sender: Sender
    createdAt: String
    updatedAt: String
  }

  type Sender {
    firstname: String
    lastname: String
    accountNumber: String
  }
  type Recipient {
    firstname: String
    lastname: String
    accountNumber: String
  }
  type Transaction {
    moneyOuts: [MoneyOut]
    moneyIns: [MoneyIn]
  }
  type Loan {
    loanBalance: Float
    deadline: String
    penaltyMultiplier: Float
    interest: Float
    loanDate: String
  }
`;

export default typeDefs;
