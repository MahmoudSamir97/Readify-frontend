import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Sidebar from "../component/ChatSidebar/Sidebar";
import MessageForm from "../component/ChatMessage/MessageForm";

function Chat() {
  return (
    <Container className="py-3">
      <Row>
        <Col md={4}>
          <Sidebar />
        </Col>
        <Col md={8}>
          <MessageForm />
        </Col>
      </Row>
    </Container>
  );
}

export default Chat;
