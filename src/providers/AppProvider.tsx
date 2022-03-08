import { createTheme, NextUIProvider } from '@nextui-org/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import useDarkMode from 'use-dark-mode';

const lightTheme = createTheme({ type: 'light' });
const darkTheme = createTheme({ type: 'dark' });

export const AppProvider: React.FC = ({ children }) => {
  const darkMode = useDarkMode(true);

  return (
    <React.Suspense fallback={<div>TODO Fallback</div>}>
      <NextUIProvider theme={darkMode.value ? darkTheme : lightTheme}>
        <BrowserRouter>{children}</BrowserRouter>
      </NextUIProvider>
    </React.Suspense>
  );
};
