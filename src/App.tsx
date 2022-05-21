import { FunctionComponent, Suspense } from "react";
import { HashRouter } from "react-router-dom";
import { AuthProvider, FirestoreProvider, useFirebaseApp } from "reactfire";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

import { AppRoutes } from "@/routes";

import "modern-normalize/modern-normalize.css";

const App: FunctionComponent = () => {
  const firestore = getFirestore(useFirebaseApp());
  const auth = getAuth(useFirebaseApp());

  return (
    <>
      <FirestoreProvider sdk={firestore}>
        <AuthProvider sdk={auth}>
          <HashRouter>
            <AppRoutes />
          </HashRouter>
        </AuthProvider>
      </FirestoreProvider>
    </>
  );
};

export default App;
