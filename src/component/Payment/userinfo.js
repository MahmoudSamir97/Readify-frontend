import React, { useState } from 'react';
import {
  Box, Typography, Button, TextField, Zoom, createTheme, ThemeProvider, responsiveFontSizes
} from '@mui/material';
import Profile from './profile';

let theme = createTheme();
theme = responsiveFontSizes(theme);

export default function BasicStack() {
  const [isEditing, setIsEditing] = useState({ name: false, username: false , email: false, password: false, address: false, phone: false, });
  const [userData, setUserData] = useState({ name: 'Mohamed', username: '@username' , email: 'email', password: 'password', address: 'address', phone: 'phone'});

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

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ width: '100%', maxWidth: 600, mx: 'auto', my: 2 }}>
        <Typography variant="h2" sx={{ textAlign: 'center', mb: 4 , fontSize: '2rem',
      fontWeight: 'bold',
      color: '#123456', // Example color
      textAlign: 'center',
      marginBottom: theme.spacing(4),
      background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)', // Example gradient
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      display: 'inline-block',
      padding: theme.spacing(1),
      borderRadius: theme.shape.borderRadius,
      boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)', }}>Edit Profile Info</Typography>
        
        {Object.entries(userData).map(([field, value]) => (
          <Box key={field} sx={{ mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography variant="h6">{field.charAt(0).toUpperCase() + field.slice(1)}</Typography>
              {!isEditing[field] ? (
                <Button   sx={{
                  background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
                  border: 0,
                  borderRadius: 3,
                  boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
                  color: 'white',
                  height: 48,
                  padding: '0 30px',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #FF8E53 30%, #FE6B8B 90%)',
                  },
                }} size='small' variant="contained" color="success" onClick={() => handleEdit(field)}>Update</Button>
              ) : (
                <>
                  <Button sx={{
        background: 'linear-gradient(45deg, #EF5350 30%, #E57373 90%)', // Shades of red
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(239, 83, 80, .3)', // Shadow with a red hue
        color: 'white',
        height: 48,
        padding: '0 30px',
        '&:hover': {
          background: 'linear-gradient(45deg, #E57373 30%, #EF5350 90%)',
        },
      }} size='small' variant="contained" color="error" onClick={() => handleCancel(field)}>Cancel</Button>
                  <Button  sx={{
        background: 'linear-gradient(45deg, #4CAF50 30%, #81C784 90%)', // Shades of green
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(76, 175, 80, .3)', // Shadow with a green hue
        color: 'white',
        height: 48,
        padding: '0 30px',
        '&:hover': {
          background: 'linear-gradient(45deg, #81C784 30%, #4CAF50 90%)',
        },
      }} size='small' variant="contained" color="success" onClick={() => handleSave(field)}>Save</Button>
                </>
              )}
            </Box>
            <Zoom in={isEditing[field]} style={{ transitionDelay: isEditing[field] ? '500ms' : '0ms' }}>
              <TextField
                fullWidth
                size="small"
                variant="outlined"
                value={value}
                onChange={(e) => handleChange(e, field)}
                sx={{
                  display: isEditing[field] ? 'block' : 'none', // Only display when editing
                  my: 2,
                }}
              />
            </Zoom>
            {!isEditing[field] && (
              <Typography variant="body1" sx={{ my: 2 }}>{value}</Typography>
            )}
            
          </Box>
        ))}

        <hr></hr>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', my: 4 }}>
          <Profile />
        </Box>
      </Box>
    </ThemeProvider>
  );
}
