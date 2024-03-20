import React, { useState, useEffect } from "react";
import { NavLink, Link } from 'react-router-dom';
import './navbar.css';
import Books from "../db";
import User from "../user/user";
import useSticky from "./useSticky";

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
      <nav ref={stickyRef} className={sticky ? "sticky navbar navbar-expand-lg  navbar-light shadow" :  "navbar navbar-expand-lg  navbar-light shadow"}>
        <div className="container d-flex justify-content-between align-items-center">
          <Link className="navbar-brand text-danger logo h1 align-self-center" to={"/"}>
          
            <img src="https://github.com/TarekZsc97/Readify-frontend/blob/main/src/assets/images/icons8-book-48.png?raw=true" alt="Readify Logo" className="logo-image" style={{ maxWidth: "40px" }} />
            <span className="animated-title">  Readify </span>
          </Link>

          <div className="navbar-toggler custom-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <i className="fas fa-bars-staggered"></i>
          </div>

          <div className="align-self-center collapse navbar-collapse flex-fill  d-lg-flex justify-content-lg-between" id="navbarNav">
            <div className="flex-fill">
              <ul className="nav navbar-nav d-lg-inline-flex  mx-lg-5">
                {user === "admin" ?
                  <li className="nav-item mx-lg-4">
                    <Link className="nav-link" to={"/admin"}>Admin page</Link>
                  </li>
                  :
                  <>
                    <li className="nav-item mx-lg-4">
                      <Link className="nav-link" aria-current="page" to={"/"}>Home</Link>
                    </li>


                    <li className="nav-item mx-lg-4">
                      <Link className="nav-link" to={"/allbooks"}> Books</Link>
                    </li>
                    <li className="nav-item mx-lg-4">
                      <Link className="nav-link" to={"/contact"}>contact</Link>
                    </li>


                    <li className="nav-item mx-lg-4">
                      <Link className="nav-link" to={"/aboutus"}>About us</Link>
                    </li>
                    <li className="nav-item mx-lg-4">
                      <Link className={wishcount > 0 ? "nav-link" : "nav-link"} to={"/wishlist"}> <i className={wishcount > 0 ? "fas fa-heart text-danger" : "far fa-heart"}   ></i></Link>
                    </li>
                  </>
                }
              </ul>
            </div>

            <div className="d-flex">
              <NavLink className="nav-icon position-relative text-decoration-none me-3" to={'./shoppingcart'}>
                <i className="fa fa-fw fa-cart-arrow-down text-dark" />
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-light text-dark">{cartnum.length}</span>
              </NavLink>

              <div className="dropdown">
                <button className="btn dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                Edit Info
                </button>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                 <Link to="./setting"> <li><a className="dropdown-item" href="#">Settings</a></li> </Link>
                  <Link to="./profile"> <li><a className="dropdown-item" href="#">Profile</a></li> </Link>
                   <Link to="./"> <li><a className="dropdown-item" href="#">Logout</a></li> </Link>
                </ul>
              </div>

              <div>
                {user ?
                  <User user={user} setUser={setUser} />
                  :
                  <NavLink className="nav-icon position-relative text-decoration-none" to={'./signin'}>
                    <i className="fa fa-fw fa-user text-dark" />
                  </NavLink>
                }
              </div>
            </div>
          </div>
        </div >
      </nav >
    </>
  );
}

export default Navbar;
