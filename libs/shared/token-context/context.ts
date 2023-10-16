import React from 'react';

export const TokenContext = React.createContext({
  token: '',
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setToken: (token: string) => {},
});
