import mongoose from "mongoose"
import { AuthenticationError } from "apollo-server-micro";
import { UserType, GraphContextType, TokenType } from "types";
import { authUser, comparePassword, handleError } from ".";

const login = async (
  _: any,
  { email, password: loginPassword }: Pick<UserType, "email" | "password">,
  { UserModel, RefreshTokenModel, res }: GraphContextType
): Promise<TokenType> => {
  // find user
  const user = await UserModel.findOne({ email }).exec();
  // throw error if user doesn't exist
  handleError(!user, AuthenticationError, "Authentication error");
  // compare passwords and handle error
  await comparePassword(user?.password!, loginPassword, user?.salt!);
  // authorize and authenticate
  const token = authUser({ id: user?._id, isAdmin: user?.isAdmin! }, res);
  // find and update or create refresh token
  await RefreshTokenModel.findOneAndUpdate(
    {
      email,
    },
    {
      token: token.refreshToken,
    },
    {
      upsert: true,
    }
  ).exec();

  return token;
};

export default login;
