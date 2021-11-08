import React from "react";
import { Route, Redirect } from "react-router-dom";

function PrivateRoute({ component: Component, ...rest }) {
  if (localStorage.getItem("token") === null) return <Redirect to="/" />

  return <Route {...rest} render={() => <Component />} />;
}

export default PrivateRoute;
