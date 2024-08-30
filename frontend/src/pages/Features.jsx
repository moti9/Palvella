import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import '../assets/css/FeaturesPage.css';

const Features = () => {
  return (
    <div>
      {/* Hero Section */}
      <div className="hero-section-features text-center text-white">
        <Container>
          <h1 className="display-4">Powerful Features to Boost Your Business</h1>
          <p className="lead">Discover what makes Palvella the best choice for your business</p>
        </Container>
      </div>

      {/* Features Section */}
      <Container className="my-5">
        <h2 className="text-center mb-4">Key Features</h2>
        <Row>
          <Col md={4}>
            <Card className="mb-4 shadow-sm feature-card">
              <Card.Header className="text-center bg-primary text-white">
                <h4 className="my-0 font-weight-normal">Order Management</h4>
              </Card.Header>
              <Card.Body>
                <ul className="list-unstyled mt-3 mb-4">
                  <li>Efficient order processing</li>
                  <li>Customizable order status</li>
                  <li>Order tracking for customers</li>
                  <li>Order history and analytics</li>
                </ul>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="mb-4 shadow-sm feature-card">
              <Card.Header className="text-center bg-success text-white">
                <h4 className="my-0 font-weight-normal">Inventory Management</h4>
              </Card.Header>
              <Card.Body>
                <ul className="list-unstyled mt-3 mb-4">
                  <li>Track inventory levels in real-time</li>
                  <li>Automated low stock alerts</li>
                  <li>Manage suppliers and purchase orders</li>
                  <li>Inventory reports and insights</li>
                </ul>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="mb-4 shadow-sm feature-card">
              <Card.Header className="text-center bg-warning text-white">
                <h4 className="my-0 font-weight-normal">Customer Management</h4>
              </Card.Header>
              <Card.Body>
                <ul className="list-unstyled mt-3 mb-4">
                  <li>Customer profiles and preferences</li>
                  <li>Order history and tracking</li>
                  <li>Personalized promotions and offers</li>
                  <li>Feedback and review management</li>
                </ul>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Features;
