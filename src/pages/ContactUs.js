// pages/ContactUs.js
import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { FaMapMarkerAlt, FaEnvelope, FaPhone, FaWhatsapp, FaInstagram } from 'react-icons/fa';

const ContactUs = () => {
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      // Handle form submission - replace with actual submit logic
      alert('Thanks for contacting us! We\'ll get back to you soon.');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    }
    
    setValidated(true);
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  return (
    <section className="contact-section">
      <Container>
        <h1 className="section-title">Contact Us</h1>
        <p className="section-subtitle">We'd love to hear from you. Get in touch with us!</p>
        
        <Row className="mt-5">
          <Col lg={5} className="mb-4 mb-lg-0">
            <div className="contact-info">
              <h3>Get In Touch</h3>
              <p>Have questions about our products or services? We're here to help you!</p>
              
              <div className="contact-details mt-4">
                <div className="d-flex align-items-center mb-3">
                  <FaMapMarkerAlt className="me-3" />
                  <div>
                    <h5 className="mb-0">Our Location</h5>
                    <p className="mb-0">Pune, Maharashtra, India</p>
                  </div>
                </div>
                
                <div className="d-flex align-items-center mb-3">
                  <FaEnvelope className="me-3" />
                  <div>
                    <h5 className="mb-0">Email Us</h5>
                    <p className="mb-0">erayastyleyourway@gmail.com</p>
                  </div>
                </div>
                
                <div className="d-flex align-items-center mb-3">
                  <FaPhone className="me-3" />
                  <div>
                    <h5 className="mb-0">Call Us</h5>
                    <p className="mb-0">+91 9991112288</p>
                  </div>
                </div>
                
                <div className="social-links mt-4">
                  <h5>Follow Us</h5>
                  <div className="d-flex mt-3">
                    <a href="https://wa.me/919991112288" className="me-3" target="_blank" rel="noopener noreferrer">
                      <FaWhatsapp size={24} />
                    </a>
                    <a href="https://instagram.com/erayastyleyourway" target="_blank" rel="noopener noreferrer">
                      <FaInstagram size={24} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </Col>
          
          <Col lg={7}>
            <div className="contact-form">
              <h3 className="mb-4">Send us a Message</h3>
              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Row>
                  <Col md={6} className="mb-3">
                    <Form.Group controlId="name">
                      <Form.Control
                        required
                        type="text"
                        placeholder="Your Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                      />
                      <Form.Control.Feedback type="invalid">
                        Please provide your name.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  
                  <Col md={6} className="mb-3">
                    <Form.Group controlId="email">
                      <Form.Control
                        required
                        type="email"
                        placeholder="Your Email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                      />
                      <Form.Control.Feedback type="invalid">
                        Please provide a valid email.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
                
                <Form.Group className="mb-3" controlId="subject">
                  <Form.Control
                    required
                    type="text"
                    placeholder="Subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a subject.
                  </Form.Control.Feedback>
                </Form.Group>
                
                <Form.Group className="mb-3" controlId="message">
                  <Form.Control
                    required
                    as="textarea"
                    rows={5}
                    placeholder="Your Message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a message.
                  </Form.Control.Feedback>
                </Form.Group>
                
                <Button type="submit" className="btn-primary mt-3">
                  Send Message
                </Button>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ContactUs;