import { ApolloServer } from "apollo-server-micro";
import {
  ApolloServerPluginLandingPageGraphQLPlayground,
  ApolloServerPluginLandingPageDisabled,
} from "apollo-server-core";
import typeDefs from "@/graphql/typeDefs";
import resolvers from "@/graphql/resolvers";
import type { GraphContextType, ContextArgType } from "types";
import UserModel from "@/models/userModel";
import DebitModel from "@/models/debitModel";
import CreditModel from "@/models/creditModel";
import LoanModel from "@/models/loanModel";
import WithdrawalModel from "@/models/withdrawalModel";
import RefreshTokenModel from "@/models/refreshTokenModel";
import dbConnection from "@/models/index";

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [
    process.env.NODE_ENV === "production"
      ? ApolloServerPluginLandingPageDisabled()
      : ApolloServerPluginLandingPageGraphQLPlayground(),
  ],
  context: async ({ req, res }: ContextArgType): Promise<GraphContextType> => {
    await dbConnection();
    return {
      req,
      res,
      UserModel,
      DebitModel,
      CreditModel,
      LoanModel,
      WithdrawalModel,
      RefreshTokenModel,
    };
  },
});

export default apolloServer;
