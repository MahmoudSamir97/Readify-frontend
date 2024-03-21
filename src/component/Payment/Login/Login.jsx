import React, { useState } from "react";
import { motion } from "framer-motion";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
// import logimage from "./imgs/log.svg";
// import registerImage from "./imgs/register.svg";
// import { useSignupUserMutation } from "../../../services/appApi";
import { useFormik } from "formik";
import axios from "axios";
import * as Yup from "yup";

const SignInSignUpForm = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  // const [signupUser, { isloading, error }] = useSignupUserMutation();

  // Motion variants for container
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
  };
  // SCHEMA
  const signupSchema = Yup.object({
    firstName: Yup.string().required(),
    lastName: Yup.string().required(),
    userName: Yup.string()
      .matches(new RegExp(/^[A-Z]{1}[A-Za-z]{8,}[0-9@#$%^&*]{2,}$/), {
        message: "firstName should be unique! use special characters",
      })
      .required(),
    email: Yup.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["net", "com"] } })
      .required(),
    password: Yup.string()
      .matches(new RegExp(/^[A-Z][A-Za-z1-9]{8,}[@#$%^&*]{1,}$/), {
        message:
          "Password should contain Uppercase, Lowercase and special characters",
      })
      .required(),
    repeatedPassword: Yup.string().oneOf(
      [Yup.ref("password")],
      "password and confirmed password should be matched"
    ),
    dateOfBirth: Yup.string().required(),
    phoneNumber: Yup.string()
      .matches(new RegExp(/^01[0|1|2|5]{1}[0-9]{8}$/), {
        message: "Please enter a valid egyptian number",
      })
      .required(),
  });
  // USE FORMIK
  const registerForm = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      userName: "",
      email: "",
      password: "",
      repeatedPassword: "",
      dateOfBirth: "",
      phoneNumber: "",
    },
    validationSchema: signupSchema,
    onSubmit: register,
  });
  async function register(value) {
    console.log(value);
    const res = await axios.post("http://127.0.0.1:4000/auth/signup", value);
    console.log(res);
  }

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
            {/* <motion.img
              src={isSignUp ? registerImage : logimage}
              alt="Log"
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="img-fluid"
            /> */}
          </Col>
          <Col md={6}>
            <motion.div
              initial={{ x: isSignUp ? 200 : -200, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-light p-5 rounded"
            >
              <Form onSubmit={registerForm.handleSubmit}>
                <h2 className="mb-4">{isSignUp ? "Sign Up" : "Sign In"}</h2>
                {isSignUp && (
                  <>
                    <Form.Group className="mb-3">
                      <Form.Control
                        type="text"
                        placeholder="First Name"
                        value={registerForm.values.firstName}
                        onChange={registerForm.handleChange}
                        onBlur={registerForm.handleBlur}
                        name="firstName"
                        id="firstName"
                      />
                      {registerForm.errors.firstName &&
                      registerForm.touched.firstName ? (
                        <Form.Text className="alert-danger p-2">
                          {registerForm.errors.firstName}
                        </Form.Text>
                      ) : null}
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Control
                        type="text"
                        placeholder="Last Name"
                        name="lasttName"
                        id="lastName"
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Control
                        type="text"
                        placeholder="userName"
                        name="userName"
                        id="userName"
                      />
                    </Form.Group>
                  </>
                )}
                <Form.Group className="mb-3">
                  <Form.Control
                    type="email"
                    placeholder="Email"
                    name="email"
                    id="email"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    // value={registerForm.values.firstName}
                    // onChange={registerForm.handleChange}
                    // onBlur={registerForm.handleBlur}
                    name="password"
                    id="password"
                  />
                </Form.Group>
                {isSignUp && (
                  <>
                    <Form.Group className="mb-3">
                      <Form.Control
                        type="password"
                        placeholder="Confirm Password"
                        name="repeatedPassword"
                        id="repeatedPassword"
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Control
                        type="tel"
                        placeholder="Phone Number"
                        name="phoneNumber"
                        id="phoneNumber"
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Control
                        type="date"
                        placeholder="Birthdate"
                        name="dateOfBirth"
                        id="dateOfBirth"
                      />
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
                {isSignUp
                  ? "Already have an account? Sign In"
                  : "Don't have an account? Sign Up"}
              </Button>
            </motion.div>
          </Col>
        </Row>
      </Container>
    </motion.div>
  );
};

export default SignInSignUpForm;
