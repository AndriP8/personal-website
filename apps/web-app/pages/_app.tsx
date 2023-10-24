import './styles.css';

import { ChakraProvider } from '@chakra-ui/react';
import { Layout } from '@personal-website/web-app/components';
import { AppProps } from 'next/app';
import Head from 'next/head';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Welcome to web-app!</title>
      </Head>
      <ChakraProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </>
  );
}

export default CustomApp;
