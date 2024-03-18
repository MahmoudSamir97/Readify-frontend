import React from 'react';
import { TextField, styled } from '@mui/material';
import { motion } from 'framer-motion';

const AnimatedInputWrapper = styled(motion.div)({
  padding: '2px',
  background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  borderRadius: '5px',
  '&:hover': {
    // This is where you can handle the hover state if needed
  },
  // Ensure the focus effect aligns with your theme
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'transparent', // Prevents the default border from changing color on focus
    },
    '&:hover fieldset': {
      borderColor: 'rgba(255, 255, 255, 0.5)', // Customize this as needed
    },
    '&.Mui-focused fieldset': {
      borderColor: 'transparent', // Changes the border color on focus
      borderWidth: '1px',
    },
  },
});

const AnimatedTextField = (props) => (
  <AnimatedInputWrapper
    initial={{ x: '-100vw' }}
    animate={{ x: 0 }}
    transition={{ type: 'spring', stiffness: 75 }}
  >
    <TextField {...props} variant="outlined" fullWidth InputProps={{ style: { color: 'black', background: 'white', borderRadius: '5px' }, ...props.InputProps }} />
  </AnimatedInputWrapper>
);

export default AnimatedTextField;
