import React, { useContext, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import AppContext from "../AppContext";

function PrivateRoute({ component: Component, ...rest }) {
  const { isLoggedIn } = useContext(AppContext);

  if (isLoggedIn) return <Route {...rest} render={() => <Component />} />;

  return <Redirect to="/" />;
}

export default PrivateRoute;
