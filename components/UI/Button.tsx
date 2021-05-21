import { ComponentType } from "react";
import styled from "@emotion/styled";
import { fontSizes } from "../UI/Typography";

const Variant = {
  Default: "default",
  Primary: "primary",
  White: "white",
  Error: "error",
} as const;

type Size = "small" | "regular";

type Variant = typeof Variant[keyof typeof Variant];

interface State {
  hover: boolean;
}

function backgroundColorMap(
  { theme, variant, clickable }: any,
  { hover = false }: State = { hover: false }
) {
  const staticMap: Record<Variant, string> = {
    default: theme.colors.black,
    primary: theme.colors.blue,
    white: theme.colors.white,
    error: theme.colors.red,
  } as const;

  const hoverMap: Record<Variant, string> = clickable
    ? {
        default: theme.colors.gray8,
        primary: "#3460F3",
        white: theme.colors.gray1,
        error: theme.colors.red2,
      }
    : staticMap;

  return (hover ? hoverMap : staticMap)[variant];
}

function colorMap(
  { theme, variant, clickable }: any /* ButtonPropsWithTheme */,
  { hover = false }: State = { hover: false }
) {
  const staticMap: Record<Variant, string> = {
    default: theme.colors.white,
    primary: theme.colors.white,
    white: clickable ? theme.colors.black : theme.colors.gray6,
    error: theme.colors.white,
  } as const;

  const hoverMap: Record<Variant, string> = clickable
    ? {
        default: theme.colors.white,
        primary: theme.colors.white,
        white: theme.colors.gray1,
        error: theme.colors.white,
      }
    : staticMap;

  return (hover ? hoverMap : staticMap)[variant];
}

function sizeMap({ size = "regular" }: any) {
  const staticMap: Record<Size, string> = {
    small: `
      min-height: 24px;
      padding: 0px 8px;
      font-size: ${fontSizes.small};
    `,
    regular: `
      min-height: 34px;
      padding: 4px 16px;
      font-size: ${fontSizes.regular};
    `,
  } as const;

  return staticMap[size];
}

export function createButtonComponent(component?: ComponentType<any>) {
  const result = component ? styled(component) : styled.button;
  const Button = result`
    transition: all 0.2s ease-in-out;
    appearance: none;
    background-color: ${backgroundColorMap};
    border: 1px solid ${({ variant, theme }) => (variant === "white" ? theme.cardBorder : "none")};
    color: ${colorMap};
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    ${sizeMap}

    border-radius: 2px;
    flex-shrink: 0;
    cursor: ${({ clickable }) => (clickable ? "pointer" : "default")};

    &:hover {
      background-color: ${({ theme, variant }) =>
        backgroundColorMap({ theme, variant }, { hover: true })};
      ${({ clickable }) =>
        !clickable
          ? ""
          : `
        transform: translate3d(0, -0.5px, 0);
       
      `}
    }

    &:disabled {
      background-color: ${({ theme }) => theme.colors.gray4};
      cursor: default;
      box-shadow: unset;

      &:hover {
        transform: unset;
        box-shadow: unset;
      }
    }
  `;

  Button.defaultProps = {
    variant: Variant.Default,
    clickable: true,
  };

  return Button;
}

export default createButtonComponent();
