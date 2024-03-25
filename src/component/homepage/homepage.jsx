import React from "react";
import NewBooks from "../newbooks/newbooks";
import BooksView from "../booksview/booksview";
import Header from "./../header/header";
import "./home.css";

const HomePage = ({ books }) => {
  return (
    <>
      <a
        href="https://mern-chat-frontend-tg3h.onrender.com"
        className="floating-message text-decoration-none text-danger"
        target="_blank"
        rel="noopener noreferrer"
      >
        Join our chat
        <i
          className="fas fa-comment-dots d-inline-block ms-2"
          style={{ color: "#e01f59" }}
        ></i>
      </a>
      <Header />
      <NewBooks books={books} />
      <BooksView books={books} />
    </>
  );
};

export default HomePage;
