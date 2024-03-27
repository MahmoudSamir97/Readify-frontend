import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";
import * as Yup from "yup";
import { imageContext } from "../Context/ProfileImageContext";
import "./Login.css";
import img from "./../../assets/images/signup.jpg";

function Login() {
  let [errors, setErrors] = useState(null);
  const [profileImageSet, setProfileImageSet] = useState(false); // Track whether profile image has been set
  let navigate = useNavigate();
  const { setProfileImage } = useContext(imageContext);
  // Schema
  const validationSchema = Yup.object({
    email: Yup.string().email().required("required"),
  });

  async function signIn(value) {
    try {
      const { data } = await axios.post(
        "http://127.0.0.1:4000/auth/login",
        value
      );
      localStorage.setItem("token", data.token);
      setProfileImage(data.registeredUser.image.url);
      setProfileImageSet(true);
      navigate("/home");
    } catch (err) {
      // });
      if (err.response && err.response.data && err.response.data.message) {
        setErrors(err.response.data.message);
      } else {
        setErrors(
          "An error occurred while signing in. Please try again later."
        );
      }
    }
  }

  const loginForm = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: signIn,
  });
  return (
    <div className="row">
      <div className="col-md-6">
        <img src={img} alt="shelf book" className="w-100 custom-img" />
      </div>
      <div className="col-md-6 mt-5">
        <form
          className="mask d-flex align-items-center gradient-custom-3"
          onSubmit={loginForm.handleSubmit}
        >
          <div className="container">
            <div className="row d-flex justify-content-center align-items-center ">
              <div className="col-12 col-md-9 ">
                <div style={{ borderRadius: 15 }}>
                  <div className="p-5">
                    <h2
                      className="text-uppercase text-center mb-5"
                      style={{ color: "#3c6478" }}
                    >
                      Sign In
                    </h2>
                    <div>
                      {/* new input */}
                      <div className="form-outline mb-4">
                        <input
                          placeholder="email"
                          type="email"
                          value={loginForm.values.email}
                          name="email"
                          onChange={loginForm.handleChange}
                          onBlur={loginForm.handleBlur}
                          id="email"
                          className="form-control form-control-lg mb-0"
                        />
                        {loginForm.errors.email && loginForm.touched.email ? (
                          <div className="alert-danger p-2">
                            {loginForm.errors.email}
                          </div>
                        ) : null}
                      </div>
                      <div className="form-outline mb-1">
                        <input
                          placeholder="password"
                          type="password"
                          value={loginForm.values.password}
                          name="password"
                          onChange={loginForm.handleChange}
                          onBlur={loginForm.handleBlur}
                          id="password"
                          className="form-control form-control-lg mb-0"
                        />
                      </div>
                      <Link
                        className="text-decoration-none"
                        to={"/forget-password"}
                      >
                        Forgot your password?
                      </Link>
                      {errors && (
                        <div className="alert-danger p-2 mb-2 mt-3">
                          {errors}
                        </div>
                      )}
                      <div className="d-flex flex-direction-column justify-content-center">
                        <button
                          type="submit"
                          className="btn btn-info btn-block btn-lg gradient-custom-4 text-white mt-4 mb-0"
                        >
                          Login
                        </button>
                      </div>
                      <p className="text-center text-muted mt-3 mb-0">
                        Don't have an account?
                        <Link to={"/register"} className="fw-bold text-body">
                          SignUp
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
