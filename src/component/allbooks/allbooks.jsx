import React, { useState, useEffect } from "react";
import "./allbooks.css";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";

const AllBooks = ({ setBooksData }) => {
  const [Filter, setfilter] = useState();
  const Filtration = (value) => {
    setfilter(value);
  };
  function Filterator(ele) {
    console.log(ele);
  }
  const [category, setcategory] = useState([]);
  const [allBook, setallBook] = useState([]);

  const [loadingg, setloading] = useState(false);
  async function getData() {
    const req = await axios.get("http://localhost:4000/book/AllBook");
    const res = await req.data.data.allBooks;
    console.log(res);
    setloading(true);
    setloading(false);
    setallBook(res);
    // setBooksData(res);
  }

  useEffect(() => {
    getData();
  }, []);

  // Category

  useEffect(() => {
    fetch("http://localhost:4000/category")
      .then((req) => req.json())
      .then((res) => console.log(setcategory(res.data.allCategories)));
    //
  }, []);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [categories, setCategories] = useState([]);
  const [allBooks, setAllBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch all categories
    axios
      .get("http://localhost:4000/category")
      .then((response) => {
        setCategories(response.data.data.allCategories);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  useEffect(() => {
    // Fetch books based on selected category
    setLoading(true);
    let url =
      selectedCategory === "All"
        ? "http://localhost:4000/book/AllBook"
        : `http://localhost:4000/book/getAllBookInCategory/${selectedCategory}`;
    axios
      .get(url)
      .then((response) => {
        console.log("Books response:", response.data); // Log the response from the API
        let booksData =
          selectedCategory === "All"
            ? response.data.data.allBooks
            : response.data.data.allCategoryProducts;
        setAllBooks(booksData || []); // Update allBooks state with fetched data
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching books:", error);
        setLoading(false);
      });
  }, [selectedCategory]);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  return (
    <>
      <section className="module-small mt-5 ">
        <div className="container">
          <form className="row mx-auto mb-5">
            <div className="col-sm-6 mb-5 mt-5">
              {/* Category DropDownList Filter */}
              <div className="d-flex " style={{}}>
                <label
                  className="d-inline-block custom-filter me-5"
                  htmlFor="filter"
                >
                  Filter by category
                </label>
                <select
                  id="filter"
                  style={{ color: "#999999", width: "250px" }}
                  className="form-control"
                  value={selectedCategory}
                  onChange={handleCategoryChange}
                >
                  <option value="All" style={{ color: "#999999" }}>
                    All
                  </option>
                  {categories.map((category) => (
                    <option
                      style={{ color: "#999999" }}
                      key={category._id}
                      value={category._id}
                    >
                      {category.categoryName}
                    </option>
                  ))}
                </select>
              </div>

              {/* end Category DropDownList Filter */}
            </div>
            <div className="col-sm-4 mb-3"></div>
          </form>
        </div>
      </section>
      <section className="module-large mx-auto most-books">
        <div className="container books-all">
          {loading ? (
            <p>Loading...</p>
          ) : (
            allBooks.map((book, index) => (
              <motion.div
                className="book-all"
                key={book.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="shop-item-image">
                  <Link to={`./bookdetails/${book.id}`}>
                    <img src={book.bookImage.url} alt="book" />
                  </Link>
                  <div className="transparent-div">
                    <Link
                      className="detail-link"
                      to={`./bookdetails/${book.id}`}
                    >
                      View Details
                    </Link>
                    <div></div>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </section>
    </>
  );
};

export default AllBooks;
