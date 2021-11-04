import React from "react";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Sidebar } from "./";

const MainContent = ({ heading, button, btnLink, children }) => {
  return (
    <div>
      <Sidebar />
      <div className="main">
        <div className="p-5">
          <h1>
            {heading}
            {button ? (
              <Button color="primary" size="sm" tag={Link} to={btnLink} className="ml-3 rounded-pill">
                <FontAwesomeIcon icon="plus" className="mr-2" />Add New
              </Button>
            ) : null}
          </h1>
          <hr />
          {children}
        </div>
      </div>
    </div>
  );
};

export default MainContent;
