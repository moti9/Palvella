import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => (
  <footer className="bg-greyish-dark  py-4">
    <hr />
    <Container>
      <Row>
        <Col md={6}>
          <h5 className="text-Dark">Palvella</h5>
          <p className="text-Dark">
            World&apos;s leading online food and groceries ordering platform
          </p>
        </Col>
        <Col md={3}>
          <h5 className="text-Dark">Quick Links</h5>
          <ul className="list-unstyled">
            <li><a href="/" className="text-Dark">Home</a></li>
            <li><a href="/" className="text-Dark">About</a></li>
            <li><a href="/" className="text-Dark">Services</a></li>
            <li><a href="/" className="text-Dark">Contact</a></li>
          </ul>
        </Col>
        <Col md={3}>
          <h5 className="text-dark">Contact Us</h5>
          <ul className="list-unstyled">
            <li className="text-dark">123 Street Name, City</li>
            <li className="text-dark">info@example.com</li>
            <li className="text-dark">+123 456 7890</li>
          </ul>
        </Col>
      </Row>
      <Row>
        <Col>
          <p className="text-center text-bg-white">&copy; 2024 Your Website. All rights reserved.</p>
        </Col>
      </Row>
    </Container>
  </footer>
);

export default Footer;
