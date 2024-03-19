import React, { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import "./navbar.css";
import Books from "../db";
import User from "../user/user";
import useSticky from "./useSticky";
import logo from "./../../assets/images/icons8-book-48.png";
import chatlogo from "./../../assets/images/chat-logo.png";

const Navbar = ({ user, setUser }) => {
  const [cartnum, setCartNum] = useState([]);
  const [wishcount, setWishCount] = useState();

  const { sticky, stickyRef } = useSticky();

  useEffect(() => {
    const cartBooks = Books.filter((element) => element.isInCart === true);
    const wishlistBooks = Books.filter((element) => element.wishlist === true);
    setCartNum(cartBooks);
    setWishCount(wishlistBooks.length);
  }, [cartnum]);

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
        <div className="container d-flex justify-content-between align-items-center">
<<<<<<< HEAD
          <Link className="navbar-brand text-danger logo h1 align-self-center" to={"/"}>
          
            <img src="https://i.pinimg.com/564x/b2/40/1e/b2401ef6d1079b6a902d6be6acf85c0e.jpg" alt="Readify Logo" className="logo-image" style={{ maxWidth: "40px" }} />
            <span className="animated-title">  Readify </span>
=======
          <Link
            className="navbar-brand text-danger logo h1 align-self-center"
            to={"/"}
          >
            <img src={logo} alt="logo" className="logo" />
            <span className="animated-title text-black">Readify</span>
>>>>>>> 4d8ea339b659d78dd1ca83cb19704771d0c5397e
          </Link>

          <div
            className="navbar-toggler custom-toggler"
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
              <ul className="nav navbar-nav d-lg-inline-flex  mx-lg-5">
                {user === "admin" ? (
                  <li className="nav-item mx-lg-4">
                    <Link className="nav-link" to={"/admin"}>
                      Admin page
                    </Link>
                  </li>
                ) : (
                  <>
                    <li className="nav-item mx-lg-4">
<<<<<<< HEAD
                      <Link className="nav-link" aria-current="page" to={"/"}>Home</Link>
                    </li>


                    <li className="nav-item mx-lg-4">
                      <Link className="nav-link" to={"/allbooks"}>All Books</Link>
                    </li>
                    <li className="nav-item mx-lg-4">
                      <Link className="nav-link" to={"/contact"}>contact</Link>
                    </li>


=======
                      <Link className="nav-link" aria-current="page" to={"/"}>
                        Home
                      </Link>
                    </li>

>>>>>>> 4d8ea339b659d78dd1ca83cb19704771d0c5397e
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
                    <li className="nav-item mx-lg-4">
                      <Link
                        className={wishcount > 0 ? "nav-link" : "nav-link"}
                        to={"/wishlist"}
                      >
                        {" "}
                        <i
                          className={
                            wishcount > 0
                              ? "fas fa-heart text-danger"
                              : "far fa-heart"
                          }
                        ></i>
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </div>

            <div className="d-flex">
              <NavLink
                className="nav-icon position-relative text-decoration-none me-3"
                to={"./shoppingcart"}
              >
                <i className="fa fa-fw fa-cart-arrow-down text-dark" />
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-light text-dark">
                  {cartnum.length}
                </span>
              </NavLink>

              <div className="dropdown">
                <button
                  className="btn dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img src="/path_to_dropdown_icon" alt="Dropdown" />
                </button>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton"
                >
                  <li>
                    <a className="dropdown-item" href="#">
                      Settings
                    </a>
                  </li>
                  <Link to="./profile">
                    "{" "}
                    <li>
                      <a className="dropdown-item" href="#">
                        Profile
                      </a>
                    </li>{" "}
                  </Link>
                  <li>
                    <a className="dropdown-item" href="#">
                      Logout
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                {user ? (
                  <User user={user} setUser={setUser} />
                ) : (
                  <NavLink
                    className="nav-icon position-relative text-decoration-none"
                    to={"./signin"}
                  >
                    <i className="fa fa-fw fa-user text-dark" />
                  </NavLink>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
