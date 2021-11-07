import React, { useContext, useEffect, useState } from "react";
import { Route, Redirect } from "react-router-dom";
import AppContext from "../AppContext";
import { apiGet } from "../utils/api";

function PrivateRoute({ component: Component, ...rest }) {
  const { currentUser, setCurrentUser } = useContext(AppContext);

  if (localStorage.getItem("token") === null) return <Redirect to="/" />

  return <Route {...rest} render={() => <Component />} />;
}

export default PrivateRoute;
