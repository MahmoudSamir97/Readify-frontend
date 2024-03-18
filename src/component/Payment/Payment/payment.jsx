import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { motion } from 'framer-motion';

export default function PaymentForm() {
  return (
    <Container>
      <h4 className="mb-3">Payment Details</h4>
      <Form>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="firstName">
              <Form.Label>First Name</Form.Label>
              <motion.div
                whileHover={{ scale: 1.05, borderRadius: '20px' }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <Form.Control required type="text" placeholder="First Name" />
              </motion.div>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="lastName">
              <Form.Label>Last Name</Form.Label>
              <motion.div
                whileHover={{ scale: 1.05, borderRadius: '20px' }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <Form.Control required type="text" placeholder="Last Name" />
              </motion.div>
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-3" controlId="phone">
          <Form.Label>Phone</Form.Label>
          <motion.div
            whileHover={{ scale: 1.05, borderRadius: '20px' }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            <Form.Control required type="text" placeholder="Phone" />
          </motion.div>
        </Form.Group>

        <Form.Group className="mb-3" controlId="address">
          <Form.Label>Address</Form.Label>
          <motion.div
            whileHover={{ scale: 1.05, borderRadius: '20px' }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            <Form.Control required type="text" placeholder="Address" />
          </motion.div>
        </Form.Group>

        <Form.Group className="mb-3" controlId="CardNumber">
          <Form.Label>Card Number</Form.Label>
          <motion.div
            whileHover={{ scale: 1.05, borderRadius: '20px' }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            <Form.Control required type="text" placeholder="Card Number" />
          </motion.div>
        </Form.Group>

        <Form.Group className="mb-3" controlId="cvv">
          <Form.Label>CVV</Form.Label>
          <motion.div
            whileHover={{ scale: 1.05, borderRadius: '20px' }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            <Form.Control required type="text" placeholder="CVV" />
          </motion.div>
        </Form.Group>

        <Form.Group className="mb-3" controlId="endDate">
          <Form.Label>End Date</Form.Label>
          <motion.div
            whileHover={{ scale: 1.05, borderRadius: '20px' }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            <Form.Control required type="text" placeholder="End Date" />
          </motion.div>
        </Form.Group>

        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="city">
              <Form.Label>City</Form.Label>
              <motion.div
                whileHover={{ scale: 1.05, borderRadius: '20px' }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <Form.Control required type="text" placeholder="City" />
              </motion.div>
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group controlId="state">
              <Form.Label>State</Form.Label>
              <motion.div
                whileHover={{ scale: 1.05, borderRadius: '20px' }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <Form.Control type="text" placeholder="State" />
              </motion.div>
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group controlId="zip">
              <Form.Label>Zip / Postal code</Form.Label>
              <motion.div
                whileHover={{ scale: 1.05, borderRadius: '20px' }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <Form.Control required type="text" placeholder="Zip / Postal Code" />
              </motion.div>
            </Form.Group>
          </Col>
        </Row>

        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.3 }}
        >
          <Button
            variant="primary"
            type="submit"
            className="w-100"
            style={{
              background: 'linear-gradient(to right, #FFD700, #FFA500)',
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
