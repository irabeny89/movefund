import "bootstrap/dist/css/bootstrap.min.css";
import { ApolloProvider } from "@apollo/client";
import type { AppProps } from "next/app";
import ErrorBoundary from "@/components/ErrorBoundary";
import client from "@/graphql/apollo-client";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    // <ErrorBoundary>
      <ApolloProvider client={client}>
        <Component {...pageProps} />
      </ApolloProvider>
    // {/* </ErrorBoundary> */}
  );
}
export default MyApp;
