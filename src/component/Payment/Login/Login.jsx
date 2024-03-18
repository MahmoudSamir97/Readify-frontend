import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import logimage from './imgs/log.svg';
import register from './imgs/register.svg';

const SignInSignUpForm = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  // Motion variants for container
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      transition={{ duration: 0.5 }}
      className="mt-5"
    >
      <Container>
        <Row className="justify-content-center align-items-center">
          <Col md={6} className="text-center mb-5">
            <motion.img
              src={isSignUp ? register : logimage}
              alt="Log"
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="img-fluid"
            />
          </Col>
          <Col md={6}>
            <motion.div
              initial={{ x: isSignUp ? 200 : -200, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-light p-5 rounded"
            >
              <Form>
                <h2 className="mb-4">{isSignUp ? "Sign Up" : "Sign In"}</h2>
                {isSignUp && (
                  <>
                    <Form.Group className="mb-3">
                      <Form.Control type="text" placeholder="First Name" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Control type="text" placeholder="Last Name" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Control type="text" placeholder="Username" />
                    </Form.Group>
                  </>
                )}
                <Form.Group className="mb-3">
                  <Form.Control type="email" placeholder="Email" />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                {isSignUp && (
                  <>
                    <Form.Group className="mb-3">
                      <Form.Control type="password" placeholder="Confirm Password" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Control type="tel" placeholder="Phone Number" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Control type="date" placeholder="Birthdate" />
                    </Form.Group>
                    <Button variant="secondary" type="submit" className="w-100">
                      Sign Up
                    </Button>
                  </>
                )}
                {!isSignUp && (
                  <Button variant="secondary" type="submit" className="w-100">
                    Sign In
                  </Button>
                )}
              </Form>
              <Button
                variant="link"
                onClick={() => setIsSignUp(!isSignUp)}
                className="mt-3"
              >
                {isSignUp ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
              </Button>
            </motion.div>
          </Col>
        </Row>
      </Container>
    </motion.div>
  );
};

export default SignInSignUpForm;
