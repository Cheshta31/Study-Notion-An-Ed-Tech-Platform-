import React from "react";
export default function BtnYellow({ type, onClick, className, text, icon }) {
  return (
    <button
      onClick={onClick}
      className={`${className} flex items-center justify-center gap-2 rounded-lg bg-yellow-50 px-2 py-2 font-semibold text-black sm:px-5`}
      type={type}
    >
      {icon ? icon : ""}
      {`${text}`}
    </button>
  );
}
