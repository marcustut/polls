import { FunctionComponent, ReactNode } from "react";
import { Helmet } from "react-helmet-async";
import { getCssText } from "@modulz/design-system";

const convertDangerousHtmlToChildren = (node: any) => {
  if (node.props && node.props.dangerouslySetInnerHTML) {
    return {
      ...node,
      props: {
        ...node.props,
        dangerouslySetInnerHTML: undefined,
        children: node.props.dangerouslySetInnerHTML.__html,
      },
    };
  }
  return node;
};

type ThemeProviderProps = {
  children?: ReactNode;
};

export const ThemeProvider: FunctionComponent<ThemeProviderProps> = ({
  children,
}) => {
  return (
    <>
      <Helmet>
        {convertDangerousHtmlToChildren(
          <style
            id="stitches"
            dangerouslySetInnerHTML={{ __html: getCssText() }}
          />
        )}
      </Helmet>
      {children}
    </>
  );
};
