import { client } from "../lib/apollo";
import { ApolloProvider } from "@apollo/client";
import { AuthProvider } from "../hooks/useAuth";
import Layout from "../components/layout";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ApolloProvider>
  );
}

export default MyApp;
