import React from 'react';
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import pro1 from "../assets/images/pro1.png" 

const Menu = () =>(
    <>
      <div className="centered-container">
        <h2 style={{ marginLeft: '20px' }}>Items</h2>
        <Container>
          <Row>
            <Col xs={8}>
              <div className="content-container">
                <h5>Caption Heading</h5>
                <p>This is the paragraph describing the image.</p>
                <div className="price-section">
                  <span>Rs 10.99</span>
                  <div className="item-quantity">
                    <span className="item-number"> (10 items) </span>
                    <button className="quantity-button">+</button>
                    <button className="quantity-button">-</button>
                  </div>
                </div>

                
                <Button variant="dark" style={{ width: '80px',marginTop:'10px' }}>BUY</Button>
              </div>
            </Col>
            <Col xs={2}>
              <div className="image-container">
                <Image src={pro1} fluid />
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );


export default Menu;
