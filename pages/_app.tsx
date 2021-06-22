import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import ResponsiveLayout from "../components/layout";

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <ChakraProvider>
      <ResponsiveLayout>
        <Component {...pageProps} />
      </ResponsiveLayout>
    </ChakraProvider>
  );
}
