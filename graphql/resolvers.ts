import type {
  AuthUserType,
  GraphContextType,
  LoginInputType,
  UserCredentialType,
} from "../types";
import { logUserIn, register } from "../utils";

const resolvers = {
  Query: {
    hello: () => "world!",
  },
  Mutation: {
    register: async (
      _: any,
      { registerInput }: { registerInput: UserCredentialType }
    ): Promise<AuthUserType | undefined> => {
      try {
        return await register(registerInput);
      } catch (err: any) {
        throw err;
      }
    },
    login: async (
      _: any,
      { loginInput }: { loginInput: LoginInputType },
      { UserModel }: GraphContextType
    ): Promise<AuthUserType | undefined> => {
      try {
        return logUserIn(loginInput, UserModel);
      } catch (err) {
        throw err;
      }
    },
  },
};

export default resolvers;
