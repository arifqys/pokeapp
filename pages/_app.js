import "../styles/globals.css";
import { ApolloProvider } from "@apollo/client";
import { ChakraProvider } from "@chakra-ui/react";
import Footer from "../src/components/Footer";
import Head from "next/head";
import NextNprogress from "nextjs-progressbar";
import client from "../src/lib/apollo-client";

// eslint-disable-next-line react/prop-types
function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <ChakraProvider>
        <Head>
          <title>Pokeapp</title>
          <meta content="Generated by create next app" name="description" />
          <link href="/favicon.ico" rel="icon" />
        </Head>

        <NextNprogress
          color="#29D"
          height={3}
          showOnShallow={true}
          startPosition={0.3}
          stopDelayMs={200}
        />

        <main className="container">
          <Component {...pageProps} />

          <Footer />
        </main>
      </ChakraProvider>
    </ApolloProvider>
  );
}

export default MyApp;
