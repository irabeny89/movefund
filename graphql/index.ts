import { ApolloServer } from "apollo-server-micro";
import {
  ApolloServerPluginLandingPageGraphQLPlayground,
  ApolloServerPluginLandingPageDisabled,
} from "apollo-server-core";
import typeDefs from "./typeDefs";
import resolvers from "./resolvers";
import { NextApiRequest } from "next";

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [
    process.env.NODE_ENV === "production"
      ? ApolloServerPluginLandingPageDisabled
      : ApolloServerPluginLandingPageGraphQLPlayground(),
  ],
  context: ({ req }: { req: NextApiRequest }) => ({ req }),
});

export default apolloServer;
