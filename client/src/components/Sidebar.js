import React, { useContext } from "react";
import { SidebarLink, SidebarTop, SidebarBottom, SidebarLabel } from "./";

import EZAVLogo from "../img/ezav_logo.png";
import EZAVLogoWhite from "../img/ezav_logo_white.png"
import AppContext from "../AppContext";

const Sidebar = () => {
  const { currentUser } = useContext(AppContext);
  const isAdmin =
    currentUser?.role === "admin" || currentUser?.role === "developer" || false;

  return (
    <>
      <div
        id="sideBar"
        className={`${isAdmin ? "bg-dark" : "presenter"} p-3 shadow`}
      >
        <div className="px-2 mx-4">
          <img src={isAdmin ? EZAVLogo : EZAVLogoWhite } alt="EZAV Logo" />
        </div>
        {isAdmin ? <hr style={{ borderColor: "#6c757d" }} /> : <hr style={{borderColor: "#fff"}} />}
        <ul className="nav nav-pills flex-column mb-auto">
          <SidebarLink isAdmin={isAdmin} link="/home" icon="home">
            Home
          </SidebarLink>

          {isAdmin ? (
            <>
              <SidebarLabel text="Programs" />
              <SidebarLink isAdmin={isAdmin} link="/programs" icon="calendar">
                All Programs
              </SidebarLink>
              <SidebarLink isAdmin={isAdmin} link="/new-program" icon="plus">
                Add New
              </SidebarLink>
              <SidebarLabel text="Presenters" />
              <SidebarLink
                isAdmin={isAdmin}
                link="/presenters"
                icon="chalkboard-teacher"
              >
                All Presenters
              </SidebarLink>
              <SidebarLink isAdmin={isAdmin} link="/new-presenter" icon="plus">
                Add New
              </SidebarLink>
            </>
          ) : null}

          <SidebarLabel text="Recordings" />
          <SidebarLink isAdmin={isAdmin} link="/recordings" icon="video">
            All Recordings
          </SidebarLink>

          {isAdmin ? null : (
            <SidebarLink isAdmin={isAdmin} link="/new-recording" icon="plus">
              Add New
            </SidebarLink>
          )}

          {isAdmin ? (
            <>
              <SidebarLabel text="Admins" />
              <SidebarLink isAdmin={isAdmin} link="/admins" icon="user">
                All Admins
              </SidebarLink>
              <SidebarLink isAdmin={isAdmin} link="/new-admin" icon="plus">
                Add New
              </SidebarLink>
            </>
          ) : (
            <>
              <SidebarLabel text="Help" />
              <SidebarLink isAdmin={isAdmin} link="/instructions" icon="info">
                Instructions
              </SidebarLink>
              <SidebarLink isAdmin={isAdmin} link="/faqs" icon="question">
                FAQs
              </SidebarLink>
              <SidebarLink isAdmin={isAdmin} link="/contact" icon="life-ring">
                Contact Support
              </SidebarLink>
            </>
          )}
        </ul>
      </div>
      <SidebarTop />
      <SidebarBottom />
    </>
  );
};

export default Sidebar;
