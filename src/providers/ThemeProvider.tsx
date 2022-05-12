import { FunctionComponent, ReactNode, useEffect } from "react";
import { globalStyles } from "@/styles";

type ThemeProviderProps = {
  children?: ReactNode;
};

export const ThemeProvider: FunctionComponent<ThemeProviderProps> = ({
  children,
}) => {
  useEffect(() => {
    globalStyles();
  }, []);

  return <>{children}</>;
};
