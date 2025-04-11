// pages/Blogs.js
import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Blogs = () => {
  // Blog posts data
  const blogPosts = [
    {
      id: 1,
      title: "5 Creative Ways to Customize Your Tote Bag",
      excerpt: "Discover unique and creative ways to personalize your tote bags with our simple yet effective tips.",
      image: "/images/blog-1.jpg",
      date: "March 25, 2025",
      author: "Priya Sharma"
    },
    {
      id: 2,
      title: "The History of Tote Bags: From Utility to Fashion Statement",
      excerpt: "Explore the fascinating evolution of tote bags from practical carriers to fashion accessories.",
      image: "/images/blog-2.jpg",
      date: "March 15, 2025",
      author: "Aditya Mehta"
    },
    {
      id: 3,
      title: "Sustainable Fashion: Why Custom Bags Are Eco-Friendly",
      excerpt: "Learn how customized bags contribute to a more sustainable fashion industry and reduce waste.",
      image: "/images/blog-3.jpg",
      date: "March 5, 2025",
      author: "Neha Patel"
    },
    {
      id: 4,
      title: "Design Inspiration: Color Combinations for Your Custom Bag",
      excerpt: "Find the perfect color palette for your next custom bag design with these expert tips.",
      image: "/images/blog-4.jpg",
      date: "February 25, 2025",
      author: "Aryan Kapoor"
    },
    {
      id: 5,
      title: "How to Care for Your Custom Printed Bags",
      excerpt: "Ensure your custom bags stay looking fresh with these simple care and maintenance tips.",
      image: "/images/blog-5.jpg",
      date: "February 15, 2025",
      author: "Ritu Desai"
    },
    {
      id: 6,
      title: "From Concept to Creation: The Art of Bag Design",
      excerpt: "Go behind the scenes and discover the creative process of designing and crafting custom bags.",
      image: "/images/blog-6.jpg",
      date: "February 5, 2025",
      author: "Vikram Malhotra"
    }
  ];

  return (
    <section className="blog-section">
      <Container>
        <h1 className="section-title">Eraya Blog</h1>
        <p className="section-subtitle">Discover tips, trends, and stories about custom bags and personal style</p>
        
        <Row className="mt-5">
          {blogPosts.map(post => (
            <Col lg={4} md={6} className="mb-4" key={post.id}>
              <Card className="blog-card">
                <Card.Img variant="top" src={post.image} className="blog-image" />
                <Card.Body className="blog-content">
                  <Card.Title className="blog-title">{post.title}</Card.Title>
                  <Card.Text className="blog-excerpt">{post.excerpt}</Card.Text>
                  <div className="blog-meta">
                    <span>{post.date}</span> • <span>{post.author}</span>
                  </div>
                  <Button as={Link} to={`/blog/${post.id}`} className="btn-outline mt-3">Read More</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
        
        <div className="text-center mt-4">
          <Button as={Link} to="/blogs" className="btn-primary">Load More</Button>
        </div>
      </Container>
    </section>
  );
};

export default Blogs;