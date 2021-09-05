import mongoose from "mongoose"
import { JwtPayload } from "jsonwebtoken";
import { GraphContextType, TokenType, UserPayloadType } from "types";
import { authUser, verifyToken } from ".";

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
): Promise<TokenType> => {
  // verify token authenticity and handle error
  const { id, isAdmin } = verifyToken(token, process.env.JWT_REFRESH_SECRET!) as JwtPayload & UserPayloadType
  // re-authenticate/authorize
  const _token = authUser({ id, isAdmin }, res)
  // overwrite token document
  await RefreshTokenModel.findOneAndReplace({
    token
  }, { token: _token.refreshToken })

  // return new token
  return _token
};

export default refreshToken