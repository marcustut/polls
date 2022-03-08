import { NextUIProvider } from '@nextui-org/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

export const AppProvider: React.FC = ({ children }) => {
  return (
    <React.Suspense fallback={<div>TODO Fallback</div>}>
      <NextUIProvider>
        <BrowserRouter>{children}</BrowserRouter>
      </NextUIProvider>
    </React.Suspense>
  );
};
