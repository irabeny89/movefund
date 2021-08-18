import type { GraphContextType, UserType } from "types";
import { ValidationError, UserInputError } from "apollo-server-micro";

const mutationResponse = "Completed";

const resolvers = {
  Query: {
    hello: () => "world!",
    getUser: async (
      _: any,
      { id }: { id: string },
      { users }: GraphContextType
    ): Promise<UserType> => {
      try {
        return await users.load(id);
      } catch (error) {
        throw new UserInputError("ID not existing");
      }
    },
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
    ): Promise<UserType> => {
      const isExisting = await UserModel.findOne({ email: userInfo.email });
      if (isExisting) throw new ValidationError("Already existing");
      return await UserModel.create(userInfo);
    },
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
    ) => {
      const isExisting = await UserModel.findByIdAndUpdate(
        id,
        userUpdate
      ).exec();
      if (!isExisting) throw new UserInputError("ID not existing");
      return isExisting;
    },
    removeUser: async (
      _: any,
      { id }: { id: string },
      { UserModel }: GraphContextType
    ): Promise<string> => {
      const isExisting = await UserModel.findByIdAndDelete(id).exec();
      if (!isExisting) throw new UserInputError("ID not existing");
      return mutationResponse;
    },
  },
};

export default resolvers;
