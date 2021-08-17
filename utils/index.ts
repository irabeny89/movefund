import { randomBytes, pbkdf2 } from "crypto";
import { promisify } from "util";
import { sign } from "jsonwebtoken";
import { Model } from "mongoose";
import { AuthenticationError, ValidationError } from "apollo-server-micro";
import {
  LoginInputType,
  TokenArgsType,
  UserCredentialType,
  UserType,
} from "../types";
import UserModel from "../models/modelUser";
import { NextApiResponse } from "next";

const getSalt = () => randomBytes(32).toString("hex");

const hashPassword = async (password: string, salt: string) => {
  const asyncPbkdf2 = promisify(pbkdf2);
  const hash = await asyncPbkdf2(password, salt, 50000, 64, "sha512");
  return hash.toString("hex");
};

const verifyPassword = async (
  password: string,
  hashedPassword: string,
  salt: string
) => {
  if ((await hashPassword(password, salt)) !== hashedPassword)
    throw new AuthenticationError("User not found");
};

const generateToken = ({
  secret,
  audience,
  issuer,
  ...payload
}: TokenArgsType): string =>
  sign(payload, secret, {
    expiresIn: "15m",
    audience,
    issuer,
  });

const genAuth = (
  {
    isAdmin,
    _id,
    firstname,
  }: Pick<TokenArgsType, "firstname" | "isAdmin" | "_id">,
  res: NextApiResponse
): string => {
  try {
    const accessTokenSecret = process.env.JWT_ACCESS_SECRET!;
    const refreshTokenSecret = process.env.JWT_REFRESH_SECRET!;
    const issuer = process.env.TOKEN_ISSUER || "http://localhost:3000";
    const userScope = isAdmin
      ? process.env.ADMIN_SCOPE!
      : process.env.USER_SCOPE!;
    const accessToken = generateToken({
      secret: accessTokenSecret,
      audience: userScope,
      isAdmin,
      firstname,
      _id,
      issuer,
    });
    const refreshToken = generateToken({
      secret: refreshTokenSecret,
      audience: userScope,
      isAdmin,
      firstname,
      _id,
      issuer,
    });
    res.setHeader("set-cookie", refreshToken);
    return accessToken;
  } catch (err) {
    throw new Error("Something went wrong while authenticating.");
  }
};

export const register = async (
  { password, email, ...rest }: UserCredentialType,
  UserModel: Model<UserType>,
  res: NextApiResponse
) => {
  try {
    if (await UserModel.findOne({ email }))
      throw new ValidationError("User already exist");
    if (!password.length) throw new ValidationError("Please enter password");
    if (password.length < 6)
      throw new ValidationError(
        "Please make password longer than 5 characters"
      );
    const salt = getSalt();
    const hashedPassword = await hashPassword(password, salt);
    const { isAdmin, firstname, _id } = await UserModel.create({
      salt,
      hashedPassword,
      email,
      ...rest,
    });
    return genAuth({ isAdmin, firstname, _id }, res);
  } catch (err) {
    throw err;
  }
};

export const logUserIn = async (
  { email, password }: LoginInputType,
  UserModel: Model<UserType>,
  res: NextApiResponse
): Promise<string | undefined> => {
  try {
    const user = await UserModel.findOne({ email })
      .select("_id firstname isAdmin hashedPassword salt")
      .exec();
    if (!user) throw new AuthenticationError("User not found!");
    await verifyPassword(password, user.hashedPassword, user.salt);
    const { _id, firstname, isAdmin } = user;
    return genAuth({ _id, firstname, isAdmin }, res);
  } catch (error) {
    throw error;
  }
};
