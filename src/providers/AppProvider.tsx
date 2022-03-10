import { createTheme, NextUIProvider } from '@nextui-org/react';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider, FirestoreProvider, useFirebaseApp } from 'reactfire';
import useDarkMode from 'use-dark-mode';

import { AuthWrapper } from '@/features/auth';

const lightTheme = createTheme({ type: 'light' });
const darkTheme = createTheme({ type: 'dark' });

export const AppProvider: React.FC = ({ children }) => {
  const darkMode = useDarkMode(true);
  const firestore = getFirestore(useFirebaseApp());
  const auth = getAuth(useFirebaseApp());

  return (
    <React.Suspense fallback={<div>TODO Fallback</div>}>
      <NextUIProvider theme={darkMode.value ? darkTheme : lightTheme}>
        <AuthProvider sdk={auth}>
          <FirestoreProvider sdk={firestore}>
            <AuthWrapper>
              <BrowserRouter>{children}</BrowserRouter>
            </AuthWrapper>
          </FirestoreProvider>
        </AuthProvider>
      </NextUIProvider>
    </React.Suspense>
  );
};
