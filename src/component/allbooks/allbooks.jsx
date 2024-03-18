import React, { useState } from 'react';
import './allbooks.css';
import { Link } from 'react-router-dom';
import images from './../../images';
import { motion } from 'framer-motion';

const AllBooks = ({ books }) => {
    const [selectedBooks, setSelectedBooks] = useState(books);

    const BooksNameOptions = [
        {
            value: 'Economy',
            text: 'Economy',
        },
        {
            value: 'Politics',
            text: 'Politics',
        },
        {
            value: 'Religion',
            text: 'Religion',
        },
        {
            value: 'Novel',
            text: 'Novel',
        },
        {
            value: 'Tech',
            text: 'Tech',
        },
    ];

    const priceOptions = [
        {
            value: 5,
            text: '0 - 5$',
        },
        {
            value: 10,
            text: '5$ - 10$',
        },
        {
            value: 20,
            text: '10$ - 20$',
        },
    ];

    const handleSelectName = (e) => {
        if (e.target.value === 'All Books') {
            setSelectedBooks(books);
        } else {
            const selected = books.filter((book) => book.name === e.target.value);
            setSelectedBooks(selected);
        }
    };

    const handleSelectPrice = (e) => {
        if (e.target.value === 'Price') {
            setSelectedBooks(books);
        } else {
            const selectedWithPrice =
                selectedBooks.length > 0
                    ? selectedBooks.filter((book) => book.price <= e.target.value)
                    : books.filter((book) => book.price <= e.target.value);
            setSelectedBooks(selectedWithPrice);
        }
    };

    const handleReset = () => {
        setSelectedBooks(books);
    };

    return (
        <>
            <section className="module-small mt-5 most-books">
                <div className="container">
                    <form className="row mx-auto">
                        <div className="col-sm-4 mb-3">
                            <select className="form-control" onChange={handleSelectName}>
                                <option>All Books</option>
                                {BooksNameOptions.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.text}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="col-sm-4 mb-3">
                            <select className="form-control" onChange={handleSelectPrice}>
                                <option>Price</option>
                                {priceOptions.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.text}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="col-sm-4 mb-3">
                            <button className="btn btn-danger btn-round btn-g" type="submit" onClick={handleReset}>
                                Reset
                            </button>
                        </div>
                    </form>
                </div>
            </section>
            <section className="module-large mx-auto most-books">
                <div className="container books">
                    {selectedBooks.map((book, index) => (
                        <motion.div
                            className="book"
                            key={book.id}
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <div className="shop-item-image">
                                <Link to={`./bookdetails/${book.id}`}>
                                    <img src={images[book.id]} alt="book" loading="lazy" />
                                    <i className="fas fa-cart-shopping cart-icon"></i>
                                </Link>
                            </div>
                            <div className="thumb-content">
                                <h5>{book.name}</h5>
                                <div className="item-price">
                                    <strike>{book.oldPrice}$</strike> <span>{book.price}$</span>
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
