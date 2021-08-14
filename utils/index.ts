import { randomBytes, pbkdf2 } from "crypto";
import { promisify } from "util";
import { sign } from "jsonwebtoken";
import { Model } from "mongoose";
import { AuthenticationError, ValidationError } from "apollo-server-micro";
import {
  LoginInputType,
  TokenArgsType,
  UserCredentialType,
  AuthUserType,
  UserType,
} from "../types";
import UserModel from "../models/modelUser";

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
  const hash = await hashPassword(password, salt);
  return hash === hashedPassword;
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

const validatePassword = (password: string) => {
  if (!password.length) throw new ValidationError("Please enter password");
  if (password.length < 6)
    throw new ValidationError("Please make password longer than 5 characters");
};

const getAuth = ({
  isAdmin,
  _id,
  firstname,
}: {
  isAdmin: boolean;
  firstname: string;
  _id: string;
}): {
  accessToken: string;
  refreshToken: string;
  isAdmin: boolean;
  firstname: string;
  _id: string;
} => {
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
      firstname,
      _id,
      issuer,
    });
    const refreshToken = generateToken({
      secret: refreshTokenSecret,
      audience: userScope,
      firstname,
      _id,
      issuer,
    });
    return {
      firstname,
      _id,
      isAdmin,
      accessToken,
      refreshToken,
    };
  } catch (err) {
    throw new Error("Something went wrong while authenticating.");
  }
};

export const register = async ({ password, ...rest }: UserCredentialType) => {
  try {
    validatePassword(password);
    const salt = getSalt();
    const hashedPassword = await hashPassword(password, salt);
    const { isAdmin, firstname, _id } = await UserModel.create({
      salt,
      hashedPassword,
      ...rest,
    });
    return getAuth({ isAdmin, firstname, _id });
  } catch (err) {
    throw err;
  }
};

export const logUserIn = async (
  { email, password }: LoginInputType,
  UserModel: Model<UserType>
): Promise<AuthUserType | undefined> => {
  try {
    const user = await UserModel.findOne({ email })
      .select("_id firstname isAdmin hashedPassword salt")
      .exec();
    if (!user) throw new AuthenticationError("User not found!");
    if ((await hashPassword(password, user.salt)) !== user.hashedPassword)
      throw new AuthenticationError("Wrong inputs!");
    const { _id, firstname, isAdmin } = user;
    return getAuth({ _id, firstname, isAdmin });
  } catch (error) {
    throw error;
  }
};
