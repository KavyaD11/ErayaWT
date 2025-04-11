import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <>
      {/* Hero  */}
      <section className="hero">
        <div className="hero-bg-image"></div>
        <div className="hero-bg-overlay"></div>
        <Container>
          <div className="hero-content">
            <h1 className="hero-title">ERAYA</h1>
            <p className="hero-subtitle">Style Your Way</p>
          </div>
        </Container>
        <div className="hero-blur-gradient"></div>
      </section>


      <section className="customize-section">
        <Container>
          <div className="customize-card">
            <div className="customize-content">
              <h2>CUSTOMIZE</h2>
              <h3>Your Own Bag</h3>
              <Button
                as={Link}
                to="/customize"
                className="btn-primary"
              >
                Start Designing
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <section className="product-categories">
        <Container>
          <h2 className="section-title">Our Products</h2>
          <p className="section-subtitle">Browse our collection or create your own</p>

          <Row>
            <Col lg={4} md={6} className="mb-4">
              <div className="category-card">
                <div className="card-img-container">
                  <img src="/Bag1.png" alt="..." className="category-img" />
                </div>
                <div className="card-body">
                  <h5>Custom Canvas</h5>
                  <Button as={Link} to="/shop">View Products</Button>
                </div>
              </div>
            </Col>

            <Col lg={4} md={6} className="mb-4">
            <div className="category-card">
                <div className="card-img-container">
                  <img src="/Bag12.png" alt="..." className="category-img" />
                </div>
                <div className="card-body">
                  <h5>Custom Canvas</h5>
                  <Button as={Link} to="/shop">View Products</Button>
                </div>
              </div>
            </Col>

            <Col lg={4} md={6} className="mb-4">
            <div className="category-card">
                <div className="card-img-container">
                  <img src="/Bag3.png" alt="..." className="category-img" />
                </div>
                <div className="card-body">
                  <h5>Custom Canvas</h5>
                  <Button as={Link} to="/shop">View Products</Button>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="section">
        <Container>
          <h2 className="section-title">Why Choose Eraya?</h2>
          <p className="section-subtitle">Express yourself with personalized designs</p>

          <Row className="mt-5">
            <Col lg={4} md={6} className="mb-4">
              <div className="feature-card text-center">
                <div className="feature-icon mb-3">
                  <i className="fas fa-paint-brush fa-3x" style={{ color: 'var(--secondary-color)' }}></i>
                </div>
                <h4 className="text-white mb-3">Custom Designs</h4>
                <p className="text-light">Create a unique bag that reflects your personal style and creativity.</p>
              </div>
            </Col>

            <Col lg={4} md={6} className="mb-4">
              <div className="feature-card text-center">
                <div className="feature-icon mb-3">
                  <i className="fas fa-award fa-3x" style={{ color: 'var(--secondary-color)' }}></i>
                </div>
                <h4 className="text-white mb-3">Premium Quality</h4>
                <p className="text-light">All our products are made with high-quality materials built to last.</p>
              </div>
            </Col>

            <Col lg={4} md={6} className="mb-4">
              <div className="feature-card text-center">
                <div className="feature-icon mb-3">
                  <i className="fas fa-heart fa-3x" style={{ color: 'var(--secondary-color)' }}></i>
                </div>
                <h4 className="text-white mb-3">Made with Love</h4>
                <p className="text-light">Each bag is carefully crafted with attention to every detail.</p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Home;