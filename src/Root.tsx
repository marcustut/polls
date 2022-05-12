import { ComponentType, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { FirebaseAppProvider } from "reactfire";
import { config } from "@/lib/firebase";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { FirelordProvider } from "./providers/FirelordProvider";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const container = document.getElementById("root") as HTMLElement;
const root = createRoot(container);

function render(App: ComponentType) {
  root.render(
    <StrictMode>
      <FirebaseAppProvider firebaseConfig={config}>
        <FirelordProvider>
          <HelmetProvider>
            <ThemeProvider>
              <App />
              <ToastContainer position="bottom-left" theme="dark" />
            </ThemeProvider>
          </HelmetProvider>
        </FirelordProvider>
      </FirebaseAppProvider>
    </StrictMode>
  );
}

export default render;
