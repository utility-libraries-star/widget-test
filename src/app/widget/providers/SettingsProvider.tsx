import React, { createContext, ReactNode, useContext } from 'react';
import { getSettings } from '../utils';
import { defaultSettings } from '../constants';
import { WidgetProps } from '../types';

export const SettingsContext = createContext<WidgetProps>({
  ...defaultSettings
});

export function SettingsProvider({
  settings,
  children
}: {
  settings: WidgetProps;
  children: ReactNode;
}) {
  const value = getSettings(settings);

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  return useContext(SettingsContext);
}
