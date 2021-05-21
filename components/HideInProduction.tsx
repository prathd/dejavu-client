import React from "react";

// This higher order component does not render child elements in
// production (only show up in local / staging environments).
const HideInProduction = ({ children }) => {
  if (process.env.IS_PRODUCTION) return <></>;

  return <>{children}</>;
};

export default HideInProduction;
