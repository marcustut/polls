import { FunctionComponent, useEffect, useState } from "react";
import { Button, darkTheme } from "@modulz/design-system";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";

export const DarkThemeButton: FunctionComponent = () => {
  const [theme, setTheme] = useState("dark-theme");

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
      {theme === "theme-default" ? <MoonIcon /> : <SunIcon />}
    </Button>
  );
};
