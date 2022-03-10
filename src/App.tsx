import React from 'react';
import { FirebaseAppProvider } from 'reactfire';

import { firebaseConfig } from '@/config';
import { AppProvider } from '@/providers/AppProvider';
import { AppRoutes } from '@/routes';

const App: React.FC = () => {
  return (
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <AppProvider>
        <AppRoutes />
      </AppProvider>
    </FirebaseAppProvider>
  );
};

export default App;
