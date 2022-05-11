import { DarkThemeButton } from "@/components/DarkThemeButton";
import { Box, Button } from "@modulz/design-system";
import { FunctionComponent } from "react";
import { Helmet } from "react-helmet-async";

export const View: FunctionComponent = () => {
  return (
    <>
      <Helmet>
        <title>View</title>
      </Helmet>

      <Box>
        <DarkThemeButton />

        <Button>Hi</Button>
      </Box>
    </>
  );
};
