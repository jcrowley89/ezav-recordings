import React, { useContext } from "react";
import { Button } from "reactstrap";
import AppContext from "../AppContext";

const SidebarTop = () => {
  const { setIsLoggedIn, currentUser, setCurrentUser } = useContext(AppContext);

  function handleLogout() {
    localStorage.removeItem("token");
    setCurrentUser(null);
  }

  return (
    <div
      id="sidebarTop"
      className={
        currentUser && currentUser.role === "presenter"
          ? "bg-dark d-flex justify-content-end align-items-center shadow-sm bg-body w-100"
          : "bg-primary d-flex justify-content-end align-items-center shadow-sm bg-body w-100"
      }
    >
      <p className="m-0 text-light">
        {currentUser?.firstName} {currentUser?.lastName}
      </p>
      <Button
        outline={currentUser && currentUser.role === "presenter"}
        color="warning"
        size="sm"
        className="mx-4 my-2 px-4 rounded-pill"
        onClick={handleLogout}
      >
        Logout
      </Button>
    </div>
  );
};

export default SidebarTop;
