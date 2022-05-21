import { FunctionComponent } from "react";
import { Button } from "@modulz/design-system";
import { ExitIcon } from "@radix-ui/react-icons";
import { toast } from "react-toastify";

export const LogOutButton: FunctionComponent = () => {
  return (
    <Button
      style={{ position: "fixed", zIndex: 999, right: 60, top: 15 }}
      onClick={() => toast.error("not implemented")}
    >
      <ExitIcon />
    </Button>
  );
};
