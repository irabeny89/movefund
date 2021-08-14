import { UserInputError, ValidationError } from "apollo-server-micro";
import type { AuthUserType, GraphContextType } from "../types";
import { register } from "../utils";

const resolvers = {
  Query: {
    hello: () => "world!",
  },
  Mutation: {
    register: async (
      _: any,
      { credential }: any
    ): Promise<AuthUserType | undefined> => {
      try {
        return await register(credential);
      } catch (err: any) {
        throw err;
      }
    },
  },
};

export default resolvers;
