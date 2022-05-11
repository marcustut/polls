import { ComponentType, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { FirebaseAppProvider } from "reactfire";
import { config } from "@/lib/firebase";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "./providers/ThemeProvider";

const container = document.getElementById("root") as HTMLElement;
const root = createRoot(container);

function render(App: ComponentType) {
  root.render(
    <StrictMode>
      <FirebaseAppProvider firebaseConfig={config}>
        <HelmetProvider>
          <ThemeProvider>
            <App />
          </ThemeProvider>
        </HelmetProvider>
      </FirebaseAppProvider>
    </StrictMode>
  );
}

export default render;
