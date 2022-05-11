import { FunctionComponent, useEffect, useState } from "react";
import { Button, darkTheme } from "@modulz/design-system";

export const DarkThemeButton: FunctionComponent = () => {
  const [theme, setTheme] = useState("theme-default");

  useEffect(() => {
    document.body.classList.remove("theme-default", darkTheme);
    document.body.classList.add(theme);
  }, [theme]);

  return (
    <Button
      style={{ position: "fixed", zIndex: 999, right: 15, top: 15 }}
      onClick={() =>
        setTheme(theme === "theme-default" ? darkTheme : "theme-default")
      }
    >
      Toggle theme
    </Button>
  );
};
