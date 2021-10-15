import React from "react";
var Spinner = require("react-spinkit");

function Loading() {
  return (
    <div id="loading-div">
      <Spinner name="circle" />
    </div>
  );
}

export default Loading;
