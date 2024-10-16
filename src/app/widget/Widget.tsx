import React from 'react';
import { FacebookFeed } from './FacebookFeed';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SettingsProvider } from './providers';
import { WidgetProps } from './types';

import './public/styles.css';

const queryClient = new QueryClient();

export function Widget({ settings }: { settings: WidgetProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <SettingsProvider settings={settings}>
        <FacebookFeed />
      </SettingsProvider>
    </QueryClientProvider>
  );
}
