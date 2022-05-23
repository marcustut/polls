import { FunctionComponent } from "react";
import { Button } from "@modulz/design-system";
import { ExitIcon } from "@radix-ui/react-icons";
import { signOut, getAuth } from "firebase/auth";

export const LogOutButton: FunctionComponent = () => {
  const auth = getAuth();
  return (
    <Button
      style={{ position: "fixed", zIndex: 999, right: 60, top: 15 }}
      onClick={() => signOut(auth)}
    >
      <ExitIcon />
    </Button>
  );
};
