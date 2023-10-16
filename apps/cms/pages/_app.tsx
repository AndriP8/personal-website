import './styles.css';

import { ChakraProvider } from '@chakra-ui/react';
import { TokenContext } from '@personal-website/shared/token-context';
import { AppProps } from 'next/app';
import React from 'react';

function CustomApp({ Component, pageProps }: AppProps) {
  const storedToken =
    typeof window !== 'undefined' && localStorage?.getItem('token');
  const [token, setToken] = React.useState(storedToken);
  return (
    <ChakraProvider>
      <TokenContext.Provider value={{ token, setToken }}>
        <Component {...pageProps} />
      </TokenContext.Provider>
    </ChakraProvider>
  );
}

export default CustomApp;
