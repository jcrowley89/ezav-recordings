import React from "react";

const PresenterView = ({ component: Component, ...rest }) => {
  return <Component {...rest} />;
};

export default PresenterView;
