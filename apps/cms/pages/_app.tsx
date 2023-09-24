import './styles.css';

import { ChakraProvider } from '@chakra-ui/react';
import { AppProps } from 'next/app';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default CustomApp;
