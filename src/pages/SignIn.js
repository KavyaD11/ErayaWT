import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // Basic validation
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    
    try {
      setLoading(true);
      // Here you would add your authentication logic
      // For example: await signInWithEmailAndPassword(email, password);
      
      // For demo purposes, we'll just simulate a delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Redirect to home page after successful login
      // history.push('/'); // If using React Router v5
      // navigate('/'); // If using React Router v6
      console.log('Sign in successful');
    } catch (err) {
      setError('Failed to sign in. Please check your credentials.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="signin-section">
      <Container>
        <Row className="justify-content-center">
          <Col md={6} lg={5}>
            <div className="signin-card">
              <div className="text-center mb-4">
                <img 
                  src="/images/logo.png" 
                  alt="ERAYA Logo" 
                  height="60" 
                  className="mb-3"
                />
                <h2 className="signin-title">Welcome Back</h2>
                <p className="signin-subtitle">Sign in to your account</p>
              </div>
              
              {error && <Alert variant="danger">{error}</Alert>}
              
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control 
                    type="email" 
                    placeholder="Enter your email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control 
                    type="password" 
                    placeholder="Enter your password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>
                
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <Form.Check 
                    type="checkbox" 
                    label="Remember me" 
                    id="remember-me"
                  />
                  <Link to="/forgot-password" className="forgot-password">
                    Forgot Password?
                  </Link>
                </div>
                
                <Button 
                  type="submit" 
                  className="btn-primary w-100" 
                  disabled={loading}
                >
                  {loading ? 'Signing in...' : 'Sign In'}
                </Button>
                
                <div className="text-center mt-4">
                  <p className="signup-text">
                    Don't have an account? <Link to="/signup" className="signup-link">Sign Up</Link>
                  </p>
                </div>
              </Form>
              
              <div className="social-signin">
                <p className="or-divider">
                  <span>Or sign in with</span>
                </p>
                
                <div className="d-flex justify-content-center gap-3">
                  <Button variant="outline-light" className="social-btn">
                    <i className="fab fa-google"></i>
                  </Button>
                  <Button variant="outline-light" className="social-btn">
                    <i className="fab fa-facebook-f"></i>
                  </Button>
                  <Button variant="outline-light" className="social-btn">
                    <i className="fab fa-apple"></i>
                  </Button>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default SignIn;