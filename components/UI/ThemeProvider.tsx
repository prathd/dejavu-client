import React from "react";
import { ThemeProvider } from "emotion-theming";

const colors = {
  white: "#FFFFFF",

  /* black is an alias for gray9 */
  black: "#1B202B",

  /** Blue gray */
  gray1: "#F8FAFC",
  gray2: "#EEF2F6",
  gray3: "#E3E8EF",
  gray4: "#CDD5DF",
  gray5: "#A3AEBE",
  gray6: "#748094",
  gray7: "#4C5566",
  gray8: "#2F3747",
  gray9: "#1B202B",

  blue: "#5BC0EB",
  blue2: "#40586b",
  blue3: "#EEF3F8",
  blueTransparent: "rgba(91, 192, 235, .1)",

  red: "#F47463",
  red2: "#FF8464",

  yellow: "#FDE74C",

  transparent: "rgba(0,0,0,0)",

  /* Experimental only */
  white2: "hsl(0,0%,96%)",
  black4: "hsl(0,0%,15%)",
};

export const elevations = {
  sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
  md: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
  lg: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
  xl: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
  xxl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
  test: "0 6px 4px -4px rgba(0, 0, 0, 0.2)",
};

export const chartColors = {
  blue: "#5BC0EB",
  blueShade1: "#52ADD4",
  blueShade2: "#4A9CBE",
  blueShade3: "#428CAB",
  blueShade4: "#3C7E9A",

  green: "#9BC53D",
  greenShade1: "#8CB137",
  greenShade2: "#7EA031",
  greenShade3: "#71902C",
  greenShade4: "#668128",

  red: "#E55934",
  redShade1: "#CE502F",
  redShade2: "#B9482A",
  redShade3: "#A74126",
  redShade4: "#963A22",

  yellow: "#FDE74C",
  yellowShade1: "#E4D044",
  yellowShade2: "#CDBB3E",
  yellowShade3: "#B8A837",
  yellowShade4: "#A69832",
};

/**
 * This is the primary theme
 */
const themeLight = {
  text: colors.gray9 /** primary text */,
  inverseText: colors.white,
  textTitle: colors.gray9 /** h1 style text */,

  background: colors.gray1,
  inverseBackground: colors.black,

  primaryBackground: colors.white,

  buttonText: colors.gray9,
  buttonTextHover: colors.white,
  buttonBorder: colors.gray9,
  buttonBackground: colors.transparent,
  buttonBackgroundHover: "rgba(0, 0, 0, 1)",

  primaryButtonText: colors.white,
  primaryButtonTextHover: colors.white,
  primaryButtonBorder: colors.black,
  primaryButtonBackground: colors.black,
  primaryButtonBackgroundHover: colors.gray7,

  link: colors.blue,

  error: colors.red,
  loading: colors.yellow,
  success: colors.blue,

  inputBackground: colors.white,
  inputBackgroundBlue: colors.blue3,
  inputBorder: colors.gray4,

  secondaryIcon: colors.gray3,
  secondaryIconHover: colors.gray4,

  formControlInputBorder: colors.black,
  formControlPopupBorder: colors.gray2,
  formControlPopupShadow: "rgba(37, 40, 43, 0.12)",
  formControlPopupBackground: colors.white,
  formControlPopupBackgroundActive: "#f8f8f8",
  formControlPopupOption: "#333",

  logoColor: colors.black,

  sidebarBackground: colors.white,
  sidebarText: colors.gray6,
  sidebarTextActive: colors.black,
  sidebarTextHover: colors.gray7,
  sidebarHoverBackground: colors.gray3,

  cardBackground: colors.white,
  cardSecondaryBackground: colors.gray4,
  cardText: colors.gray7,
  cardBorder: colors.gray3,
  cardBorderHover: colors.gray4,
  cardHeader: colors.gray7,
  cardSectionHighlight: colors.blueTransparent,
  cardText2: colors.gray6,
  cardElevation: elevations.sm,
  cardElevationHover: elevations.lg,

  topNavBackground: colors.white,

  toolContentBackground: "#f2f2f2",
  toolbarRowBackground: colors.white,

  tabBarBackground: "#f1f3f4" /* From Rows n Columns theme */,
  tabBarBackgroundHover: "#E3E8EF" /* From Rows n Columns theme */,
  tabBarBackgroundActive: colors.white,
  tabBarBorder: "#e8eaed" /* From  Rows n Columns theme */,
  tabBarText: colors.black,
};

/**
 * Currently experimental only
 */
const themeDark = {
  text: colors.white2,
  textTitle: colors.white,

  background: colors.gray9,
  primaryBackground: colors.black4,

  buttonText: "#fff",
  buttonTextHover: "#000",
  buttonBorder: "#fff",
  buttonBackground: "rgba(255, 255, 255, 0)",
  buttonBackgroundHover: "rgba(255, 255, 255, 1)",
  link: "#abc1ff",

  inputBackground: colors.transparent,
  inputBorder: "hsl(0,0%,90%)",

  logoColor: colors.white2,

  sidebarBackground: colors.black4,
  sidebarText: colors.white2,
  sidebarTextActive: colors.white,
  sidebarTextHover: colors.white,
  sidebarHoverBackground: "hsl(0,0%,25%)",
  sidebarHoverBackgroundActive: colors.black4,

  cardBackground: "hsl(0,0%,16%)",
  cardText: colors.white,
  cardBorder: colors.black,
  cardBorderHover: colors.black4,
  cardHeader: colors.white2,
  cardText2: "hsl(0,0%,92%)",

  topNavBackground: "hsl(0,0%,17%)",

  toolContentBackground: "hsl(0,0%,16%)",
  toolbarRowBackground: "hsl(0,0%,16%)",
};

const themeFormat = {
  colors,
  ...themeLight,
};

export type Theme = typeof themeFormat;

// Provide typing for inline functions in styled components
// declare module "emotion-theming" {
//   interface DefaultTheme {
//     colors: typeof colors;
//     theme: typeof themeLight;
//   }
// }

export default function ThemeProviderExport({ children, isDark }) {
  const theme = {
    colors,
    ...(isDark ? themeDark : themeLight),
  };
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
