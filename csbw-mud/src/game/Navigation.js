import React from "react";

const Navigation = props => {
  return (
    <div className="main-wrapper-app">
      <h2>Navigation</h2>
      <button onClick={e => props.move(e, "n")}>Move North</button>
      <button onClick={e => props.move(e, "s")}>Move South</button>
      <button onClick={e => props.move(e, "e")}>Move East</button>
      <button onClick={e => props.move(e, "w")}>Move West</button>
    </div>
  );
};

export default Navigation;
