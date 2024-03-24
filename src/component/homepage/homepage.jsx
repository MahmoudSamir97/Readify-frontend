import React from "react";
import NewBooks from "../newbooks/newbooks";
import BooksView from "../booksview/booksview";
import Header from "./../header/header";
import { Button, Col, Row } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import "./home.css";
import { Link } from "react-router-dom";

const HomePage = ({ books }) => {
  return (
    <>
      <Link
        to={"/cart"}
        className="floating-message text-decoration-none text-danger"
      >
        Join our chat
        <i
          className="fas fa-comment-dots d-inline-block ms-2"
          style={{ color: "#e01f59" }}
        ></i>
      </Link>
      <Header />
      <NewBooks books={books} />
      <BooksView books={books} />
      <Row>
        <Col
          md={6}
          className="d-flex flex-direction-column align-items-center justify-content-center"
        >
          <div>
            <h1>Share your thoughts with your friends</h1>
            <p>Let's connect with the world!</p>
            <LinkContainer to={"/chat"}>
              <Button variant="success">
                Get Started{" "}
                <i className="fas fa-comments home-message-icon"></i>
              </Button>
            </LinkContainer>
          </div>
        </Col>
        <Col md={6} className="home__bg"></Col>
      </Row>
    </>
  );
};

export default HomePage;
