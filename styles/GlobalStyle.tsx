// this comment tells babel to convert jsx to calls to a function called jsx instead of React.createElement
/** @jsx jsx */
import { jsx, Global, css } from "@emotion/core";
import { useTheme } from "emotion-theming";

/**
 * Other global styles in pages/_document.tsx
 */

const globalStyles = theme => css`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  :root {
    font-size: 16px;
  }

  html,
  body,
  #__next {
    width: 100vw;
    height: 100vh;
    font-family: "Inter", Arial, sans-serif;
  }

  body {
    color: ${theme.text};
    background-color: ${theme.background};
    /* Fix for scrollbar disappearing when popup appears */
    overflow: visible !important;
  }

  /* Inter Font Faces */
  @font-face {
    font-family: "Inter";
    src: url("/fonts/Inter-Thin.ttf");
    font-weight: 100;
    font-style: normal;
  }

  @font-face {
    font-family: "Inter";
    src: url("/fonts/Inter-ExtraLight.ttf");
    font-weight: 200;
    font-style: normal;
  }

  @font-face {
    font-family: "Inter";
    src: url("/fontddds/Inter-Light.ttf");
    font-weight: 300;
    font-style: normal;
  }

  @font-face {
    font-family: "Inter";
    src: url("/fonts/Inter-Regular.ttf");
    font-weight: 400;
    font-style: normal;
  }

  @font-face {
    font-family: "Inter";
    src: url("/fonts/Inter-Medium.ttf");
    font-weight: 500;
    font-style: normal;
  }

  @font-face {
    font-family: "Inter";
    src: url("/fonts/Inter-SemiBold.ttf");
    font-weight: 600;
    font-style: normal;
  }
  @font-face {
    font-family: "Inter";
    src: url("/fonts/Inter-Bold.ttf");
    font-weight: 700;
    font-style: normal;
  }

  @font-face {
    font-family: "Inter";
    src: url("/fonts/Inter-ExtraBold.ttf");
    font-weight: 800;
    font-style: normal;
  }

  @font-face {
    font-family: "Inter";
    src: url("/fonts/Inter-Black.ttf");
    font-weight: 900;
    font-style: normal;
  }

  a {
    text-decoration: none;
  }

  input {
    background-color: ${theme.inputBackground};
    color: inherit;
    border: 1px solid ${theme.inputBorder};
    padding: 8px 13px;
  }

  button,
  input[type="submit"],
  input {
    outline: none;
    border-radius: 4px;
    transition: 0.3s all;
  }

  button,
  input[type="submit"] {
    background-color: ${theme.buttonBackground};
    color: ${theme.buttonText};
    border: none;
    padding: 8px 20px;
    cursor: pointer;

    &:focus {
      outline: none;
    }
  }

  button.btn,
  input[type="submit"].btn {
    background-color: #3460f3;
    color: white;
  }

  button.btn:disabled,
  input[type="submit"].btn:disabled {
    background-color: gray;
    color: white;
  }

  button.btn:hover {
    background-color: #1543de;
  }

  .btn-nostyle {
    padding: 0;
  }

  button.btn-secondary {
    background-color: #6c757d;
  }

  button.btn-success {
    background-color: #28a745;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin-bottom: 2rem;
  }

  h2 {
    font-size: 20px;
  }

  h3 {
    font-size: 16px;
  }

  /** Margin **/

  .no-margin {
    margin: 0;
  }

  .mb-1 {
    margin-bottom: 1rem;
  }

  .mb-1-5 {
    margin-bottom: 1.5rem;
  }

  .mb-2 {
    margin-bottom: 2rem;
  }

  .mb-3 {
    margin-bottom: 3rem;
  }

  .mb-4 {
    margin-bottom: 4rem;
  }

  .mt-1 {
    margin-top: 1rem;
  }

  .mt-2 {
    margin-top: 2rem;
  }

  .mt-3 {
    margin-top: 3rem;
  }

  .mt-4 {
    margin-top: 4rem;
  }

  .ml-1 {
    margin-left: 1rem;
  }

  .ml-1-5 {
    margin-left: 1.5rem;
  }

  .ml-2 {
    margin-left: 2rem;
  }

  .ml-3 {
    margin-left: 3rem;
  }

  .ml-4 {
    margin-left: 4rem;
  }

  /** Padding */

  .pt-0 {
    padding-top: 0;
  }

  .p-1 {
    padding: 1rem;
  }

  .pb-1 {
    padding-bottom: 1rem;
  }

  .pl-1 {
    padding-left: 1rem;
  }

  .pr-1 {
    padding-right: 1rem;
  }

  /** Layout */

  .flex {
    display: flex;
  }

  .absolute {
    position: absolute;
  }

  .w-full {
    width: 100%;
  }

  /** Text **/

  .color-light {
    color: hsl(0, 0%, 50%);
  }

  .color-light-2 {
    color: hsl(0, 0%, 60%);
  }

  .pointer {
    cursor: pointer;
  }
`;

const GlobalStyle = () => {
  const theme = useTheme();
  return <Global styles={globalStyles(theme)} />;
};

export default GlobalStyle;
