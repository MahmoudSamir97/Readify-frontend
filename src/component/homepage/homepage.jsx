import React from "react";
import NewBooks from "../newbooks/newbooks";
import BooksView from "../booksview/booksview";
import Header from "./../header/header";
import { Button, Col, Row } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import "./home.css";

const HomePage = ({ books }) => {
  return (
    <>
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
