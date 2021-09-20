import { GraphContextType, UserType } from "types";
import {
  handleAdminAuth,
  CREDITS_LOANS_WITHDRAWALS_POPULATION,
  DEBITS_POPULATION,
} from ".";

const getAllUsers = async (
  _: any,
  __: any,
  {
    UserModel,
    req: {
      headers: { authorization },
    },
  }: GraphContextType
): Promise<UserType[]> => {
  // handle admin auth and error
  handleAdminAuth(authorization!);
  // return all users array
  const users = await UserModel.find({})
    .populate(CREDITS_LOANS_WITHDRAWALS_POPULATION)
    .populate(DEBITS_POPULATION)
    .exec();

  return users;
};

export default getAllUsers;
