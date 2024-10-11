import { createContext, PropsWithChildren, useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { APP_ID, APP_SECRET, INITIAL_TOKEN } from '../constants';
import { useSettings } from './SettingsProvider';

type TokenContextProps = {
  isTokenLoading: boolean;
  isTokenError: boolean;
  token: string;
};

type TokenProviderProps = PropsWithChildren;

async function getToken(pageID: string) {
  const response = await fetch(
    `https://graph.facebook.com/v21.0/oauth/access_token?grant_type=fb_exchange_token&client_id=${APP_ID}&client_secret=${APP_SECRET}&fb_exchange_token=${INITIAL_TOKEN}`
  );
  const data = await response.json();

  const responseToken = await fetch(
    `https://graph.facebook.com/v21.0/${pageID}?fields=access_token&access_token=${data.access_token}`
  );
  return responseToken.json();
}

export const TokenContext = createContext<TokenContextProps>({
  isTokenError: false,
  isTokenLoading: false,
  token: ''
});

export function TokenProvider({ children }: TokenProviderProps) {
  const { pageID } = useSettings();
  const {
    data,
    isError: isTokenError,
    isLoading: isTokenLoading
  } = useQuery({
    queryFn: () => getToken(pageID),
    queryKey: ['token', pageID],
    enabled: !!pageID,
    refetchOnWindowFocus: false
  });

  return (
    <TokenContext.Provider
      value={{
        token: data?.access_token,
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
