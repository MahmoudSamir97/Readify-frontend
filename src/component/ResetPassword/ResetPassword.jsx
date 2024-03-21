import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Zoom,
  createTheme,
  ThemeProvider,
  responsiveFontSizes,
  Snackbar,
  Alert,
} from "@mui/material";
import { useNavigate, useParams } from "react-router";
import axios from "axios";

let theme = createTheme();
theme = responsiveFontSizes(theme);

export default function ResetPassword() {
  let navigate = useNavigate();

  let [error, setErrors] = useState(null);
  const { resetLink } = useParams();
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [open, setOpen] = useState(false);

  const handleChangePassword = (event) => {
    setNewPassword(event.target.value);
  };
  const handleChangeConfirmPassword = (event) => {
    setConfirmNewPassword(event.target.value);
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post(
        `http://127.0.0.1:4000/auth/reset-password/${resetLink}`,
        {
          newPassword,
          confirmNewPassword,
        }
      );
      setOpen(true);
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setErrors(err.response.data.message);
      } else {
        setErrors(
          "An error occurred while resetting password. Please try again later."
        );
      }
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ width: "100%", maxWidth: 600, mx: "auto", my: 2 }}>
        <Typography
          variant="h2"
          sx={{
            textAlign: "center",
            mb: 4,
            fontSize: "2rem",
            fontWeight: "bold",
            color: "#d8cbbb", // Adjust the color as needed
            background: "transparent",
            display: "inline-block",
            padding: theme.spacing(1),
            borderRadius: theme.shape.borderRadius,
          }}
        >
          Confirm Password
        </Typography>

        <Zoom in style={{ transitionDelay: "500ms" }}>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              name="newPassword"
              label="New Password"
              type="password"
              autoComplete="new-password"
              value={newPassword}
              onChange={handleChangePassword}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmNewPassword"
              label="Repeat Password"
              type="password"
              autoComplete="new-password"
              value={confirmNewPassword}
              onChange={handleChangeConfirmPassword}
            />
            {error && <div className="alert-danger p-2 mb-2">{error}</div>}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                bgcolor: "#d8cbbb",
                "&:hover": { bgcolor: "#d8cbbb" },
              }}
            >
              Change Password
            </Button>
          </Box>
        </Zoom>
      </Box>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        sx={{ bottom: { xs: 90, sm: 50 } }} // Adjust the bottom position based on viewport size
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Password resetted successfully!
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
}
