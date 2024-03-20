import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { motion } from 'framer-motion';

export default function PaymentForm() {
  return (
    <Container>
      <h4 className="mb-3" style={{ fontWeight: '900', color: '#d8cbbb', fontSize: '2rem' , textAlign: 'center'  }}>Payment Details</h4>
      <Form>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="firstName">
              <Form.Label style={{ fontWeight: 'bold', color: '#333', fontSize: '1rem' }}>First Name</Form.Label>
              <motion.div
                whileHover={{ scale: 1.03, boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.2)", borderRadius: '20px' }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.2 }}
              >
                <Form.Control required type="text" placeholder="First Name" />
              </motion.div>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="lastName">
              <Form.Label style={{ fontWeight: 'bold', color: '#333', fontSize: '1rem' }}>Last Name</Form.Label>
              <motion.div
                whileHover={{ scale: 1.03, boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.2)", borderRadius: '20px' }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.2 }}
              >
                <Form.Control required type="text" placeholder="Last Name" />
              </motion.div>
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-3" controlId="CardNumber">
          <Form.Label style={{ fontWeight: 'bold', color: '#333', fontSize: '1rem' }}>Card Number</Form.Label>
          <motion.div
            whileHover={{ scale: 1.03, boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.2)", borderRadius: '20px' }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.2 }}
          >
            <Form.Control required type="text" placeholder="Card Number" />
          </motion.div>
        </Form.Group>

        <Form.Group className="mb-3" controlId="cvv">
          <Form.Label style={{ fontWeight: 'bold', color: '#333', fontSize: '1rem' }}>CVV</Form.Label>
          <motion.div
            whileHover={{ scale: 1.03, boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.2)", borderRadius: '20px' }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.2 }}
          >
            <Form.Control required type="text" placeholder="CVV" />
          </motion.div>
        </Form.Group>

        <Form.Group className="mb-3" controlId="endDate">
          <Form.Label style={{ fontWeight: 'bold', color: '#333', fontSize: '1rem' }}>End Date</Form.Label>
          <motion.div
            whileHover={{ scale: 1.03, boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.2)", borderRadius: '20px' }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.2 }}
          >
            <Form.Control required type="text" placeholder="End Date" />
          </motion.div>
        </Form.Group>

        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="city">
              <Form.Label style={{ fontWeight: 'bold', color: '#333', fontSize: '1rem' }}>City</Form.Label>
              <motion.div
                whileHover={{ scale: 1.03, boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.2)", borderRadius: '20px' }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.2 }}
              >
                <Form.Control required type="text" placeholder="City" />
              </motion.div>
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group controlId="state">
              <Form.Label style={{ fontWeight: 'bold', color: '#333', fontSize: '1rem' }}>State</Form.Label>
              <motion.div
                whileHover={{ scale: 1.03, boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.2)", borderRadius: '20px' }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.2 }}
              >
                <Form.Control type="text" placeholder="State" />
              </motion.div>
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group controlId="zip">
              <Form.Label style={{ fontWeight: 'bold', color: '#333', fontSize: '1rem' }}>Zip / Postal code</Form.Label>
              <motion.div
                whileHover={{ scale: 1.03, boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.2)", borderRadius: '20px' }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.2 }}
              >
                <Form.Control required type="text" placeholder="Zip / Postal Code" />
              </motion.div>
            </Form.Group>
          </Col>
        </Row>

        <motion.div
          whileHover={{ scale: 1.05, boxShadow: "0px 0px 12px rgba(0, 0, 0, 0.2)" }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
        >
          <Button
            variant="primary"
            type="submit"
            className="w-100"
            style={{
              background: 'linear-gradient(to right, #d8cbbb, #00DBDE)',
              border: 'none',
            }}
          >
            <span style={{ color: 'white' }}>Submit Payment</span>
          </Button>
        </motion.div>
      </Form>
    </Container>
  );
}
