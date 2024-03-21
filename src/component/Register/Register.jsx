import React, { useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import * as Yup from "yup";
import { Link } from "react-router-dom";

function Register() {
  // STATE
  let [isRegistered, setIsRegistered] = useState(false);
  let [error, setErrors] = useState(null);
  //   VALIDATION
  const signupSchema = Yup.object({
    firstName: Yup.string().required(),
    lastName: Yup.string().required(),
    userName: Yup.string()
      .matches(new RegExp(/^[A-Z]{1}[A-Za-z]{8,}[0-9@#$%^&*]{2,}$/), {
        message: "Please enter unique username",
      })
      .required(),
    email: Yup.string().email().required("required"),
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
        message: "Please enter a valid egyptian phone number!",
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
  //   REGISTER
  async function register(value) {
    try {
      const res = await axios.post("http://127.0.0.1:4000/auth/signup", value);
      console.log(res.data.status);
      if (res.data.status === "fail") {
        console.log("Registration failed:", res.data.message);
      } else {
        console.log("Registration successful");
        setIsRegistered(true);
      }
    } catch (error) {
      if (error.response.data.status === "fail") {
        setErrors(error.response.data.message);
      }
    }
  }

  return (
    <form
      className="mask d-flex align-items-center  gradient-custom-3"
      onSubmit={registerForm.handleSubmit}
    >
      <div className="container">
        <div className="row d-flex justify-content-center align-items-center ">
          <div className="col-12 col-md-9 col-lg-7 col-xl-6">
            <div style={{ borderRadius: 15 }}>
              <div className="p-5">
                <h2 className="text-uppercase text-center mb-5">
                  Create an account
                </h2>
                <div>
                  <div className="form-outline mb-4">
                    <input
                      type="text"
                      placeholder="first name"
                      value={registerForm.values.firstName}
                      onChange={registerForm.handleChange}
                      onBlur={registerForm.handleBlur}
                      name="firstName"
                      id="firstName"
                      className="form-control form-control-lg mb-0"
                    />
                    {registerForm.errors.firstName &&
                    registerForm.touched.firstName ? (
                      <div className=" alert-danger p-2">
                        {registerForm.errors.firstName}
                      </div>
                    ) : null}
                  </div>
                  {/* new input */}
                  <div className="form-outline mb-4">
                    <input
                      placeholder="last name"
                      type="text"
                      value={registerForm.values.lastName}
                      name="lastName"
                      onChange={registerForm.handleChange}
                      onBlur={registerForm.handleBlur}
                      id="lastName"
                      className="form-control form-control-lg mb-0"
                    />
                    {registerForm.errors.lastName &&
                    registerForm.touched.lastName ? (
                      <div className=" alert-danger p-2">
                        {registerForm.errors.lastName}
                      </div>
                    ) : null}
                  </div>
                  {/* new input */}
                  <div className="form-outline mb-4">
                    <input
                      placeholder="user name"
                      type="text"
                      value={registerForm.values.userName}
                      name="userName"
                      onChange={registerForm.handleChange}
                      onBlur={registerForm.handleBlur}
                      id="userName"
                      className="form-control form-control-lg mb-0"
                    />
                    {registerForm.errors.userName &&
                    registerForm.touched.userName ? (
                      <div className=" alert-danger p-2">
                        {registerForm.errors.userName}
                      </div>
                    ) : null}
                  </div>
                  {/* new input */}
                  <div className="form-outline mb-4">
                    <input
                      placeholder="email"
                      type="email"
                      value={registerForm.values.email}
                      name="email"
                      onChange={registerForm.handleChange}
                      onBlur={registerForm.handleBlur}
                      id="email"
                      className="form-control form-control-lg mb-0"
                    />
                    {registerForm.errors.email && registerForm.touched.email ? (
                      <div className="alert-danger p-2">
                        {registerForm.errors.email}
                      </div>
                    ) : null}
                  </div>
                  <div className="form-outline mb-4">
                    <input
                      placeholder="password"
                      type="password"
                      value={registerForm.values.password}
                      name="password"
                      onChange={registerForm.handleChange}
                      onBlur={registerForm.handleBlur}
                      id="password"
                      className="form-control form-control-lg mb-0"
                    />
                    {registerForm.errors.password &&
                    registerForm.touched.password ? (
                      <div className="alert-danger p-2">
                        {registerForm.errors.password}
                      </div>
                    ) : null}
                  </div>
                  <div className="form-outline mb-4">
                    <input
                      placeholder="Repeat your password"
                      type="password"
                      value={registerForm.values.repeatedPassword}
                      name="repeatedPassword"
                      onChange={registerForm.handleChange}
                      onBlur={registerForm.handleBlur}
                      id="repeatedPassword"
                      className="form-control form-control-lg mb-0"
                    />
                    {registerForm.errors.repeatedPassword &&
                    registerForm.touched.repeatedPassword ? (
                      <div className="alert-danger p-2">
                        {registerForm.errors.repeatedPassword}
                      </div>
                    ) : null}
                  </div>
                  <div className="form-outline mb-4">
                    <input
                      type="tel"
                      id="phoneNumber"
                      placeholder="Phone number"
                      value={registerForm.values.phoneNumber}
                      name="phoneNumber"
                      onChange={registerForm.handleChange}
                      onBlur={registerForm.handleBlur}
                      className="form-control form-control-lg mb-0"
                    />
                    {registerForm.errors.phoneNumber &&
                    registerForm.touched.phoneNumber ? (
                      <div className="alert-danger p-2">
                        {registerForm.errors.phoneNumber}
                      </div>
                    ) : null}
                  </div>
                  <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="dateOfBirth">
                      Birthdate
                    </label>
                    <input
                      type="date"
                      id="dateOfBirth"
                      value={registerForm.values.dateOfBirth}
                      name="dateOfBirth"
                      onChange={registerForm.handleChange}
                      onBlur={registerForm.handleBlur}
                      className="form-control form-control-lg mb-0"
                    />
                    {registerForm.errors.dateOfBirth &&
                    registerForm.touched.dateOfBirth ? (
                      <div className="alert-danger p-2">
                        {registerForm.errors.dateOfBirth}
                      </div>
                    ) : null}
                  </div>
                  {error && (
                    <div className="alert-danger p-2 mb-2">{error}</div>
                  )}

                  <div className="d-flex flex-direction-column justify-content-center">
                    <button
                      type="submit"
                      className="btn btn-success btn-block btn-lg gradient-custom-4 text-white"
                    >
                      Register
                    </button>
                  </div>
                  {isRegistered ? (
                    <div className="text-success text-center mt-3 mb-0 ">
                      verification email sent!
                    </div>
                  ) : null}
                  <p className="text-center text-muted mt-1 mb-0">
                    Have already an account?
                    <Link to={"/login"} className="fw-bold text-body">
                      Login Here
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default Register;

// if (error.response.data.status === "fail") {
//     setErrors(error.response.data.message);
//   }
//   Mahmoudsamir97@@
