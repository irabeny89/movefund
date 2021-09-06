import "bootstrap/dist/css/bootstrap.min.css";
import { ApolloProvider } from "@apollo/client";
import { useApollo } from "lib/apolloClient";
import type { AppProps } from "next/app";
import ErrorBoundary from "@/components/ErrorBoundary";

function MyApp({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps)
  return (
    <ErrorBoundary>
      <ApolloProvider client={apolloClient}>
      <Component {...pageProps} />
      </ApolloProvider>
    </ErrorBoundary>
  );
}
export default MyApp;
