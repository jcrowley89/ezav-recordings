import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import AppContext from "./AppContext";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faHome,
  faVideo,
  faPlus,
  faInfo,
  faLifeRing,
  faQuestion,
  faUser,
  faAngleLeft,
  faAngleRight,
  faCircle,
  faSquare,
  faFlag,
  faCalendar,
  faTimes,
  faEdit,
  faEye,
  faChalkboardTeacher,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";

// import "bootstrap/dist/css/bootstrap.css";
import "./App.scss";

import {
  Login,
  PrivateRoute,
  Home,
  Programs,
  NewProgram,
  Presenters,
  NewPresenter,
  Recordings,
  NewRecording,
  Admins,
  NewAdmin,
  Program,
  EditProgram,
  Presenter,
  EditPresenter,
  Admin,
  Recording,
  Instructions,
  FAQs,
  Contact,
  Record,
} from "./components";

import { apiGet } from "./utils/api";

library.add(
  faHome,
  faVideo,
  faPlus,
  faInfo,
  faLifeRing,
  faQuestion,
  faUser,
  faAngleLeft,
  faAngleRight,
  faCircle,
  faSquare,
  faFlag,
  faCalendar,
  faTimes,
  faEdit,
  faEye,
  faChalkboardTeacher,
  faArrowRight
);

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState();
  const ctx = {
    isLoggedIn: isLoggedIn,
    setIsLoggedIn: setIsLoggedIn,
    currentUser: currentUser,
    setCurrentUser: setCurrentUser,
  };

  useEffect(
    () => setIsLoggedIn(localStorage.getItem("token") ? true : false),
    []
  );

  useEffect(() => {
    if (isLoggedIn && !currentUser) {
      apiGet("getCurrentUser").then((res) => {
        if (res.data && !res.data.user) {
          localStorage.removeItem("token");
          setIsLoggedIn(false);
        } else {
          setCurrentUser(res.data.user);
          setIsLoggedIn(true);
        }
      });
    }
  }, [currentUser, isLoggedIn]);

  return (
    <AppContext.Provider value={ctx}>
      <Switch>
        {!isLoggedIn ? (
          <Route path="/" component={Login} />
        ) : (
          <>
            <PrivateRoute exact path="/home" component={Home} />
            <PrivateRoute exact path="/programs" component={Programs} />
            <PrivateRoute exact path="/new-program" component={NewProgram} />
            <PrivateRoute exact path="/program/:id" component={Program} />
            <PrivateRoute
              exact
              path="/edit-program/:id"
              component={EditProgram}
            />
            <PrivateRoute exact path="/presenters" component={Presenters} />
            <PrivateRoute
              exact
              path="/new-presenter"
              component={NewPresenter}
            />
            <PrivateRoute exact path="/presenter/:id" component={Presenter} />
            <PrivateRoute
              exact
              path="/edit-presenter/:id"
              component={EditPresenter}
            />
            <PrivateRoute exact path="/recordings" component={Recordings} />
            <PrivateRoute
              exact
              path="/new-recording"
              component={NewRecording}
            />
            <PrivateRoute exact path="/recording/:id" component={Recording} />
            <PrivateRoute exact path="/record/:id" component={Record} />
            <PrivateRoute exact path="/admins" component={Admins} />
            <PrivateRoute exact path="/new-admin" component={NewAdmin} />
            <PrivateRoute exact path="/admin/:id" component={Admin} />
            <PrivateRoute exact path="/instructions" component={Instructions} />
            <PrivateRoute exact path="/faqs" component={FAQs} />
            <PrivateRoute exact path="/contact" component={Contact} />
          </>
        )}
      </Switch>
    </AppContext.Provider>
  );
}

export default App;
