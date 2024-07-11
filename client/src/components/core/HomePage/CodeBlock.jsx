import React from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { TypeAnimation } from "react-type-animation";
const codeblock = `<!DOCTYPE html>
<html>
<head>
<title>Document</title>
<link rel="stylesheet" href="styles.css">
</head>
<body>
<nav><a href="/home">Home</a>
<a href="/about">About</a>
</nav> 
</body>
</html>`;

function CodeBlock() {
  return (
    <div className="relative z-0 mx-auto flex gap-2 rounded-sm bg-CodeBlockGradient p-2 font-mono text-sm font-bold leading-[22px] text-richBlack-5 backdrop-filter">
      {/* <!-- the HTML you want to display on the page--> */}
      <div className="flex flex-col text-end text-richBlack-400">
        <span>1</span>
        <span>2</span>
        <span>3</span>
        <span>4</span>
        <span>5</span>
        <span>6</span>
        <span>7</span>
        <span>8</span>
        <span>9</span>
        <span>10</span>
        <span>11</span>
      </div>
      <div className="text-richBlack-50">
        <code>
          <TypeAnimation
            className="first-line:text-brown-100"
            sequence={[codeblock, 2000, ""]}
            repeat={Infinity}
            cursor={true}
            style={{ whiteSpace: "pre-line", display: "inline-block" }}
            omitDeletionAnimation={true}
          />
        </code>
      </div>
      {/* background ellipse */}

      <div
        className="absolute -left-20 -top-20 -z-10 h-[20rem] max-w-[30rem] 
bg-[radial-gradient(ellipse,#FFA50099_40%,#00000000_74%)] opacity-20"
      ></div>
    </div>
  );
}

export default CodeBlock;
