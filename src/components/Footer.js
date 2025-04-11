// components/Footer.js
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaWhatsapp, FaInstagram, FaPhone } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col lg={4} md={6} className="mb-4">
            <div className="footer-logo">ERAYA</div>
            <div className="footer-tagline">Style Your Way</div>
            <div className="social-icons">
              <a href="https://wa.me/919991112288" target="_blank" rel="noopener noreferrer">
                <FaWhatsapp />
              </a>
              <a href="https://instagram.com/erayastyleyourway" target="_blank" rel="noopener noreferrer">
                <FaInstagram />
              </a>
              <a href="tel:+919991112288">
                <FaPhone />
              </a>
            </div>
          </Col>
          <Col lg={4} md={12} className="mb-4">
            <h5>Contact Us</h5>
            <div className="footer-contact">
              <p>For general inquiries, partnership opportunities or just to say hello:</p>
              <a href="mailto:erayastyleyourway@gmail.com">erayastyleyourway@gmail.com</a>
              <a href="tel:+919991112288">+91 9991112288</a>
              <p>Address: Pune</p>
            </div>
          </Col>
        </Row>
        <div className="copyright text-center">
          <p>©2025 Eraya | All Rights Reserved | <Link to="/terms">Terms and Conditions</Link> | <Link to="/privacy">Privacy</Link></p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;