import { FunctionComponent } from "react";
import { Button } from "@modulz/design-system";
import { ExitIcon } from "@radix-ui/react-icons";
import { useAuth } from "reactfire";

export const LogOutButton: FunctionComponent = () => {
  const auth = useAuth();

  return (
    <Button
      style={{ position: "fixed", zIndex: 999, right: 60, top: 15 }}
      onClick={() => auth.signOut()}
    >
      <ExitIcon />
    </Button>
  );
};
