import React, { useEffect, useState } from "react";
import axios from "axios";
import { Alert, Snackbar } from "@mui/material";
import uploadImg from "./../../assets/images/upload1.png";
import notFoundedImg from "./../../assets/images/default-avatar (1).png";

import "./editProfile.css";
import ConfirmDialog from "../ConfirmDialog/ConfirmDialog";
import { useNavigate } from "react-router";

export default function EditProfile() {
  let navigate = useNavigate();

  const [error, setErrors] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFromDB, setImageFromDB] = useState(null);
  // dialog
  const [deactivateChecked, setDeactivateChecked] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleConfirmDialogClose = () => {
    setConfirmOpen(false);
  };

  const handleConfirmDialogConfirm = async () => {
    try {
      setConfirmOpen(false);
      const token = localStorage.getItem("token");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      // Send a request to deactivate the account
      const res = await axios.post(
        "http://127.0.0.1:4000/user/delete",
        {}, // No data to send, just the request to deactivate
        config
      );
      console.log(res);
      setOpen(true);
      setErrors(null);
      localStorage.removeItem("token");
      navigate("/login");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (err) {
      console.log(err);
      if (err.response && err.response.data && err.response.data.message) {
        setErrors(err.response.data.message);
      } else {
        setErrors(
          "An error occurred while deactivating the account. Please try again later."
        );
      }
    }
  };
  // dialog

  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    phoneNumber: "",
    isDeleted: false,
  });
  // snackbar
  const [open, setOpen] = useState(false);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  // snackbar

  // image preview
  function validateImg(e) {
    const file = e.target.files[0];
    if (file.size >= 1048576) {
      return alert("Max file size is 1mb");
    } else {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    if (name === "isDeleted") {
      setDeactivateChecked(newValue);
    }
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: newValue,
    }));
  };

  //   useEffect
  useEffect(() => {
    const fetchInitialUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };
        const res = await axios.get("http://127.0.0.1:4000/user/data", config);
        const user = res.data.data.user;
        setUserData({
          firstName: user.firstName,
          lastName: user.lastName,
          userName: user.userName,
          email: user.email,
          phoneNumber: user.phoneNumber,
          isDeleted: user.isDeleted,
        });
        setImageFromDB(user.image.url);
      } catch (error) {
        console.error("Error fetching initial user data: ", error);
      }
    };

    fetchInitialUserData();
  }, []);
  console.log(userData);
  console.log(deactivateChecked);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(deactivateChecked);
    try {
      if (deactivateChecked) {
        setConfirmOpen(true);
      } else {
        const formData = new FormData();
        console.log(userData);
        Object.entries(userData).forEach(([key, value]) => {
          formData.append(key, value);
        });

        if (imageFile) {
          formData.append("profileImage", imageFile);
        }
        const token = localStorage.getItem("token");
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };
        const res = await axios.patch(
          "http://127.0.0.1:4000/user/update-data",
          formData,
          config
        );
        console.log(res);
        setOpen(true);
        setErrors(null);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setErrors(err.response.data.message);
      } else {
        setErrors(
          "An error occurred while updating data. Please try again later."
        );
      }
    }
  };

  return (
    <div className="edit-section ">
      <div className="container bootstrap snippets bootdeys mt-5 mb-5 p-0">
        <div className="row p-0">
          <div className="col-xs-12 col-md-12 col-sm-9">
            <form className="form-horizontal">
              <div className="panel panel-default">
                <div className="panel-body text-center">
                  {imageFromDB ? (
                    <img
                      src={imageFromDB}
                      className="img-circle profile-avatar"
                      alt="User avatar"
                    />
                  ) : (
                    <img
                      src={notFoundedImg}
                      className="img-circle profile-avatar"
                      alt="User avatar"
                    />
                  )}
                </div>
              </div>
              <div className="panel panel-default p-5">
                <div className="panel-heading">
                  <h4 className="panel-title">User info</h4>
                </div>
                <div className="panel-body">
                  {/* form group */}
                  <div className="form-group">
                    <label className=" control-label">First name</label>
                    <div className="col-sm-10">
                      <input
                        type="text"
                        className="form-control"
                        name="firstName"
                        value={userData.firstName}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  {/* form group */}
                  <div className="form-group">
                    <label className=" control-label">Last name</label>
                    <div className="col-sm-10">
                      <input
                        type="text"
                        className="form-control"
                        name="lastName"
                        value={userData.lastName}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  {/* form group */}
                  <div className="form-group">
                    <label className=" control-label">User name</label>
                    <div className="col-sm-10">
                      <input
                        type="text"
                        className="form-control"
                        name="userName"
                        value={userData.userName}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  {/* form group */}
                  <div className="form-group">
                    <label className=" control-label">Email</label>
                    <div className="col-sm-10">
                      <input
                        type="text"
                        className="form-control"
                        name="email"
                        value={userData.email}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  {/* form group */}
                  <div className="form-group">
                    <label className=" control-label">Phone number</label>
                    <div className="col-sm-10">
                      <input
                        type="tel"
                        className="form-control"
                        name="phoneNumber"
                        value={userData.phoneNumber}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  {/* form group */}
                  <div className="form-group mb-5">
                    <div className="col-sm-10 col-sm-offset-2">
                      <div className="checkbox">
                        <input
                          type="checkbox"
                          id="checkbox_1"
                          className="d-inline-block me-1"
                          name="isDeleted"
                          checked={deactivateChecked}
                          onChange={handleChange}
                        />
                        <label htmlFor="checkbox_1" className="text-danger">
                          {" "}
                          Deactivate Account
                        </label>
                      </div>
                    </div>
                  </div>
                  {/* form group */}
                  <ConfirmDialog
                    open={confirmOpen}
                    onClose={handleConfirmDialogClose}
                    onConfirm={handleConfirmDialogConfirm}
                  />
                  {/* Error container */}
                  {error && (
                    <div className="alert text-danger p-2 mt-4 mb-0 text-center">
                      {error}
                    </div>
                  )}
                  {/* Error container */}
                  {/* form group */}
                  <div className="form-group text-center mb-4 mt-3">
                    <div className="signup-profile-pic__container">
                      <img
                        // src={imagePreview || botImg}
                        src={imagePreview || uploadImg}
                        className="signup-profile-pic"
                        alt="profile"
                      />
                      <label
                        htmlFor="image-upload"
                        className="image-upload-label"
                      >
                        <i className="fas fa-plus-circle add-picture-icon"></i>
                      </label>
                      <input
                        type="file"
                        id="image-upload"
                        hidden
                        accept="image/png, image/jpeg"
                        onChange={validateImg}
                      />
                    </div>
                  </div>
                  {/* form group */}
                  <div className="form-group text-center ">
                    <div>
                      <button
                        type="submit"
                        className="btn btn-primary me-3"
                        onClick={handleSubmit}
                      >
                        Submit
                      </button>
                      <button type="reset" className="btn btn-outline-danger">
                        Cancel
                      </button>
                    </div>
                  </div>
                  {/* form group */}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        sx={{ bottom: { xs: 90, sm: 50 } }} // Adjust the bottom position based on viewport size
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Data updated successfully!
        </Alert>
      </Snackbar>
    </div>
  );
}
