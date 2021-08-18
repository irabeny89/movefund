import { ApolloServer } from "apollo-server-micro";
import {
  ApolloServerPluginLandingPageGraphQLPlayground,
  ApolloServerPluginLandingPageDisabled,
} from "apollo-server-core";
import typeDefs from "./typeDefs";
import resolvers from "./resolvers";
import type { GraphContextType, ContextArgType } from "types";
import getUserLoader from "./dataloaders/userLoader";
import getMoneyInLoader from "./dataloaders/moneyInLoader";
import getMoneyOutLoader from "./dataloaders/moneyOutLoader";
import UserModel from "../models/modelUser";
import dbConnection from "../models";

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [
    process.env.NODE_ENV === "production"
      ? ApolloServerPluginLandingPageDisabled()
      : ApolloServerPluginLandingPageGraphQLPlayground(),
  ],
  context: async ({ req, res }: ContextArgType): Promise<GraphContextType> => {
    await dbConnection()
    return {
      req,
      res,
      users: getUserLoader(),
      moneyIns: getMoneyInLoader(),
      moneyOuts: getMoneyOutLoader(),
      UserModel,
    };
  },
});

export default apolloServer;
