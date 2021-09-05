import { ForbiddenError } from "apollo-server-micro"
import { JwtPayload } from "jsonwebtoken"
import { GraphContextType, UserPayloadType, UserType } from "types"
import { getAccessToken, handleError, USER_POPULATION_OPTION, verifyToken } from "."

const getMyProfile = async (_: any, __: any, { UserModel, req: { headers: { authorization } } }: GraphContextType): Promise<UserType> => {
  // get user id
  const { id } = verifyToken(getAccessToken(authorization)!, process.env.JWT_ACCESS_SECRET!) as JwtPayload & UserPayloadType
  // throw error if not authorized
  handleError(!id, ForbiddenError, "You are forbidden, login to continue.")
  // get user document
  const user = await UserModel.findById(id!).populate(USER_POPULATION_OPTION).exec() as UserType

  return user
}

export default getMyProfile