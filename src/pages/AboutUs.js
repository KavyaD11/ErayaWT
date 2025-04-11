// pages/AboutUs.js
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const AboutUs = () => {
  return (
    <section className="about-section">
      <Container>
        <Row className="align-items-center mb-5">
          <Col lg={6} className="mb-4 mb-lg-0">
            <h2>About Eraya</h2>
            <p>
              Eraya is more than just a bag brand—it's a celebration of stories, emotions, and the little moments that make life meaningful.
               Born from the idea of turning everyday essentials into expressions of individuality,
               we create versatile, handcrafted bags that blend functionality with heartfelt design.
            </p>
            <p>
            At Eraya, we believe that a bag should carry more than just your belongings—it should carry your story.
             Whether it’s a convertible tote-to-backpack that keeps up with your dynamic lifestyle, or a custom-made piece crafted from a cherished saree,
             every Eraya bag is designed to be a part of your journey.
            </p>
            <p>
            Our mission is to create comforting, personalized experiences, making our customers feel seen, valued, and connected.
             Every product we design reflects our commitment to sustainability, sentimentality, and style.
            </p>
          </Col>
          <Col lg={6}>
            <img 
              src="/images/about-us.jpg" 
              alt="Eraya Team" 
              className="about-image"
            />
          </Col>
        </Row>
        
        <Row className="mt-5">
          <Col lg={12} className="mb-4">
            <h2 className="text-center mb-4">Our Mission</h2>
            <p className="text-center">
              To empower individuals to express themselves through personalized, high-quality, and 
              sustainable fashion accessories that they can proudly carry every day.
            </p>
          </Col>
        </Row>
        
        <Row className="mt-5">
          <Col md={4} className="mb-4">
            <div className="value-card text-center">
              <h4 className="mb-3">Quality</h4>
              <p>
                We use only premium materials to ensure that our bags are not just beautiful but durable 
                and long-lasting.
              </p>
            </div>
          </Col>
          <Col md={4} className="mb-4">
            <div className="value-card text-center">
              <h4 className="mb-3">Creativity</h4>
              <p>
                We believe in the power of creativity and self-expression, giving you the freedom to 
                design bags that truly represent you.
              </p>
            </div>
          </Col>
          <Col md={4} className="mb-4">
            <div className="value-card text-center">
              <h4 className="mb-3">Sustainability</h4>
              <p>
                We're committed to sustainable practices, using eco-friendly materials and reducing waste 
                in our production processes.
              </p>
            </div>
          </Col>
        </Row>
        
        <Row className="mt-5">
          <Col lg={12}>
            <h2 className="text-center mb-4">Our Process</h2>
            <div className="process-timeline">
              <div className="process-step">
                <div className="process-icon"></div>
                <h5>Design</h5>
                <p>
                  Use our intuitive design tool to create your own unique bag design.
                </p>
              </div>
              <div className="process-step">
                <div className="process-icon"></div>
                <h5>Craft</h5>
                <p>
                  Our skilled artisans transform your design into a high-quality bag.
                </p>
              </div>
              <div className="process-step">
                <div className="process-icon"></div>
                <h5>Deliver</h5>
                <p>
                  Your custom-made bag is carefully packaged and delivered to your doorstep.
                </p>
              </div>
              <div className="process-step">
                <div className="process-icon"></div>
                <h5>Enjoy</h5>
                <p>
                  Carry your one-of-a-kind bag with pride, knowing it's uniquely yours.
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AboutUs;