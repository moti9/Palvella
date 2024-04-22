import { Container, Row, Col, Button, Image } from 'react-bootstrap';
import { RiCloseCircleFill } from 'react-icons/ri';
import pro1 from "../assets/images/pro1.png";


const Checkout = () => {
    return (
        <>
            <div className="centered-container">
                <h4 style={{ marginLeft: '20px' }}>Items Added</h4>
                <Container>
                    <Row>
                        <Col xs={2}>
                            <div className="image-container">
                                <Image src={pro1} fluid />
                            </div>
                        </Col>
                        <Col xs={6}>
                            <div className="content-container">
                                <div className="content-wrapper">
                                    <div className="content">
                                        <h5>Caption Heading</h5>
                                        <p>This is the paragraph describing the image.</p>
                                        <div className="price-section">
                                            <span>Rs 10.99</span>
                                            <div className="item-quantity">
                                                <span className="item-number"> (10 items)  </span>
                                                <button className="quantity-button">+</button>
                                                <button className="quantity-button">-</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col xs={2}>
                            <div className="cross-button">
                                <RiCloseCircleFill style={{ color: 'black', cursor: 'pointer' }} />
                            </div>
                        </Col>
                        <Col xs={2}>
                            <div className="price-details-container">
                                <div className="price-details-box">
                                    <h3>PRICE DETAILS</h3>
                                    <div>Total Price: ₹1599</div>
                                    <div>Convenience Fee: ₹99</div>
                                    <div>Total Amount: ₹594</div>
                                    <Button variant="dark">PLACE ORDER</Button>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}

export default Checkout;