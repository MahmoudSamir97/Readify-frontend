// // import React from "react";

// // function EditProfile() {
// //   return <div>EditProfile</div>;
// // }

// // export default EditProfile;
// import React, { useState } from 'react';
// import {
//   Box, Typography, TextField, Zoom, createTheme, ThemeProvider, responsiveFontSizes, styled
// } from '@mui/material';
// import Profile from './profile';

// let theme = createTheme();
// theme = responsiveFontSizes(theme);

// // Custom button with animation and gradient matching the website colors
// const AnimatedButton = styled('button')(({ theme }) => ({
//   background: '#d8cbbb', // Adjusted gradient
//   border: 0,
//   borderRadius: 3,
//   boxShadow: 'none',
//   color: 'white',
//   padding: '6px 16px', // Adjust padding as needed
//   margin: theme.spacing(1),
//   height: '36px', // Adjust height as needed
//   cursor: 'pointer',
//   '&:hover': {
//     background: 'linear-gradient(45deg, #21CBF3 30%, #2196F3 90%)',
//     boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)', // Optional: Light blue box shadow
//   },
//   transition: 'box-shadow 0.2s, background-color 0.2s',
// }));

// export default function EditProfile() {
//   const [isEditing, setIsEditing] = useState({
//     name: false, username: false, email: false, password: false, address: false, phone: false,
//   });
//   const [userData, setUserData] = useState({
//     name: 'Mohamed', username: '@username', email: 'email', password: 'password', address: 'address', phone: 'phone',
//   });

//   //   // Function to handle the editing state and input width
//   const handleEdit = (field) => {
//     setIsEditing((prev) => ({ ...prev, [field]: true }));
//   };
// 	@@ -33,62 +55,28 @@ export default function BasicStack() {
//   return (
//     <ThemeProvider theme={theme}>
//       <Box sx={{ width: '100%', maxWidth: 600, mx: 'auto', my: 2 }}>
//         <Typography variant="h2" sx={{
//           textAlign: 'center', mb: 4, fontSize: '2rem',
//           fontWeight: 'bold', color: '##d8cbbb ', // Example color
//           textAlign: 'center', marginBottom: theme.spacing(4),
//           background: '#d8cbbb ', // Adjusted gradient
//           WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
//           display: 'inline-block', padding: theme.spacing(1), borderRadius: theme.shape.borderRadius,
//           boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)', // Matching box shadow
//         }}>
//           Edit Profile Info
//         </Typography>

//         {Object.entries(userData).map(([field, value]) => (
//           <Box key={field} sx={{ mb: 2 }}>
//             <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
//               <Typography variant="h6">{field.charAt(0).toUpperCase() + field.slice(1)}</Typography>
//               {!isEditing[field] ? (
//                 <AnimatedButton onClick={() => handleEdit(field)}>Update</AnimatedButton>
//               ) : (
//                 <>
//                   <AnimatedButton onClick={() => handleCancel(field)}>Cancel</AnimatedButton>
//                   <AnimatedButton onClick={() => handleSave(field)}>Save</AnimatedButton>
//                 </>
//               )}
//             </Box>
// 	@@ -100,23 +88,24 @@ export default function BasicStack() {
//                 value={value}
//                 onChange={(e) => handleChange(e, field)}
//                 sx={{
//                   display: isEditing[field
//                   ] ? 'block' : 'none', // Only display when editing
//                   my: 2,
//                 }}
//               />
//             </Zoom>
//             {!isEditing[field] && (
//               <Typography variant="body1" sx={{ my: 2 }}>{value}</Typography>
//             )}
//           </Box>
//         ))}

//         <hr />

//         <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', my: 4 }}>
//           <Profile />
//         </Box>
//       </Box>
//     </ThemeProvider>
//   );
// }
import React from "react";

function EditProfile() {
  return <div>EditProfile</div>;
}

export default EditProfile;
