import './styles.css';

import { ChakraProvider } from '@chakra-ui/react';
import { TokenContext } from '@personal-website/shared/token-context';
import * as jose from 'jose';
import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import React from 'react';

function CustomApp({ Component, pageProps }: AppProps) {
  const storedToken =
    typeof window !== 'undefined' && localStorage?.getItem('token');
  const [token, setToken] = React.useState(storedToken);
  const router = useRouter();

  const secret = new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET);

  React.useEffect(() => {
    jose.jwtVerify(token, secret).catch(() => router.push('/sign-in'));
  }, [router, secret, token]);

  return (
    <ChakraProvider>
      <TokenContext.Provider value={{ token, setToken }}>
        <Component {...pageProps} />
      </TokenContext.Provider>
    </ChakraProvider>
  );
}

export default CustomApp;
