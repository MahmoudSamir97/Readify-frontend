import React from "react";
import { Link } from "react-router-dom";

function DropDown(props) {
  const handleLogoutClick = () => {
    localStorage.removeItem("token");
  };
  return (
    <li className="dropdownItem">
      <img src={props.img} alt="drop down img"></img>
      {props.text === "Logout" ? (
        <Link
          className="text-decoration-none"
          to={props.link}
          onClick={handleLogoutClick}
        >
          {props.text}
        </Link>
      ) : (
        <Link className="text-decoration-none" to={props.link}>
          {props.text}
        </Link>
      )}
    </li>
  );
}

export default DropDown;
