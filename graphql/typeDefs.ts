import { gql } from "apollo-server-micro";

const typeDefs = gql`
  type Query {
    hello: String
    refreshToken: Token!
    logout: String!
    getUserById(id: ID!): User!
    getAllUsers: [User]!
    # getUserTransferIn(id: ID!): TransferIn
    # getAllUsersTransfersIn: [TransferIn]!
    # getUserTransferOut(id: ID!): TransferOut!
    # getAllUsersTransfersOut: [TransferOut]!
    # getUserWithdrawal(id: ID!): Withdrawal!
    # getAllUsersWithdrawals: [Withdrawal]!
    # getUserLoan(id: ID!): Loan!
    # getAllUsersLoans: [Loan]!
    # getUserSelfTransfer(id: ID!): SelfTransfer!
    # getAllSelfTransfers: [SelfTransfer]!
  }

  type Mutation {
    registerUser(userData: UserInput!): Token!
    login(email: String!, password: String!): Token!
    removeUser(id: ID!): String!
    requestLoan(userId: ID!, amount: Float!): String!
    replyLoanRequest(userId: ID!, reply: LoanStatus!): String!
    # updateUser(id: ID!, userUpdate: UserUpdate!): String!
    # addUserTransferOut(senderId: ID!, transferOutInput: TransferOutInput!): TransferOut!
    # addUserWithdrawal(id: ID!, withdrawalInput: WithdrawalInput!): Withdrawal!
    # updateUserLoan(id: ID!, loanInput: LoanInput!): String!
    # addUserSelfTransfer(id: ID!, selfTransferInput: SelfTransfer!): SelfTransfer!
  }

  input UserUpdate {
    isDeleted: Boolean
    accountBalance: Float
    transfersOut: [ID]
    transfersIn: [ID]
    withdrawals: [ID]
    loans: [ID]
    selfTransfers: [ID]
  }

  input UserInput {
    firstname: String!
    lastname: String!
    email: String!
    password: String!
    phone: String!
  }

  input TransferOutInput {
    amountSent: Float!
    recipient: ID!
  }

  input WithdrawalInput {
    amountWithdrawn: Float!
  }

  input LoanUpdate {
    status: LoanStatus!
    isPaid: Boolean!
  }

  enum LoanStatus {
    PENDING
    APPROVED
    DISAPPROVED
  }

  type Token {
    accessToken: String!
    refreshToken: String!
  }

  type User {
    _id: ID!
    isDeleted: String!
    isAdmin: Boolean!
    firstname: String!
    lastname: String!
    email: String!
    phone: String!
    accountBalance: Float!
    transfersOut: [TransferOut]!
    transfersIn: [TransferIn]!
    withdrawals: [Withdrawal]!
    loans: [Loan]!
    selfTransfers: [SelfTransfer]!
    createdAt: String!
    updatedAt: String!
  }

  type TransferOut {
    _id: ID!
    amount: Float!
    recipient: User!
    createdAt: String!
    updatedAt: String!
  }
  type TransferIn {
    _id: ID!
    amount: Float!
    sender: User!
    createdAt: String!
    updatedAt: String!
  }

  type Withdrawal {
    _id: ID!
    amount: Float!
    createdAt: String!
    updatedAt: String!
  }

  type Loan {
    _id: ID!
    status: LoanStatus!
    isPaid: Boolean!
    maxLoanable: Float!
    totalInterest: Float!
    amount: Float!
    amountDue: Float!
    deadline: String!
    createdAt: String!
    updatedAt: String!
  }

  type SelfTransfer {
    _id: ID!
    amount: Float!
    createdAt: String!
    updatedAt: String!
  }
`;

export default typeDefs;
