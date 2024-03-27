import React, { useEffect, useRef, useContext } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import "./navbar.css";
import useSticky from "./useSticky";
import logo from "./../../assets/images/icons8-book-48.png";

const Navbar = () => {
  const { sticky, stickyRef } = useSticky();
  const token = localStorage.getItem("token");
  let navigate = useNavigate();
  //

  const handleLogOut = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  //
  return (
    <>
      <nav
        ref={stickyRef}
        className={
          sticky
            ? "sticky navbar navbar-expand-lg  navbar-light shadow"
            : "navbar navbar-expand-lg  navbar-light shadow"
        }
      >
        <div className="container-fluid w-100 d-flex justify-content-between align-items-center">
          <Link
            className="navbar-brand text-danger logo h1 align-self-center"
            to={"/"}
          >
            <img src={logo} alt="logo" className="logo" />
            <span className="animated-title text-black">Readify</span>
          </Link>

          <div
            className="navbar-toggler custom-toggler "
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className="fas fa-bars-staggered"></i>
          </div>

          <div
            className="align-self-center collapse navbar-collapse flex-fill  d-lg-flex justify-content-lg-between"
            id="navbarNav"
          >
            <div className="flex-fill">
              <ul className="nav navbar-nav d-lg-inline-flex custom-ul  mx-lg-5">
                <li className="nav-item mx-lg-4">
                  <Link className="nav-link" aria-current="page" to={"/"}>
                    Home
                  </Link>
                </li>

                <li className="nav-item mx-lg-4">
                  <Link className="nav-link" to={"/allbooks"}>
                    Books
                  </Link>
                </li>
                <li className="nav-item mx-lg-4">
                  <Link className="nav-link" to={"/contact"}>
                    Contact
                  </Link>
                </li>

                <li className="nav-item mx-lg-4">
                  <Link className="nav-link" to={"/aboutus"}>
                    About us
                  </Link>
                </li>
                {token ? null : (
                  <li className="nav-item mx-lg-4">
                    <Link className="nav-link" to={"/login"}>
                      Login
                    </Link>
                  </li>
                )}
              </ul>
            </div>
            {token ? (
              <div className="d-flex">
                <NavLink
                  className="nav-icon position-relative mt-2 text-decoration-none me-2  "
                  to={"./shoppingcart"}
                >
                  <i className="fa fa-fw fa-cart-arrow-down text-dark" />
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-light text-dark"></span>
                </NavLink>

                <NavLink
                  className="nav-icon position-relative mt-2 text-decoration-none ms-3 "
                  to={"/wishlist"}
                >
                  <i className="fas fa-heart text-danger"></i>
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-light text-dark"></span>
                </NavLink>

                <div className="dropdown ">
                  <button
                    className="btn dropdown-toggle ms-2"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Profile
                    <i className="fa-regular fa-user d-inline-block ms-2"></i>
                  </button>
                  <ul className="dropdown-menu custom-ul">
                    <li>
                      <Link className="dropdown-item" to={"/edit-profile"}>
                        Setting
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to={"/change-password"}>
                        Change password
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="dropdown-item"
                        to={"/login"}
                        onClick={handleLogOut}
                      >
                        Logout
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
