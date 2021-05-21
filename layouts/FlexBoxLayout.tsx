import styled from "@emotion/styled";

type FlexCommonPositioning = "center" | "flex-start" | "flex-end";
type FlexCommonAlignement = FlexCommonPositioning | "stretch";

export type JustifyContent = FlexCommonPositioning | "space-around" | "space-between";

export type FlexBoxProps = {
  readonly direction?: "row" | "row-reverse" | "column" | "column-reverse";
  readonly wrap?: "wrap" | "wrap-reverse" | "nowrap";
  readonly justifyContent?: JustifyContent;
  readonly alignItems?: FlexCommonAlignement | "baseline";
  readonly alignContent?: FlexCommonAlignement;
};

const FlexBoxLayout = styled.div<FlexBoxProps>`
  display: flex;
  flex-direction: ${props => props.direction || "row"};
  flex-wrap: ${props => props.wrap};
  justify-content: ${props => props.justifyContent};
  align-items: ${props => props.alignItems};
  align-content: ${props => props.alignContent};
`;

export default FlexBoxLayout;
