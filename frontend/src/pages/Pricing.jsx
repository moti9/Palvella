import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import '../assets/css/PricingPage.css';

const Pricing = () => {
  return (
    <div>
      {/* Hero Section */}
      <div className="hero-section-pricing text-center text-white">
        <Container>
          <h1 className="display-4">Flexible Pricing for Every Business Size</h1>
          <p className="lead">Find the perfect plan for your business needs</p>
        </Container>
      </div>

      {/* Pricing Section */}
      <Container className="my-5">
        <h1 className="text-center mb-4">Choose Your Plan</h1>
        <Row>
          <Col md={4}>
            <Card className="mb-4 shadow-sm pricing-card">
              <Card.Header className="text-center bg-primary text-white">
                <h4 className="my-0 font-weight-normal">Small Business</h4>
              </Card.Header>
              <Card.Body>
                <h1 className="card-title pricing-card-title">$10 <small className="text-muted">/ mo</small></h1>
                <ul className="list-unstyled mt-3 mb-4">
                  <li><i className="bi bi-check-circle-fill"></i> Manage up to 20 orders/month</li>
                  <li><i className="bi bi-check-circle-fill"></i> Basic customer support</li>
                  <li><i className="bi bi-check-circle-fill"></i> Access to essential marketing tools</li>
                  <li><i className="bi bi-check-circle-fill"></i> Ideal for startups and small shops</li>
                </ul>
                <Button variant="outline-primary" size="lg" block>Sign up</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="mb-4 shadow-sm pricing-card">
              <Card.Header className="text-center bg-success text-white">
                <h4 className="my-0 font-weight-normal">Medium Business</h4>
              </Card.Header>
              <Card.Body>
                <h1 className="card-title pricing-card-title">$30 <small className="text-muted">/ mo</small></h1>
                <ul className="list-unstyled mt-3 mb-4">
                  <li><i className="bi bi-check-circle-fill"></i> Manage up to 100 orders/month</li>
                  <li><i className="bi bi-check-circle-fill"></i> Priority customer support</li>
                  <li><i className="bi bi-check-circle-fill"></i> Advanced marketing tools</li>
                  <li><i className="bi bi-check-circle-fill"></i> Perfect for growing businesses</li>
                </ul>
                <Button variant="success" size="lg" block>Get started</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="mb-4 shadow-sm pricing-card">
              <Card.Header className="text-center bg-warning text-white">
                <h4 className="my-0 font-weight-normal">Large Business</h4>
              </Card.Header>
              <Card.Body>
                <h1 className="card-title pricing-card-title">$60 <small className="text-muted">/ mo</small></h1>
                <ul className="list-unstyled mt-3 mb-4">
                  <li><i className="bi bi-check-circle-fill"></i> Unlimited orders management</li>
                  <li><i className="bi bi-check-circle-fill"></i> Dedicated account manager</li>
                  <li><i className="bi bi-check-circle-fill"></i> Comprehensive marketing suite</li>
                  <li><i className="bi bi-check-circle-fill"></i> Ideal for large enterprises</li>
                </ul>
                <Button variant="warning" size="lg" block>Contact us</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Pricing;
