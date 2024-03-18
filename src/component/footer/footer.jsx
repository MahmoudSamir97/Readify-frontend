import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { faLinkedin, faGithub, faTwitter } from "@fortawesome/free-brands-svg-icons"; // Import Twitter icon
import "./footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col-lg-3 col-md-6 col-sm-12 mb-5">
            <h5>About Us</h5>
            <p>
              Our bookstore application is <br></br>a comprehensive platform<br></br> designed to
              cater to all book<br></br> lovers' needs.
            </p>
          </div>

          <div className="col-lg-3 col-md-6 col-sm-12 mb-5">
            <h5>Explore</h5>
            <ul className="list-unstyled">
              <li>
                <Link to="/" className="footer-link">
                  Home <FontAwesomeIcon icon={faArrowRight} className="arrow-icon" />
                </Link>
              </li>
              <li>
                <Link to="/allbooks" className="footer-link">
                  Books <FontAwesomeIcon icon={faArrowRight} className="arrow-icon" />
                </Link>
              </li>
              <li>
                <Link to="/aboutus" className="footer-link">
                  About <FontAwesomeIcon icon={faArrowRight} className="arrow-icon" />
                </Link>
              </li>
              <li>
                <Link to="/shoppingcart" className="footer-link">
                  Cart <FontAwesomeIcon icon={faArrowRight} className="arrow-icon" />
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-lg-6 col-md-12 col-sm-12 mb-5">
            <div className="row">
              <div className="col-md-6 mb-4">
                <h5 className="follow-us">Follow Us</h5>
                <div className="social-links">
                  <a
                    href="https://www.linkedin.com/in/peter-rezik-a84408123/"
                    className="social-link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FontAwesomeIcon icon={faLinkedin} className="icon" />
                  </a>
                  <a
                    href="https://github.com/PeterRizek009"
                    className="social-link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FontAwesomeIcon icon={faGithub} className="icon" />
                  </a>
                  <a
                    href="https://twitter.com/"
                    className="social-link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FontAwesomeIcon icon={faTwitter} className="icon" />
                  </a>
                </div>
              </div>
              <div className="col-md-6 mb-4">
                <h5 className="contact-info">Contact Information</h5>
                <p>123 Main Street, City, Country</p>
                <p>Email: info@example.com</p>
                <p>Phone: +1234567890</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
