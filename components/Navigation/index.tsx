import React from "react";
import * as S from "../styled";

export const NavigationBar = ({ children }) => {
  const navigationBarElements = React.Children.toArray(children);

  return (
    <S.NavigationBar>
      {navigationBarElements.map(element => (
        <li key={element.props.name !== undefined ? element.props.name : element.props.href}>
          {element}
        </li>
      ))}
    </S.NavigationBar>
  );
};
