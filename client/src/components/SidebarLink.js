import React from "react";
import { NavLink } from "react-router-dom";
import { Row, Col } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SidebarLink = ({ link, icon, isAdmin, children }) => {
  return (
    <li className="nav-item">
      <NavLink
        to={link}
        className={`nav-link link-secondary text-white`}
        activeClassName="nav-link link-secondary active rounded-pill text-dark"
      >
        <Row>
          <Col
            xs="1"
            className="d-flex justify-content-center align-items-center"
          >
            <FontAwesomeIcon icon={icon} className="mx-2" />
          </Col>
          <Col>{children}</Col>
        </Row>
      </NavLink>
    </li>
  );
};

export default SidebarLink;
