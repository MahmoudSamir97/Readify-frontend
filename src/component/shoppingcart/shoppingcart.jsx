import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./shoppingcart.css";
import images from "../../assets/images";
import Books from "../db";
import { Link } from "react-router-dom";

const ShoppingCart = ({ onIncrement, onDecrement, onDelete }) => {
  const [cartBook, setCartBook] = useState([]);
  const [total, setTotal] = useState();

  useEffect(() => {
    const cartBooks = Books.filter((element) => element.isInCart === true);
    setCartBook(cartBooks);
  }, [cartBook]);

  useEffect(() => {
    let subtotal = 0;
    for (let i = 0; i < cartBook.length; i++) {
      subtotal += cartBook[i].price * cartBook[i].count;
    }
    setTotal(subtotal);
  }, [cartBook]);

  return (
    <>
      <div className="container mt-5 p-3  cart">
        <div className="row no-gutters">
          <div className="col-md-8">
            <div className="product-details mb-3">
              <h2>
                Shopping<b> Cart {`(${cartBook.length})`}</b>
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
                        {cartBook.map((book) => (
                          <motion.tr
                            key={book.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="table-row"
                          >
                            <td className="align-middle d-flex bookImage">
                              <img
                                className="rounded"
                                src={images[book.id]}
                                width={40}
                                alt=""
                              />
                              <div className="p-2">
                                <span className="d-block bookname">
                                  {book.name}
                                </span>
                              </div>
                            </td>
                            <td className="align-middle">{book.price}</td>
                            <td className="align-middle">
                              <i
                                className="fas fa-trash mx-4 delete"
                                onClick={() => onDelete(book)}
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
            <div className="card-body">
              <div className="d-flex justify-content-between pt-1">
                <h6>Subtotal</h6>
                <h6>{total}$</h6>
              </div>
              <div className="d-flex justify-content-between">
                <h6>Shipping</h6>
                <h6>10$</h6>
              </div>
            </div>
            <div className="card-footer border-secondary bg-transparent">
              <div className="d-flex justify-content-between">
                <h6>Total</h6>
                <h6>{total + 10}$</h6>
              </div>
              <Link to="/payments">
                <button className="btn btn-block btn-warning custom-btn">
                  Proceed To Checkout
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShoppingCart;
