import { AuthenticationError } from "apollo-server-micro";
import { JwtPayload } from "jsonwebtoken";
import { GraphContextType, TokenType } from "types";
import {
  AUTHORIZATION_ERROR_MESSAGE,
  authUser,
  handleError,
  verifyToken,
} from ".";
import config from "config";

// get environment variable from app config file
const {
  environmentVariable: { jwtRefreshSecret },
} = config;
const refreshToken = async (
  _: any,
  __: any,
  {
    RefreshTokenModel,
    req: {
      cookies: { token },
    },
    res,
  }: GraphContextType
): Promise<TokenType | void> => {
  // verify token authenticity, retrieve needed payload and handle error
  const { firstname, sub, aud } = verifyToken(
    token,
    jwtRefreshSecret
  ) as JwtPayload & { firstname: string };
  // re-authenticate/authorize
  const _token = authUser(
    { id: sub!, isAdmin: aud! == "admin" ? true : false, firstname },
    res
  );
  // overwrite token document
  const refresh = await RefreshTokenModel.findOneAndUpdate(
    {
      token,
    },
    { token: _token.refreshToken }
  ).exec();
  // return new token if refreshed ok or throw error
  return refresh
    ? _token
    : handleError(!refresh, AuthenticationError, AUTHORIZATION_ERROR_MESSAGE);
};

export default refreshToken;
