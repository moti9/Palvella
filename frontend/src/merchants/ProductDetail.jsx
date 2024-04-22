import Shopimg1 from "../assets/images/Shopimg1.jpg";
import styles from '../assets/css/Aboutshop.module.css';
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import pro1 from "../assets/images/pro1.png" 

const ProductDetail = () => {
    return (
        <>
            <div className={styles["about-shop-container"]}>
                <div className={styles["shop-info"]}>
                    <hr className={styles["bold-hr"]} />
                    <h1>Starbucks Coffee</h1>
                    <h6 className={styles["red-text"]}>Beverages, Cafe</h6>
                    <p>Discover your favorite coffee moments at our Starbucks Coffee shop. Conveniently located in [Location], we&apos;re your go-to destination for exceptional coffee experiences. From expertly brewed beverages to cozy surroundings, we invite you to indulge in the warmth and comfort of our café. Join us for a sip and a smile today!</p>
                </div>
                <div className={styles["image-container"]}>
                    <div className={styles["image-wrapper"]}>
                        <img src={Shopimg1} alt="Shop" />
                    </div>
                </div>
            </div>
            <hr className={styles["bold-hr"]} />
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


                                <Button variant="dark" style={{ width: '80px', marginTop: '10px' }}>BUY</Button>
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
    )
}

export default ProductDetail;