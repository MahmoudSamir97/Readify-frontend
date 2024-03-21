import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSadTear } from "@fortawesome/free-solid-svg-icons";
import "./shoppingcart.css";
import images from "../../assets/images";
import Books from "../db";
import { Link } from "react-router-dom";
import PayButton from "../PayButton/PayButton";

const ShoppingCart = ({ onDelete }) => {
  const items = [
    {
      name: "Science fiction book",
      price: 2,
      image:
        "https://www.worldatlas.com/r/w960-q80/upload/3b/05/33/shutterstock-466404632.jpg",
    },
    {
      name: "Agatha kristy, horror",
      price: 4,
      image: "https://images4.penguinrandomhouse.com/cover/9780525565109",
    },
  ];
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

  // Check if the cart is empty
  const isCartEmpty = cartBook.length === 0;

  return (
    <>
      {isCartEmpty ? (
        <div className="text-center">
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
            <button className="btn btn-outline-secondary">
              Go To Shopping
            </button>
          </Link>
        </div>
      ) : (
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
              <div className="card-footer border-secondary bg-transparent">
                <div className="d-flex justify-content-between">
                  <h6>Total</h6>
                  <h6>{total}$</h6>
                </div>
                <PayButton cartItems={items}>Checkout</PayButton>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ShoppingCart;
