import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import resetimg from './imgs/reset.svg';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const ResetPasswordForm = () => {
  const [emailSent, setEmailSent] = useState(false);
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');

  // Motion variants for container
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Here you would handle sending the email
    console.log(email);
    setEmailSent(true);
    setOpen(true);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      transition={{ duration: 0.5 }}
      className="mt-5"
    >
      <Container>
        <Row className="justify-content-center align-items-center">
          <Col md={6} className="text-center">
            <motion.img
              src={resetimg}
              alt="Reset"
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="img-fluid mb-5"
            />
          </Col>
          <Col md={6}>
            <motion.div
              initial={{ x: -200, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-light p-5 rounded"
            >
              <Form onSubmit={handleSubmit}>
                <h2 className="mb-4">Forget Password</h2>
                <Form.Group className="mb-3">
                  <Form.Control 
                    type="email" 
                    placeholder="Email" 
                    value={email}
                    onChange={handleEmailChange}
                  />
                </Form.Group>
                <Button 
                  variant="secondary" 
                  type="submit" 
                  className="w-100 mt-3"
                  disabled={emailSent}
                >
                  {emailSent ? 'Email Sent' : 'Send Email'}
                </Button>
              </Form>
            </motion.div>
          </Col>
        </Row>
        <Snackbar 
          open={open} 
          autoHideDuration={6000} 
          onClose={handleClose} 
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          sx={{ bottom: { xs: 90, sm: 50 } }} // Adjust the bottom position based on viewport size
        >
          <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
            Email has been sent!
          </Alert>
        </Snackbar>
      </Container>
    </motion.div>
  );
};

export default ResetPasswordForm;
