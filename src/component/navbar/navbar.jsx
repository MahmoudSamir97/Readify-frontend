import React, { useState, useEffect, useRef } from "react";
import { NavLink, Link } from "react-router-dom";
import "./navbar.css";
import Books from "../db";
// import User from "../user/user";
import useSticky from "./useSticky";
import logo from "./../../assets/images/icons8-book-48.png";
// dropdown images
import userImg from "./../../assets/images/dropdown/user.png";
import edit from "./../../assets/images/dropdown/edit.png";
import settings from "./../../assets/images/dropdown/settings.png";
import help from "./../../assets/images/dropdown/question.png";
import logout from "./../../assets/images/dropdown/log-out.png";
import DropDown from "../DropDown/DropDown";
//

const Navbar = ({ user, setUser }) => {
  const [cartnum, setCartNum] = useState([]);
  const [wishcount, setWishCount] = useState();
  const { sticky, stickyRef } = useSticky();
  const [open, setOpen] = useState(false);

  let menuRef = useRef();

  useEffect(() => {
    let handler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

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
          <Link
            className="navbar-brand text-danger logo h1 align-self-center"
            to={"/"}
          >
            <img src={logo} alt="logo" className="logo" />
            <span className="animated-title text-black">Readify</span>
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
                    <li className="nav-item mx-lg-4">
                      <Link className="nav-link" to={"/login"}>
                        Login
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </div>

            <div className="d-flex">
              <NavLink
                className="nav-icon position-relative mt-2 text-decoration-none ms-3"
                to={"./shoppingcart"}
              >
                <i className="fa fa-fw fa-cart-arrow-down text-dark" />
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-light text-dark">
                  {cartnum.length}
                </span>
              </NavLink>
              <NavLink
                className={`${
                  wishcount > 0 ? "nav-link " : "nav-link "
                } wishlink`}
                to={"/wishlist"}
              >
                <i
                  className={
                    wishcount > 0 ? "fas fa-heart text-danger" : "far fa-heart"
                  }
                ></i>
              </NavLink>
              {/* drop down here */}
              <div className="menu-container" ref={menuRef}>
                <div
                  className="menu-trigger"
                  onClick={() => {
                    setOpen(!open);
                  }}
                >
                  <img src={userImg} alt="user" />
                </div>

                <div
                  className={`dropdown-menu ${open ? "active" : "inactive"}`}
                >
                  <h3 className="dropdown-title">Mahmoudsamir</h3>
                  <ul className="dropdown-list">
                    <DropDown
                      img={edit}
                      text={"Edit Profile"}
                      link={"/edit-profile"}
                    />
                    <DropDown
                      img={settings}
                      text={"Password"}
                      link={"/change-password"}
                    />
                    <DropDown img={help} text={"Helps"} link={"/helps"} />
                    <DropDown img={logout} text={"Logout"} link={"/login"} />
                  </ul>
                </div>
              </div>
              {/* drop down here */}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
