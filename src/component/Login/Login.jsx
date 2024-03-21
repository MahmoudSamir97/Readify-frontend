import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";
import * as Yup from "yup";

function Login() {
  let [error, setErrors] = useState(null);
  let navigate = useNavigate();
  //   Schema
  const validationSchema = Yup.object({
    email: Yup.string().email().required("required"),
  });

  async function signIn(value) {
    try {
      console.log(value);
      let { data } = await axios.post(
        "http://127.0.0.1:4000/auth/login",
        value
      );
      console.log(data);
      localStorage.setItem("token", data.token);
      navigate("/");
    } catch (err) {
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
    <form
      className="mask d-flex align-items-center  gradient-custom-3"
      onSubmit={loginForm.handleSubmit}
    >
      <div className="container">
        <div className="row d-flex justify-content-center align-items-center ">
          <div className="col-12 col-md-9 col-lg-7 col-xl-6">
            <div style={{ borderRadius: 15 }}>
              <div className="p-5">
                <h2 className="text-uppercase text-center mb-5">Sign In</h2>
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
                  {error && (
                    <div className="alert-danger p-2 mb-2">{error}</div>
                  )}
                  <div className="d-flex flex-direction-column justify-content-center">
                    <button
                      type="submit"
                      className="btn btn-success btn-block btn-lg gradient-custom-4 text-white"
                    >
                      Login
                    </button>
                  </div>
                  <p className="text-center text-muted mt-5 mb-0">
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
  );
}

export default Login;
