import { createContext, PropsWithChildren, useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { APP_ID, APP_SECRET, INITIAL_TOKEN } from '../constants';

type PagesType = {
  access_token: string;
  name: string;
  id: string;
};

type TokenContextProps = {
  isTokenLoading: boolean;
  isTokenError: boolean;
  pages: PagesType[];
};

type TokenProviderProps = PropsWithChildren;

async function getToken() {
  const response = await fetch(
    `https://graph.facebook.com/v21.0/oauth/access_token?grant_type=fb_exchange_token&client_id=${APP_ID}&client_secret=${APP_SECRET}&fb_exchange_token=${INITIAL_TOKEN}`
  );
  const data = await response.json();

  const responseToken = await fetch(
    `https://graph.facebook.com/v21.0/me/accounts?fields=id%2Cname%2Caccess_token&access_token=${data.access_token}`
  );
  return responseToken.json();
}

export const TokenContext = createContext<TokenContextProps>({
  isTokenError: false,
  isTokenLoading: false,
  pages: []
});

export function TokenProvider({ children }: TokenProviderProps) {
  const {
    data,
    isError: isTokenError,
    isLoading: isTokenLoading
  } = useQuery({
    queryFn: () => getToken(),
    queryKey: ['token'],
    refetchOnWindowFocus: false
  });

  return (
    <TokenContext.Provider
      value={{
        pages: data?.data ?? [],
        isTokenLoading,
        isTokenError
      }}
    >
      {children}
    </TokenContext.Provider>
  );
}

export function useToken() {
  return useContext(TokenContext);
}
