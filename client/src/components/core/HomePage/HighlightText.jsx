import React from "react";

function HighlightText({ text }) {
  return (
    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB]">
      {text}
    </span>
  );
}

export default HighlightText;
