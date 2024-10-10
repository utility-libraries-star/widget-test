import type { Metadata } from 'next';
import './globals.css';
import React, { ReactNode } from 'react';
import { Providers } from './providers';

export const metadata: Metadata = {
  title: 'Facebook Feed',
  description: 'Create Facebook Feed Widget'
};

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
