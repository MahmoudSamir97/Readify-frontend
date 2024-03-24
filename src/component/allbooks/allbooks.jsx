import React, { useState } from "react";
import "./allbooks.css";
import { Link } from "react-router-dom";

import { motion } from "framer-motion";
import { useEffect } from "react";

import axios from "axios";
//import { concat } from "joi-browser";

const AllBooks = () => {
  const [Filter, setfilter] = useState();
  const Filtration = (value) => {
    setfilter(value);
  };
  function Filterator(ele) {
    console.log(ele);
  }
  const [category, setcategory] = useState([]);
  const [allBook, setallBook] = useState([]);

  const [loading, setloading] = useState(false);

  useEffect(async () => {
    setloading(true);
    const req = await axios.get("http://localhost:4000/book/AllBook");
    const res = await req.data.data.allBooks;
    setloading(false);
    setallBook(res);
  }, []);

  // Category

  useEffect(() => {
    fetch("http://localhost:4000/category")
      .then((req) => req.json())
      .then((res) => console.log(setcategory(res.data.allCategories)));
    //
    //
  }, []);

  return (
    <>
      <section className="module-small mt-5 most-books">
        <div className="container">
          <form className="row mx-auto">
            <div className="col-sm-4 mb-3">
              {/* Category DropDownList Filter */}
              <select
                className="form-control"
                onChange={(e) => Filterator(e.target.value)}
              >
                <option value="All"> All</option>
                {category.map((option) => (
                  <option key={option._id} value={option.categoryName}>
                    {option.categoryName}
                  </option>
                ))}
              </select>
              {/* Category DropDownList  Filter*/}
            </div>
            <div className="col-sm-4 mb-3"></div>
            <div className="col-sm-4 mb-3">
              <button className="btn btn-outline-secondary" type="button">
                Reset
              </button>
            </div>
          </form>
        </div>
      </section>
      <section className="module-large mx-auto most-books">
        <div className="container books">
          {allBook.map((book, index) => (
            <motion.div
              className="book"
              key={book.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="shop-item-image">
                <Link to={`./bookdetails/${book.id}`}>
                  <img src={book.bookImage.url} alt="Image" />
                </Link>
                {book.bookTitle}
                <div className="transparent-div">
                  <Link className="detail-link" to={`./bookdetails/${book.id}`}>
                    View Details
                  </Link>
                  <div></div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
};

export default AllBooks;
