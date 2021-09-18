import { ApolloClient, InMemoryCache, HttpLink, from } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { RetryLink } from "@apollo/client/link/retry";
import { accessTokenVar } from "@/graphql/reactiveVariables";
import axios from "axios";

const url = "/api/graphql";
const query = `{
  refreshToken {
    accessToken
  }
}
`;
axios({
  method: "post",
  data: { query },
  url,
})
  .then(
    ({ data }) => {
      console.log(data);

      // accessTokenVar(accessToken);
    }
  )
  .catch((err) => console.error(err));

const httpLink = new HttpLink({
  uri: "http://localhost:3000/api/graphql",
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
