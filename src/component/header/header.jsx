import React from "react";
import "./header.css";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <div className="hero-img">
      <div class="hero-text text-center">
        <h1 class="hero-title mb-4">
          Readify <span style={{ color: "#dc3545" }}>E-Book</span>{" "}
        </h1>
        <p className="hero-paragraph mb-4">
          {" "}
          "A reader lives a thousand lives before he dies"
        </p>
        <Link className="btn btn-danger text-decoration-none" to={"/allbooks"}>
          See Books
        </Link>
      </div>
    </div>
  );
};

export default Header;
