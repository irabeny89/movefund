import { ApolloServer } from "apollo-server-micro";
import {
  ApolloServerPluginLandingPageGraphQLPlayground,
  ApolloServerPluginLandingPageDisabled,
} from "apollo-server-core";
import typeDefs from "@/graphql/typeDefs";
import resolvers from "@/graphql/resolvers";
import type { GraphContextType, ContextArgType } from "types";
import getUserLoader from "@/graphql/dataloaders/userLoader";
import getTransferOutLoader from "@/graphql/dataloaders/transferOutLoader";
import getTransferInLoader from "@/graphql/dataloaders/transferInLoader";
import getWithdrawalLoader from "@/graphql/dataloaders/withdrawalLoader";
import getLoanLoader from "@/graphql/dataloaders/loanLoader";
import UserModel from "@/models/userModel";
import TransferInModel from "@/models/transferInModel";
import TransferOutModel from "@/models/transferOutModel";
import WithdrawalModel from "@/models/withdrawalModel";
import LoanModel from "@/models/loanModel";
import SelfTransferModel from "@/models/selfTransferModel";
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
      users: getUserLoader(),
      transfersIn: getTransferInLoader(),
      transfersOut: getTransferOutLoader(),
      withdrawals: getWithdrawalLoader(),
      loans: getLoanLoader(),
      UserModel,
      TransferInModel,
      TransferOutModel,
      WithdrawalModel,
      LoanModel,
      SelfTransferModel,
      RefreshTokenModel,
    };
  },
});

export default apolloServer;
