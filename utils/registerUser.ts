import mongoose from "mongoose";
import { UserInputError, AuthenticationError } from "apollo-server-micro";
import { GraphContextType, TokenType, UserType } from "types";
import { authUser, handleEncryption, handleError } from ".";

const registerUser = async (
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
): Promise<TokenType> => {
  // throw error if already existing
  handleError(
    await UserModel.findOne({ email: rest.email }),
    AuthenticationError,
    "User with this email exist."
  );
  // throw error if password length is not valid
  handleError(
    password.length < 6,
    UserInputError,
    "Password should be longer than 6 characters"
  );
  // create user document
  const userDoc = new UserModel({
    ...rest,
    ...(await handleEncryption(password)),
  });
  // create access and refresh tokens and set cookie
  const token = authUser({ id: userDoc._id, isAdmin: userDoc?.isAdmin! }, res);
  // create refresh token document
  const refreshTokenDoc = new RefreshTokenModel({
    token: token.refreshToken,
  });
  // run query with transaction
  const session = await mongoose.startSession();
  await session.withTransaction(async () => {
    await userDoc.save({ session });
    await refreshTokenDoc.save({ session });
  });
  session.endSession();
  
  return token;
};

export default registerUser;
