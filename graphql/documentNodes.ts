import { gql } from "@apollo/client";

const USER_FRAGMENT = gql`
  fragment UserFragment on User {
    _id
    isAdmin
    firstname
    lastname
    email
    phone
    currency
    balance
    credits {
      _id
      from
      amount
      method
      createdAt
    }
    debits {
      _id
      to {
        _id
        firstname
        lastname
      }
      amount
      createdAt
    }
    loans {
      _id
      status
      isPaid
      maxLoanable
      monthlyInterestRate
      amount
      amountDue
      deadline
      createdAt
    }
    createdAt
    updatedAt
  }
`;

export const REFRESH_TOKEN_QUERY = gql`
  query RefreshToken {
    refreshToken {
      accessToken
    }
  }
`;

export const GET_MY_PROFILE_QUERY = gql`
  ${USER_FRAGMENT}
  query GetMyProfile {
    getMyProfile {
      ...UserFragment
    }
  }
`;

export const GET_ALL_USERS_QUERY = gql`
  ${USER_FRAGMENT}
  query GetAllUsers {
    getAllUsers {
      ...UserFragment
    }
  }
`;

export const REGISTER_MUTATION = gql`
mutation RegisterUser($userData: UserInput!) {
  registerUser(userData: $userData) {
    accessToken
  }
}
`

export const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      accessToken
    }
  }
`;

export const REQUEST_LOAN_MUTATION = gql`
  mutation RequestLoan($userId: ID!, $amount: Float!) {
    requestLoan(userId: $userId, amount: $amount)
  }
`;

export const PAYBACK_LOAN_MUTATION = gql`
  mutation PaybackLoan($amount: Float!, $method: PaybackMethod!) {
    paybackLoan(amount: $amount, method: $method)
  }
`;

export const SEND_MONEY_MUTATION = gql`
  mutation SendMoney($to: ID!, $amount: Float!) {
    sendMoney(to: $to, amount: $amount)
  }
`;

export const REPLY_LOAN_REQUEST_MUTATION = gql`
  mutation ReplyLoanRequest($userId: ID!, $reply: Reply!) {
    replyLoanRequest(userId: $userId, reply: $reply)
  }
`;
