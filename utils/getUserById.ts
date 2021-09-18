import { UserInputError } from "apollo-server-core"
import mongoose from "mongoose"
import { GraphContextType, UserType } from "types"
import { handleAdminAuth, handleError, CREDITS_LOANS_WITHDRAWALS_POPULATION, DEBITS_POPULATION } from "."

const getUserById = async (_: any, { id }: {
  id: mongoose.Types.ObjectId
}, { UserModel,req: { headers: { authorization } } }: GraphContextType): Promise<UserType> => {
  // only admin permitted
  handleAdminAuth(authorization!)
  // get user document
  const user = await UserModel.findById(id).populate(CREDITS_LOANS_WITHDRAWALS_POPULATION).populate(DEBITS_POPULATION).exec()
  // throw error if user not found
  handleError(!user, UserInputError, "User not found.")
  
  return user!
}

export default getUserById