import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSadTear } from "@fortawesome/free-solid-svg-icons";
import "./shoppingcart.css";
import images from "../../assets/images";
import { Link } from "react-router-dom";
import PayButton from "../PayButton/PayButton";
import axios from "axios";

const ShoppingCart = () => {
  const [loading, setloading] = useState(false);
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const calcTotal = (arr) => {
    const value = arr.reduce((accumulator, current) => {
      return accumulator + Number(current.bookPrice);
    }, 0);
    return value;
  };
  console.log(cart);

  const handleDelete = async (book) => {
    const token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const deletedBook = await axios.post(
      "http://localhost:4000/cartcpy/delete",
      { bookTitle: book.bookTitle },
      config
    );
    window.location.reload();
  };

  useEffect(() => {
    const getCartData = async () => {
      setloading(true);
      try {
        const token = localStorage.getItem("token");
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };
        const res = await axios.get(`http://localhost:4000/cartcpy`, config);
        const data = res.data.userCart.items;
        setTotalPrice(calcTotal(data));
        setCart(data);
        setloading(false);
      } catch (error) {
        console.error("Error fetching book details:", error);
        setloading(false);
      }
    };
    getCartData();
  }, []);
  return (
    <>
      {cart.length > 0 ? (
        <div className="container mt-5 p-3  cart">
          <div className="row no-gutters">
            <div className="col-md-8">
              <div className="product-details mb-3">
                <h2>
                  Shopping<b> Cart {`(${cart.length})`}</b>
                </h2>

                <div className="container">
                  <div className="row">
                    <div className="col-md-12 col-sm-4">
                      <motion.table
                        className="table text-center tablecart"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                      >
                        <thead className="text-dark">
                          <tr>
                            <th>Products</th>
                            <th>Price</th>
                            <th>Remove</th>
                          </tr>
                        </thead>
                        <tbody>
                          {cart.map((book, index) => (
                            <motion.tr
                              key={index}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.5 }}
                              className="table-row"
                            >
                              <td className="align-middle d-flex bookImage">
                                <img
                                  className="rounded"
                                  src={book.bookImage}
                                  width={40}
                                  alt=""
                                />
                                <div className="p-2">
                                  <span className="d-block bookname">
                                    {book.bookTitle}
                                  </span>
                                </div>
                              </td>
                              <td className="align-middle">
                                {book.bookPrice}$
                              </td>
                              <td className="align-middle">
                                <i
                                  className="fas fa-trash mx-4 delete"
                                  onClick={() => handleDelete(book)}
                                />
                              </td>
                            </motion.tr>
                          ))}
                        </tbody>
                      </motion.table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="card col-md-4 mx-auto">
              {" "}
              {/* Adjusted col-md-4 */}
              <div className="card-header">
                <h6 className="card-text">Cart Summary</h6>
              </div>
              <div className="card-footer border-secondary bg-transparent">
                <div className="d-flex justify-content-between">
                  <h6>Total</h6>
                  <h6>{totalPrice}$</h6>
                </div>
                {cart.length > 0 && (
                  <PayButton cartItems={cart}>Checkout</PayButton>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center p-5">
          <FontAwesomeIcon
            icon={faSadTear}
            size="4x"
            className="text-muted mb-3"
          />
          <p className="mb-3">You haven't added any books yet!</p>
          <p className="mb-3">
            Add some books to your Cart by browsing our collection.
          </p>
          <Link to="/allbooks">
            <button className="btn btn-outline-secondary mb-5">
              Go To Shopping
            </button>
          </Link>
        </div>
      )}
    </>
  );
};

export default ShoppingCart;
