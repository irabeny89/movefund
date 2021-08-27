import mongoose, { Model } from "mongoose";
import { randomBytes, scrypt, BinaryLike } from "crypto";
import {
  ValidationError,
  UserInputError,
  AuthenticationError,
} from "apollo-server-micro";
import { promisify } from "util";
import { serialize, CookieSerializeOptions } from "cookie";
import { NextApiResponse } from "next";
import {
  GraphContextType,
  LoanType,
  RefreshTokenType,
  TokenType,
  TransferInType,
  TransferOutType,
  UserPayloadType,
  UserType,
  WithdrawType,
} from "types";
import { JwtPayload, Secret, sign, SignOptions, verify } from "jsonwebtoken";

const USER_POPULATION_OPTION = {
  path: "transfersOut transfersIn withdrawals loans selfTransfers",
  populate: {
    path: "recipient sender",
  },
};
const AUTHORIZATION_ERROR_MESSAGE = "Authorization failed";

/**
 * This sets `cookie` using the `res` object
 */

export const setCookie = (
  res: NextApiResponse,
  name: string,
  value: unknown,
  options: CookieSerializeOptions = {}
) => {
  const stringValue =
    typeof value === "object" ? "j:" + JSON.stringify(value) : String(value);
  if ("maxAge" in options) {
    options.expires = new Date(Date.now() + options.maxAge!);
    options.maxAge! /= 1000;
  }
  res.setHeader("Set-Cookie", serialize(name, String(stringValue), options));
};

const asyncScrypt = promisify<BinaryLike, BinaryLike, number, Buffer>(scrypt);

const handleError = (condition: any, ErrorClass: any, message: string) => {
  if (condition) throw new ErrorClass(message);
};

const getAccessToken = (authHeader: string | undefined) =>
  authHeader
    ? authHeader.replace("Bearer ", "")
    : handleError(
        !authHeader,
        AuthenticationError,
        AUTHORIZATION_ERROR_MESSAGE
      );

const handleToken = async (
  { id, isAdmin }: UserPayloadType,
  RefreshModel: Model<RefreshTokenType>,
  res: NextApiResponse
) => {
  const _token = getToken({
    id,
    isAdmin,
  });

  await RefreshModel.findOneAndUpdate(
    {},
    { token: _token.refreshToken },
    { upsert: true }
  ).exec();

  setCookie(res, "token", _token.refreshToken, {
    maxAge: 2592000,
    httpOnly: true,
    sameSite: true,
    secure: process.env.NODE_ENV == "production" ? true : false,
    path: "/api/graphql",
  });

  return _token;
};

const handleAdminAuth = (authHeader: string, isAdmin: boolean = true) => {
  const payload = verifyToken(
    getAccessToken(authHeader)!,
    process.env.JWT_ACCESS_SECRET!
  ) as JwtPayload & UserPayloadType;

  isAdmin
    ? handleError(
        !payload.isAdmin,
        AuthenticationError,
        AUTHORIZATION_ERROR_MESSAGE
      )
    : handleError(
        payload.isAdmin,
        AuthenticationError,
        AUTHORIZATION_ERROR_MESSAGE
      );

  return payload
};

const handleLoanRequest = async (
  userId: mongoose.Types.ObjectId,
  amount: number,
  UserModel: Model<UserType>,
  LoanModel: Model<LoanType>
) => {
  console.log('=====userid||loanrequest===============================');
  console.log(userId);
  console.log('====================================');
  const isUserExisting = await read<UserType>(
    userId,
    UserModel,
    USER_POPULATION_OPTION
  );

  console.log('====================================');
  console.log(isUserExisting);
  console.log('====================================');

  handleError(!isUserExisting, UserInputError, "User not found.");

  const loans = isUserExisting?.loans as LoanType[];
  const isLoanedBefore = loans.length > 0;
  const lastLoan = loans[loans.length - 1];

  isLoanedBefore &&
    handleError(
      !lastLoan.isPaid,
      Error,
      "You are still owing. Please pay as soon as possible."
    );

  const loan = await LoanModel.create({ amount });

  await UserModel.findByIdAndUpdate(userId, {
    $push: {
      loans: loan._id,
    },
  }).exec();
};

const generateSalt = () => randomBytes(32).toString("hex");

const hashPassword = async (password: string, salt: string) => {
  const hash = await asyncScrypt(password, salt, 64);

  return hash.toString("hex");
};

const comparePassword = async (
  hashedpassword: string,
  password: string,
  salt: string
) => {
  const isValid = hashedpassword === (await hashPassword(password, salt));

  handleError(!isValid, AuthenticationError, AUTHORIZATION_ERROR_MESSAGE);
};

const verifyToken = (token: string, secret: Secret) => {
  try {
    const decodedToken = verify(token, secret) as JwtPayload;

    return decodedToken;
  } catch (error) {
    handleError(error, AuthenticationError, AUTHORIZATION_ERROR_MESSAGE);
  }
};

const generateToken = (
  payload: string | object | Buffer,
  secretOrPrivateKey: Secret,
  options?: SignOptions | undefined
) => {
  try {
    return sign(payload, secretOrPrivateKey, options);
  } catch (error) {
    handleError(error, AuthenticationError, AUTHORIZATION_ERROR_MESSAGE);
  }
};

const getToken = ({ id, isAdmin }: UserPayloadType): TokenType => ({
  accessToken: generateToken({ id, isAdmin }, process.env.JWT_ACCESS_SECRET!, {
    subject: `${id}`,
    expiresIn: "10m",
    audience: isAdmin ? "admin" : "user",
    issuer: process.env.TOKEN_ISSUER || "http://localhost:3000/api/graphql",
    algorithm: "HS256",
  })!,
  refreshToken: generateToken(
    { id, isAdmin },
    process.env.JWT_REFRESH_SECRET!,
    {
      subject: `${id}`,
      expiresIn: "30d",
      audience: isAdmin ? "admin" : "user",
      issuer: process.env.TOKEN_ISSUER || "http://localhost:3000/api/graphql",
      algorithm: "HS256",
    }
  )!,
});

const create = async <T>(data: any, DocModel: Model<T>) => {
  const isUserExisting = await DocModel.findOne({
    email: data.email,
  }).exec();

  handleError(isUserExisting, ValidationError, "Email has been used");

  const user = await DocModel.create(data);

  return user;
};

const read = async <T>(
  id: mongoose.Types.ObjectId,
  DocModel: Model<T>,
  populateOption?: object | string
) => {
  const isUserExisting = await DocModel.findById(id)
    .populate(populateOption)
    .exec();

  handleError(!isUserExisting, UserInputError, "User not found");

  return isUserExisting!;
};

const update = async <T>(
  id: mongoose.Types.ObjectId,
  DocModel: Model<T>,
  data: any
) => {
  const isExisting = await DocModel.findByIdAndUpdate(id, data).exec();

  handleError(!isExisting, UserInputError, "ID not existing");
};

const remove = async <T>(id: string, DocModel: Model<T>) => {
  const isExisting = await DocModel.findByIdAndDelete(id).exec();

  handleError(!isExisting, UserInputError, "ID not found");

  return "Delete successful";
};

// const creditRecipient = async (
//   UserModel: Model<UserType>,
//   {
//     senderId,
//     recipientId,
//     amount,
//   }: { recipientId: string; senderId: string; amount: number },
//   TransferInModel: Model<TransferInType>
// ) => {
//   const isRecipientExisting = await UserModel.findById(recipientId).exec();
//   if (!isRecipientExisting)
//     throw new UserInputError("Recipient ID not existing");
//   const recipientTransferIn = await TransferInModel.create({
//     sender: senderId,
//     amountReceived: amount,
//   });
//   await UserModel.findByIdAndUpdate(recipientId, {
//     $push: {
//       transfersIn: recipientTransferIn._id,
//     },
//     accountBalance:
//       isRecipientExisting.accountBalance! + recipientTransferIn.amount,
//   }).exec();
// };

// <==== Queries ===>

export const getUserById = async (
  _: any,
  { id }: { id: mongoose.Types.ObjectId },
  {
    UserModel,
    req: {
      headers: { authorization },
    },
  }: GraphContextType
) => {
  handleAdminAuth(authorization!);

  return await read<UserType>(id, UserModel, USER_POPULATION_OPTION);
};

export const refreshToken = async (
  _: any,
  __: any,
  {
    RefreshTokenModel,
    req: {
      cookies: { token },
    },
    res,
  }: GraphContextType
) => {
  const decodedToken = verifyToken(token, process.env.JWT_REFRESH_SECRET!);

  const id = decodedToken?.sub! as unknown as mongoose.Types.ObjectId

  const isTokenExisting = await RefreshTokenModel.findOne({ token }).exec();

  handleError(!isTokenExisting, Error, AUTHORIZATION_ERROR_MESSAGE);

  return await handleToken(
    {
      id,
      isAdmin: decodedToken?.aud == "admin" ? true : false,
    },
    RefreshTokenModel,
    res
  );
};

export const logout = async (
  _: any,
  __: any,
  {
    req: {
      cookies: { token },
    },
    RefreshTokenModel,
    res,
  }: GraphContextType
) => {
  await RefreshTokenModel.findOneAndDelete({
    token,
  }).exec();

  setCookie(res, "token", "", {
    maxAge: 0,
    httpOnly: true,
    sameSite: true,
    secure: process.env.NODE_ENV == "production" ? true : false,
    path: "/api/graphql",
  });

  return "Logged out successfully.";
};

export const getAllUsers = async (
  _: any,
  __: any,
  {
    UserModel,
    req: {
      headers: { authorization },
    },
  }: GraphContextType
) => {
  handleAdminAuth(authorization!);

  return await UserModel.find({}).populate(USER_POPULATION_OPTION).exec();
};

// export const getUserTransferIn = async (
//   _: any,
//   { id }: { id: string },
//   { TransferInModel }: GraphContextType
// ) =>
//   await read<TransferInType>(
//     id,
//     TransferInModel,
//     TRANSFER_IN_POPULATION_STRING
//   );

// export const getAllUsersTransfersIn = async (
//   _: any,
//   __: any,
//   { TransferInModel }: GraphContextType
// ): Promise<TransferInType[]> =>
//   await TransferInModel.find({}).populate(TRANSFER_IN_POPULATION_STRING).exec();

// export const getUserTransferOut = async (
//   _: any,
//   { id }: { id: string },
//   { TransferOutModel }: GraphContextType
// ) =>
//   await read<TransferOutType>(
//     id,
//     TransferOutModel,
//     TRANSFER_OUT_POPULATION_STRING
//   );

// export const getAllUsersTransfersOut = async (
//   _: any,
//   __: any,
//   { TransferOutModel }: GraphContextType
// ) =>
//   await TransferOutModel.find({})
//     .populate(TRANSFER_OUT_POPULATION_STRING)
//     .exec();

// export const getUserWithdrawal = async (
//   _: any,
//   { id }: { id: string },
//   { WithdrawalModel }: GraphContextType
// ) => await read<WithdrawType>(id, WithdrawalModel);

// export const getAllUsersWithdrawals = async (
//   _: any,
//   __: any,
//   { WithdrawalModel }: GraphContextType
// ): Promise<WithdrawType[]> => await WithdrawalModel.find({});

// export const getUserLoan = async (
//   _: any,
//   { id }: { id: string },
//   { LoanModel }: GraphContextType
// ) => await read<LoanType>(id, LoanModel);

// export const getAllUsersLoans = async (
//   _: any,
//   __: any,
//   { LoanModel }: GraphContextType
// ): Promise<LoanType[]> => await LoanModel.find({});

// <==== Mutations ====>

export const registerUser = async (
  _: any,
  {
    userData: { password, ...rest },
  }: {
    userData: Pick<
      UserType,
      "firstname" | "lastname" | "email" | "phone" | "password"
    >;
  },
  { UserModel, RefreshTokenModel, res }: GraphContextType
) => {
  handleError(
    password.length < 6,
    UserInputError,
    "Password should be longer than 6 characters"
  );

  const salt = generateSalt();
  const hashedPassword = await hashPassword(password, salt);
  const { _id, isAdmin } = await create<UserType>(
    {
      ...rest,
      password: hashedPassword,
      salt,
    },
    UserModel
  );

  return await handleToken(
    {
      id: _id,
      isAdmin: isAdmin!,
    },
    RefreshTokenModel,
    res
  );
};

export const login = async (
  _: any,
  { email, password: loginPassword }: Pick<UserType, "email" | "password">,
  { UserModel, RefreshTokenModel, res }: GraphContextType
) => {
  const isUserExisting = await UserModel.findOne({ email }).exec();

  handleError(!isUserExisting, AuthenticationError, "User not registered.");

  await comparePassword(
    isUserExisting?.password!,
    loginPassword,
    isUserExisting?.salt!
  );

  return await handleToken(
    {
      id: isUserExisting?._id!,
      isAdmin: isUserExisting?.isAdmin!,
    },
    RefreshTokenModel,
    res
  );
};

export const requestLoan = async (
  _: any,
  { userId, amount }: { userId: mongoose.Types.ObjectId; amount: number },
  {
    LoanModel,
    UserModel,
    req: {
      headers: { authorization },
    },
  }: GraphContextType
) => {
  // only regular users can request loan
  handleAdminAuth(authorization!, false);

  console.log('=========requestloan===========================');
  console.log(userId, amount);
  console.log('====================================');

  await handleLoanRequest(userId, amount, UserModel, LoanModel);

  return "Loan request sent. You will be replied within a week.";
};

export const removeUser = async (
  _: any,
  { id }: { id: string },
  {
    UserModel,
    req: {
      headers: { authorization },
    },
  }: GraphContextType
) => {
  handleAdminAuth(authorization!);

  return await remove<UserType>(id, UserModel);
};

export const replyLoanRequest = async (
  _: any,
  {
    userId,
    reply,
  }: {
    userId: mongoose.Types.ObjectId;
    reply: "PENDING" | "APPROVED" | "DISAPPROVED";
  },
  {
    req: {
      headers: { authorization },
    },
    UserModel,
    LoanModel,
  }: GraphContextType
) => {
  const { id } = handleAdminAuth(authorization!);
  const { accountBalance } = await read(id, UserModel)


  const user = await read(userId, UserModel, USER_POPULATION_OPTION);
  const loans = user?.loans!;
  const latestLoan = loans[loans.length - 1] as LoanType;

  handleError(accountBalance! < latestLoan.amount, Error, "Loan is unavailable for now.")

  await update(latestLoan._id!, LoanModel, { status: reply });

  reply === "APPROVED" &&
    (await update<UserType>(userId, UserModel, {
      accountBalance: latestLoan.amount + user?.accountBalance!,
    }));

  await update(id, UserModel, {
    accountBalance: accountBalance! - latestLoan.amount,
  })

  return "Loan replied successfully.";
};

// export const addUserTransferOut = async (
//   _: any,
//   {
//     senderId,
//     transferOutInput,
//   }: {
//     senderId: string;
//     transferOutInput: { amountSent: number; recipient: string };
//   },
//   { TransferOutModel, UserModel, TransferInModel }: GraphContextType
// ) => {
//   const isUserExisting = await UserModel.findById(senderId).exec();
//   if (!isUserExisting) throw new UserInputError("User ID not existing");
//   if (transferOutInput.amountSent > isUserExisting?.accountBalance!)
//     throw new UserInputError(
//       "You do not have that much in your account. Get a loan?"
//     );
//   creditRecipient(
//     UserModel,
//     {
//       senderId,
//       recipientId: transferOutInput.recipient,
//       amount: transferOutInput.amountSent,
//     },
//     TransferInModel
//   );
//   const transferOut = await TransferOutModel.create({
//     amountSent: transferOutInput.amountSent,
//     recipient: transferOutInput.recipient,
//   });
//   await UserModel.findByIdAndUpdate(senderId, {
//     $push: {
//       transfersOut: transferOut._id,
//     },
//     accountBalance: isUserExisting.accountBalance! - transferOut.amountSent,
//   }).exec();
//   return await TransferOutModel.findById(transferOut._id)
//     .populate({
//       path: "recipient",
//       populate: {
//         path: "transfersIn",
//       },
//     })
//     .exec();
// };

// export const addUserWithdrawal = async (
//   _: any,
//   {
//     withdrawalInput,
//     id,
//   }: {
//     id: string;
//     withdrawalInput: Pick<WithdrawType, "amountWithdrawn">;
//   },
//   { WithdrawalModel, UserModel }: GraphContextType
// ) => {
//   const isUserExisting = await UserModel.findById(id).exec();
//   if (isUserExisting) {
//     if (withdrawalInput.amountWithdrawn > isUserExisting?.accountBalance!)
//       throw new UserInputError(
//         "You do not have that much in your account. Get a loan?"
//       );
//     const withdrawal = await WithdrawalModel.create(withdrawalInput);
//     await UserModel.findByIdAndUpdate(id, {
//       $push: {
//         withdrawals: withdrawal._id,
//       },
//       accountBalance:
//         isUserExisting.accountBalance! - withdrawal.amountWithdrawn,
//     }).exec();
//     return withdrawal;
//   } else throw new UserInputError("ID not existing");
// };
