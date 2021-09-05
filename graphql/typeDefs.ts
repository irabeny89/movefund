import { gql } from "apollo-server-micro";

const typeDefs = gql`
  type Query {
    hello: String
    refreshToken: Token!
    getAllUsers: [User]!
    getUserById(id: ID!): User!
    getMyProfile: User!
  }

  type Mutation {
    registerUser(userData: UserInput!): Token!
    login(email: String!, password: String!): Token!
    logout: String!
    requestLoan(userId: ID!, amount: Float!): String!
    replyLoanRequest(userId: ID!, reply: Reply!): String!
    sendMoney(to: ID!, amount: Float!): String!
    paybackLoan(amount: Float!, method: PaybackMethod!): String!
  }

  input UserInput {
    firstname: String!
    lastname: String!
    email: String!
    password: String!
    phone: String!
  }

  input LoanUpdate {
    status: LoanStatus!
    isPaid: Boolean!
  }

  enum PaybackMethod {
    APP_TRANSFER
    PAYMENT_GATEWAY
  }

  enum CreditMethod {
    APP_TRANSFER
    PAYMENT_GATEWAY
  }

  enum Reply {
    APPROVED
    DISAPPROVED
  }

  enum LoanStatus {
    PENDING
    APPROVED
    DISAPPROVED
  }

  enum DebitOption {
    WITHDRAW
    TRANSFER
  }

  enum CurrencyOption {
    NGN
    USD
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
    currency: CurrencyOption!
    balance: Float!
    credits: [Credit]!
    debits: [Debit]!
    loans: [Loan]!
    withdrawals: [Withdrawal]!
    createdAt: String!
    updatedAt: String!
  }

  type Credit {
    _id: ID!
    amount: Float!
    from: String!
    method: CreditMethod!
    createdAt: String!
    updatedAt: String!
  }

  type Debit {
    _id: ID!
    amount: Float!
    to: User!
    createdAt: String!
    updatedAt: String!
  }

  type Loan {
    _id: ID!
    status: LoanStatus!
    isPaid: Boolean!
    maxLoanable: Float!
    monthlyInterestRate: Float!
    totalInterest: Float!
    amount: Float!
    amountDue: Float!
    deadline: String!
    createdAt: String!
    updatedAt: String!
  }

  type Withdrawal {
    _id: ID!
    amount: Float!
    createdAt: String!
    updatedAt: String!
  }
`;

export default typeDefs;
