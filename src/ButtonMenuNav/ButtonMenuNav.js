import React from "react";
import "./buttonMenuNav.css";

function MenuButton(props) {
  function handleClick() {
    props.select(props.name);
  }

  return (
    <button
      onClick={handleClick}
      className={`menuButton${props.active === props.name ? " active" : ""}`}
    >
      {props.children}
    </button>
  );
}

export default MenuButton;
