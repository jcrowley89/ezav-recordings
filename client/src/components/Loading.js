import React from "react";
import { Spinner } from "reactstrap";

const Loading = () => {
  return (
    <div className="d-flex justify-content-center">
      <Spinner />
    </div>
  );
};

export default Loading;
