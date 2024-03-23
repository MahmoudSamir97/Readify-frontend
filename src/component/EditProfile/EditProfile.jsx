import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  Zoom,
  createTheme,
  ThemeProvider,
  responsiveFontSizes,
  Snackbar,
  Alert,
} from "@mui/material";
import Profile from "../Profile/Profile";
import axios from "axios";
import { imageContext } from "../Context/ProfileImageContext";
import { useNavigate } from "react-router";
let theme = createTheme();
theme = responsiveFontSizes(theme);

export default function EditProfile() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [open, setOpen] = useState(false);
  const [error, setErrors] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [isEditing, setIsEditing] = useState({
    userName: false,
    email: false,
    phoneNumber: false,
  });
  const [initialUserData, setInitialUserData] = useState({
    userName: "",
    email: "",
    phoneNumber: "",
  });
  const [userData, setUserData] = useState({
    userName: "",
    email: "",
    phoneNumber: "",
  });
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
        setInitialUserData({
          userName: user.userName,
          email: user.email,
          phoneNumber: user.phoneNumber,
        });
        setUserData({
          userName: user.userName,
          email: user.email,
          phoneNumber: user.phoneNumber,
        });
        setPreviewImage(user.image.url); // Set the preview image
      } catch (error) {
        console.error("Error fetching initial user data: ", error);
      }
    };

    fetchInitialUserData();
  }, []);

  // Function to handle the editing state and input width
  const handleEdit = (field) => {
    setIsEditing((prev) => ({ ...prev, [field]: true }));
  };

  const handleCancel = (field) => {
    setIsEditing((prev) => ({ ...prev, [field]: false }));
  };

  const handleChange = (e, field) => {
    setUserData({ ...userData, [field]: e.target.value });
  };

  const handleSave = (field) => {
    console.log(`Saving ${field}: ${userData[field]}`);
    setIsEditing((prev) => ({ ...prev, [field]: false }));
    // Save the updated data somewhere
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      console.log(userData, "USerrrrr");
      console.log(initialUserData, "initial");

      Object.entries(userData).forEach(([key, value]) => {
        if (value !== initialUserData[key]) {
          formData.append(key, value);
        }
      });
      if (selectedImage) {
        formData.append("profileImage", selectedImage);
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
      setOpen(true);
      setErrors(null);
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
    <ThemeProvider theme={theme}>
      <Box sx={{ width: "100%", maxWidth: 600, mx: "auto", my: 2 }}>
        <Typography
          variant="h2"
          className="m-5"
          sx={{
            textAlign: "center",
            mb: 4,
            fontSize: "2rem",
            fontWeight: "bold",
            color: "#123456", // Example color
            marginBottom: theme.spacing(4),
            background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)", // Example gradient
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            display: "inline-block",
            padding: theme.spacing(1),
            borderRadius: theme.shape.borderRadius,
            boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
          }}
        >
          Edit Profile
        </Typography>

        {Object.entries(userData).map(([field, value]) => (
          <Box key={field} sx={{ mb: 2 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography variant="h6">
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </Typography>
              {!isEditing[field] ? (
                <Button
                  sx={{
                    background:
                      "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
                    border: 0,
                    borderRadius: 3,
                    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
                    color: "white",
                    height: 48,
                    padding: "0 30px",
                    "&:hover": {
                      background:
                        "linear-gradient(45deg, #FF8E53 30%, #FE6B8B 90%)",
                    },
                  }}
                  size="small"
                  variant="contained"
                  color="success"
                  onClick={() => handleEdit(field)}
                >
                  Update
                </Button>
              ) : (
                <>
                  <Button
                    sx={{
                      background:
                        "linear-gradient(45deg, #EF5350 30%, #E57373 90%)", // Shades of red
                      border: 0,
                      borderRadius: 3,
                      boxShadow: "0 3px 5px 2px rgba(239, 83, 80, .3)", // Shadow with a red hue
                      color: "white",
                      height: 48,
                      padding: "0 30px",
                      "&:hover": {
                        background:
                          "linear-gradient(45deg, #E57373 30%, #EF5350 90%)",
                      },
                    }}
                    size="small"
                    variant="contained"
                    color="error"
                    onClick={() => handleCancel(field)}
                  >
                    Cancel
                  </Button>
                  <Button
                    sx={{
                      background:
                        "linear-gradient(45deg, #4CAF50 30%, #81C784 90%)", // Shades of green
                      border: 0,
                      borderRadius: 3,
                      boxShadow: "0 3px 5px 2px rgba(76, 175, 80, .3)", // Shadow with a green hue
                      color: "white",
                      height: 48,
                      padding: "0 30px",
                      "&:hover": {
                        background:
                          "linear-gradient(45deg, #81C784 30%, #4CAF50 90%)",
                      },
                    }}
                    size="small"
                    variant="contained"
                    color="success"
                    onClick={() => handleSave(field)}
                  >
                    Save
                  </Button>
                </>
              )}
            </Box>
            <Zoom
              in={isEditing[field]}
              style={{ transitionDelay: isEditing[field] ? "500ms" : "0ms" }}
            >
              <TextField
                fullWidth
                size="small"
                variant="outlined"
                value={value}
                onChange={(e) => handleChange(e, field)}
                sx={{
                  display: isEditing[field] ? "block" : "none", // Only display when editing
                  my: 2,
                }}
              />
            </Zoom>
            {!isEditing[field] && (
              <Typography variant="body1" sx={{ my: 2 }}>
                {value}
              </Typography>
            )}
          </Box>
        ))}

        <hr></hr>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            my: 4,
          }}
        >
          {error && <div className="alert-danger p-2 mb-2">{error}</div>}
          <Profile
            setSelectedImage={setSelectedImage}
            selectedImage={selectedImage}
            onSubmit={handleSubmit}
            setPreviewImage={setPreviewImage}
            previewImage={previewImage}
          />
        </Box>
      </Box>
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
    </ThemeProvider>
  );
}
