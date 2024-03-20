import React, { useState } from 'react';
import {
  Box, Typography, TextField, Button, Zoom, createTheme, ThemeProvider, responsiveFontSizes
} from '@mui/material';

let theme = createTheme();
theme = responsiveFontSizes(theme);

export default function ChangePasswordForm() {
  const [email, setEmail] = useState('');
  const [oldPassword, setOldPassword] = useState(''); // State for the old password
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleChangeOldPassword = (event) => {
    setOldPassword(event.target.value); // Handler for changing old password
  };

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleChangeConfirmPassword = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Here you can handle the password change logic
    console.log(`Email: ${email}, Old Password: ${oldPassword}, New Password: ${password}, Confirm New Password: ${confirmPassword}`);
    // Reset the state or show a success message
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ width: '100%', maxWidth: 600, mx: 'auto', my: 2 }}>
        <Typography variant="h2" sx={{
          textAlign: 'center', mb: 4, fontSize: '2rem',
          fontWeight: 'bold', color: '#d8cbbb', // Adjust the color as needed
          background: 'transparent',
          display: 'inline-block', padding: theme.spacing(1), borderRadius: theme.shape.borderRadius,
        }}>
          Change Password
        </Typography>
        
        <Zoom in style={{ transitionDelay: '500ms' }}>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={handleChangeEmail}
            />
            <TextField // Old Password TextField
              margin="normal"
              required
              fullWidth
              name="oldPassword"
              label="Old Password"
              type="password"
              autoComplete="current-password"
              value={oldPassword}
              onChange={handleChangeOldPassword}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="New Password"
              type="password"
              autoComplete="new-password"
              value={password}
              onChange={handleChangePassword}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Confirm New Password"
              type="password"
              autoComplete="new-password"
              value={confirmPassword}
              onChange={handleChangeConfirmPassword}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, bgcolor: '#d8cbbb', '&:hover': { bgcolor: '#d8cbbb' } }}
            >
              Change Password
            </Button>
          </Box>
        </Zoom>
      </Box>
    </ThemeProvider>
  );
}
