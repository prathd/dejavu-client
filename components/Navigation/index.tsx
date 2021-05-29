import React from "react";
import * as S from "../styled";

export const NavigationBar = props => {
  const children = React.Children.toArray(props.children);

  return (
    <S.NavigationBar>
      {children.map(element => (
        <li key={element.props.name}>{element}</li>
      ))}
    </S.NavigationBar>
  );
};
