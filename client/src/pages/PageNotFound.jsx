import React from "react";
import { Link } from "react-router-dom";
function PageNotFound() {
  return (
    <div className="grid place-items-center gap-y-3">
      <h1 className="text-5xl font-bold">4O4</h1>
      <p>Not found the page you are looking for</p>
      <Link className="text-sm underline hover:text-richblue-50" to={"/login"}>
        Return to Login / Dashboard
      </Link>
    </div>
  );
}

export default PageNotFound;
