import { ApolloClient, InMemoryCache, makeVar } from "@apollo/client"
import { JwtPayload } from "jsonwebtoken";
import { UserPayloadType } from "types";

export const authVar = makeVar<JwtPayload & UserPayloadType>({});

const client = new ApolloClient({
  uri: "http://localhost:3000/api/graphql",
  cache: new InMemoryCache()
})

export default client