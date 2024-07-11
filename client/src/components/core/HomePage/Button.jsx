import React from "react";
import { Link } from "react-router-dom";

function Button({ className, children, active, linkTo, bold }) {
  return (
    <Link
      to={linkTo}
      // ><div
      className={`${className} my-3 inline-flex items-center justify-center gap-2 truncate rounded-lg px-6 py-3 shadow-ctaButtonShadow transition-[transform_box-shadow] hover:scale-95 hover:shadow-transparent ${
        bold ? "font-bold" : ""
      } ${
        active
          ? "bg-yellow-50 text-richBlack-900"
          : "bg-richBlack-800 text-richBlack-5"
      }`}
    >
      {children}
      {/* </div> */}
    </Link>
  );
}

export default Button;
