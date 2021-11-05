import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { List, Button } from "reactstrap";
import { Sidebar } from "./";
import AppContext from "../AppContext";

const Home = () => {
  const { currentUser } = useContext(AppContext);

  if (currentUser && currentUser.role !== "presenter") {
    return (
      <div id="Home">
        <Sidebar />
        <div className="main">
          <div className="p-5">
            <h1 style={{ fontWeight: "bold", fontSize: "4rem" }}>
              Welcome, {currentUser?.firstName}!
            </h1>
            <p className="lead">You are logged in as an administrator.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div id="Home">
      <Sidebar />
      <div className="main">
        <div className="p-5">
          <h1 style={{ fontWeight: "bold", fontSize: "4rem" }}>
            Welcome, {currentUser?.firstName}!
          </h1>
          <p className="lead">
            EZ Audio Visual makes recording and uploading your presentation fast
            and easy.
          </p>
          <List type="unstyled" className="h3 my-4 ml-4">
            <li className="mb-3">
              <FontAwesomeIcon
                icon="arrow-right"
                className="text-warning mr-2"
              />
              <Link to="/recordings">View All Recordings</Link>
            </li>
            <li className="mb-3">
              <FontAwesomeIcon
                icon="arrow-right"
                className="text-warning mr-2"
              />
              <Link to="/instructions">Read the Instructions</Link>
            </li>
            <li className="mb-3">
              <FontAwesomeIcon
                icon="arrow-right"
                className="text-warning mr-2"
              />
              <Link to="/faqs">Browse the FAQs</Link>
            </li>
          </List>
          <hr className="my-2" />
          <p>Ready to get started?</p>
          <p className="lead">
            <Button
              color="primary"
              tag={Link}
              to="/new-recording"
              className="rounded-pill"
            >
              <FontAwesomeIcon icon="plus" className="mr-2" />
              Start New Recording
            </Button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
