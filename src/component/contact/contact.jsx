import React, { useState } from "react";
import { useNavigate } from "react-router";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faTwitter, faFacebook } from '@fortawesome/free-brands-svg-icons';
import "./contact.css"; // Import your external CSS file for styling
import contactImage from "../../images/img8.jpeg"; // Import the image

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState(""); // State for success message
  const navigate = useNavigate();

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Perform form submission logic here
      console.log("Form submitted successfully!");
      setSuccessMessage("Your message has been sent successfully!"); // Set success message
      // Reset form data
      setFormData({
        name: "",
        email: "",
        message: ""
      });
      // Clear errors
      setErrors({});
    } else {
      console.log("Form validation failed!");
    }
  };

  // Function to validate form fields
  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
      valid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = "Invalid email format";
      valid = false;
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  // Function to validate email format
  const isValidEmail = (email) => {
    // Simple email validation regex pattern
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Function to handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    setErrors({
      ...errors,
      [name]: ""
    });
  };

  return (
    <div className="contact-page">
      <div className="contact-content">
        <h2>Send Us a Message</h2>
        {successMessage && <p className="success-message">{successMessage}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
            {errors.name && <div className="invalid-feedback">{errors.name}</div>}
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
          </div>
          <div className="mb-3">
            <label htmlFor="message" className="form-label">Message</label>
            <textarea
              className="form-control message-textarea"
              id="message"
              name="message"
              rows="10"
              value={formData.message}
              onChange={handleInputChange}
              required
            ></textarea>
            {errors.message && <div className="invalid-feedback">{errors.message}</div>}
          </div>
          <button type="submit" className="btn btn-send">Send Message</button>
        </form>
        <div className="follow-us">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <a href="https://github.com"><FontAwesomeIcon icon={faGithub} /></a>
            <a href="https://twitter.com"><FontAwesomeIcon icon={faTwitter} /></a>
            <a href="https://facebook.com"><FontAwesomeIcon icon={faFacebook} /></a>
          </div>
        </div>
      </div>
      <div className="contact-image">
        <img src={contactImage} alt="Contact Image" />
      </div>
    </div>
  );
};

export default ContactUs;
