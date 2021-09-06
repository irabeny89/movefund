import mongoose from "mongoose";
import { GraphContextType, UserType } from "types";
import { handleAdminAuth, USER_POPULATION_OPTION } from ".";

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
    .populate(USER_POPULATION_OPTION)
    .exec();

  return users;
};

export default getAllUsers;
