import React from "react";
import PropTypes from "prop-types";
import GlobalStyle from "@app/styles/GlobalStyle";
import * as S from "./styled";

interface NavigationHOCProps {
  children: React.ReactNode;
}

const NavigationHOC = ({ children }: NavigationHOCProps) => {
  return (
    <>
      <GlobalStyle />
      <S.Children>{children}</S.Children>
    </>
  );
};

NavigationHOC.propTypes = {
  children: PropTypes.node.isRequired,
};

export default NavigationHOC;
