import { getFirestore } from "firebase/firestore";
import { FunctionComponent } from "react";
import { BrowserRouter } from "react-router-dom";
import { FirestoreProvider, useFirebaseApp } from "reactfire";
import { AppRoutes } from "@/routes";

import "modern-normalize/modern-normalize.css";

const App: FunctionComponent = () => {
  const firestore = getFirestore(useFirebaseApp());

  return (
    <>
      <FirestoreProvider sdk={firestore}>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </FirestoreProvider>
    </>
  );
};

export default App;
