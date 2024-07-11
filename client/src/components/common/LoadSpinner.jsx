import React from "react";
import "./loadSpinner.css";
const LoadSpinner = ({ className }) => {
  return (
    <div className={`${className} grid h-full w-full place-content-center`}>
      <div className={`h-fit w-fit`}>
        <h1 className="title">LOADING...</h1>
        <div className="rainbow-marker-loader"></div>
      </div>
    </div>
  );
};

export default LoadSpinner;
