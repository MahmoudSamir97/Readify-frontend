import React, { useState } from 'react';
import './allbooks.css';
import { Link } from 'react-router-dom';
import images from '../../assets/images';
import { motion } from 'framer-motion';

const AllBooks = ({ books }) => {
    const [selectedBooks, setSelectedBooks] = useState(books);

    const BooksNameOptions = [
        {
            value: 'All Books',
            text: 'All Books',
        },
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
            value: 'Price',
            text: 'Price',
        },
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
        const selectedName = e.target.value;
        if (selectedName === 'All Books') {
            setSelectedBooks(books);
        } else {
            const selected = books.filter((book) => book.name === selectedName);
            setSelectedBooks(selected);
        }
    };

    const handleSelectPrice = (e) => {
        const selectedPrice = e.target.value;
        if (selectedPrice === 'Price') {
            setSelectedBooks(books);
        } else {
            const selectedWithPrice =
                selectedBooks.length > 0
                    ? selectedBooks.filter((book) => book.price <= selectedPrice)
                    : books.filter((book) => book.price <= selectedPrice);
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
                                {BooksNameOptions.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.text}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="col-sm-4 mb-3">
                            <select className="form-control" onChange={handleSelectPrice}>
                                {priceOptions.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.text}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="col-sm-4 mb-3">
                            <button className="btn btn-outline-secondary" type="button" onClick={handleReset}>
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
                                    
                                </Link>
                                <div className="transparent-div">
                                    <Link className="detail-link" to={`./bookdetails/${book.id}`}>View Details</Link>
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
