import React from "react";

const AdminView = ({ component: Component, ...rest }) => {
  return <Component {...rest} />;
};

export default AdminView;
