import { ApolloClient, InMemoryCache, HttpLink, from } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { RetryLink } from "@apollo/client/link/retry";
import { accessTokenVar } from "@/graphql/reactiveVariables";
import axios from "axios";
import config from "config";

const { graphqlUri } = config.environmentVariable;

const query = `{
  refreshToken {
    accessToken
  }
}
`;

console.log("=== refreshing token ===");

(async () => {
  try {
    const {
      data: { data },
    } = await axios({
      method: "post",
      data: { query },
      url: graphqlUri,
    });
    console.log("=== refreshed ===");
    // update token state variable
    accessTokenVar(data?.refreshToken?.accessToken);
  } catch (error) {
    console.error(error);
    console.log("xxx failed to refresh xxx");
  }
})();

const httpLink = new HttpLink({
  uri: graphqlUri,
  headers: {
    authorization: accessTokenVar() ? `Bearer ${accessTokenVar()}` : "",
  },
});

const errorLink = onError(
  ({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors) {
      graphQLErrors.forEach(
        ({ message, locations, path, extensions: { code } }) => {
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${JSON.stringify(
              locations
            )}, Path: ${path}`
          );
          switch (code) {
            case "UNAUTHENTICATED":
              const oldHeaders = operation.getContext().headers;
              operation.setContext({
                headers: {
                  ...oldHeaders,
                  authorization: accessTokenVar()
                    ? `Bearer ${accessTokenVar()}`
                    : "",
                },
              });

              return forward(operation);
          }
        }
      );
    }

    if (networkError) console.log(`[Network error]: ${networkError}`);
  }
);

const retryLink = new RetryLink({
  delay: {
    initial: 300,
    max: Infinity,
    jitter: true,
  },
  attempts: {
    max: 5,
    retryIf: (error, _operation) => !!error,
  },
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: from([errorLink, retryLink, httpLink]),
});

export default client;
