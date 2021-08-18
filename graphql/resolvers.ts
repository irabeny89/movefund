import type { GraphContextType, UserType } from "types";
import { create, read, remove, update } from "../utils";

export const mutationResponse = "Completed";

const resolvers = {
  Query: {
    hello: () => "world!",
    getUser: async (
      _: any,
      { id }: { id: string },
      { users }: GraphContextType
    ): Promise<UserType> => await read<UserType>(id, users),
    getAllUsers: async (
      _: any,
      __: any,
      { UserModel }: GraphContextType
    ): Promise<UserType[]> => await UserModel.find({}),
  },
  Mutation: {
    register: async (
      _: any,
      { userInfo }: { userInfo: UserType },
      { UserModel }: GraphContextType
    ): Promise<UserType> => await create<UserType>(UserModel, userInfo),
    updateUser: async (
      _: any,
      {
        id,
        userUpdate,
      }: {
        id: string;
        userUpdate: Pick<
          UserType,
          | "avatar"
          | "street"
          | "localGovernmentArea"
          | "city"
          | "state"
          | "country"
        >;
      },
      { UserModel }: GraphContextType
    ): Promise<string> => await update<UserType>(UserModel, id, userUpdate),
    removeUser: async (
      _: any,
      { id }: { id: string },
      { UserModel }: GraphContextType
    ): Promise<string> => await remove<UserType>(UserModel, id),
  },
};

export default resolvers;
