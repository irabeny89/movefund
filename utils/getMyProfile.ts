import { AuthenticationError } from "apollo-server-micro";
import { JwtPayload } from "jsonwebtoken";
import { GraphContextType, UserType } from "types";
import {
  getAccessToken,
  handleError,
  CREDITS_LOANS_WITHDRAWALS_POPULATION,
  DEBITS_POPULATION,
  verifyToken,
} from ".";
import config from "config";

const getMyProfile = async (
  _: any,
  __: any,
  {
    UserModel,
    req: {
      headers: { authorization },
    },
  }: GraphContextType
): Promise<UserType> => {
  // retrieve jwt access secret from environment variable in config
  const {
    environmentVariable: { jwtAccessSecret },
  } = config;
  // get user id from payload
  const { sub } = verifyToken(
    getAccessToken(authorization)!,
    jwtAccessSecret
  ) as JwtPayload & { firstname: string };
  // throw error if not authorized
  handleError(
    !sub,
    AuthenticationError,
    "You are forbidden, login to continue."
  );
  // get user document
  const user = (await UserModel.findById(sub!)
    .populate(CREDITS_LOANS_WITHDRAWALS_POPULATION)
    .populate(DEBITS_POPULATION)
    .exec()) as UserType;

  return user;
};

export default getMyProfile;
