import { Container, Row, Col } from 'react-bootstrap';
import { MdEmail, MdLocalPhone } from 'react-icons/md';
import { FaFacebookF, FaTwitter, FaInstagram, FaQuestionCircle } from 'react-icons/fa';
import { FaLocationDot } from "react-icons/fa6";
import { AiFillHome, AiFillInfoCircle, AiFillCustomerService, AiFillMail } from 'react-icons/ai';

const Footer = () => (
  <footer className="bg-greyish-dark py-4">
    <hr />
    <Container>
      <Row className="justify-content-between">
        <Col md={6}>
          <h5 className="text-dark">Palvella</h5>
          <p className="text-dark">
            Palvella offers a seamless bridge between you and your favorite foods and grocery essentials. As a pioneer in the digital ordering space, we connect millions with their choice of restaurants and supermarkets effortlessly. Experience the convenience of reliable delivery right at your doorstep, coupled with exceptional customer care and unmatched reliability.
          </p>
        </Col>
        <Col md={3}>
          <h5 className="text-dark">Quick Links</h5>
          <ul className="list-unstyled">
            <li><a href="/" className="nav-links text-dark"><AiFillHome className="me-2" /> Home</a></li>
            <li><a href="/" className="nav-links text-dark"><AiFillInfoCircle className="me-2" /> About</a></li>
            <li><a href="/" className="nav-links text-dark"><AiFillCustomerService className="me-2" /> Services</a></li>
            <li><a href="/" className="nav-links text-dark"><AiFillMail className="me-2" /> Contact</a></li>
            <li><a href="/" className="nav-links text-dark"><FaQuestionCircle className="me-2" /> FAQ</a></li>
          </ul>
        </Col>
        <Col md={3}>
          <h5 className="text-dark">Contact Us</h5>
          <ul className="list-unstyled">
            <li className="text-dark mb-2"><FaLocationDot className="me-2" />123 Street Name, City</li>
            <li className="mb-2"><MdLocalPhone className="me-2" /> <a href="tel:+1234567890" className="text-dark">+123 456 7890</a></li>
            <li className="mb-2"><MdEmail className="me-2" /> <a href="mailto:info@example.com" className="text-dark">info@example.com</a></li>
            <li className="mb-2">
              <FaFacebookF className="me-2" />
              <FaTwitter className="me-2" />
              <FaInstagram />
            </li>
          </ul>
        </Col>
      </Row>
      <hr className="mt-4 mb-3" />
      <Row>
        <Col>
          <p className="text-center">&copy; 2024 Palvella. All rights reserved.</p>
        </Col>
      </Row>
    </Container>
  </footer>
);

export default Footer;
