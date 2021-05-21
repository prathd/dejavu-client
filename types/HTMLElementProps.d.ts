import React from "react";

type HTMLElementProps<
  Element extends keyof JSX.IntrinsicElements
> = JSX.IntrinsicElements[Element] extends React.DetailedHTMLProps<infer Props, any>
  ? Props
  : never;

export default HTMLElementProps;
