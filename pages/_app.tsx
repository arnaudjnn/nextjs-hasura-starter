import React from "react";
import { AppProps } from "next/app";
import { Provider as NextAuthProvider } from "next-auth/client";
import { ChakraProvider } from "@chakra-ui/react";
import Layout from "components/layout";

const App = ({ Component, pageProps }: AppProps) => {
  const { session } = pageProps;

  return (
    <NextAuthProvider session={session}>
      <ChakraProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </NextAuthProvider>
  );
};

export default App;
