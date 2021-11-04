import React from "react";

const SidebarBottom = () => {
  return (
    <div id="sidebarBottom" className="bg-white d-flex justify-content-end">
      <small className="xs text-muted mr-5">
        Copyright &copy; 2021{" "}
        <a
          href="https://ezav.biz"
          className="link-secondary"
          target="_blank"
          rel="noreferrer"
        >
          EZ Audio Visual
        </a>
      </small>
    </div>
  );
};

export default SidebarBottom;
