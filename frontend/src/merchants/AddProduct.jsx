import { useState } from 'react';
import { Form, Col, Row, Container } from 'react-bootstrap';
import ShopProduct from './ShopProduct';
import RestaurantProduct from './RestaurantProduct';

const AddProduct = () => {
    const [businessType, setBusinessType] = useState("");

    return (
        <>
            <Container>
                <Row>
                    <Col>
                        {/* Product Type */}
                        <Form.Group controlId="type">
                            <Form.Label>Business type</Form.Label>
                            <Form.Control as="select" name="type" value={businessType} onChange={(e) => setBusinessType(e.target.value)} required>
                                <option value="">Select type</option>
                                <option value="shop">Shop</option>
                                <option value="restaurant">Restaurant</option>
                            </Form.Control>
                        </Form.Group>
                    </Col>
                </Row>
            </Container>
            {businessType === "shop" && (<ShopProduct />)}
            {businessType === "restaurant" && (<RestaurantProduct />)}
        </>
    );
};

export default AddProduct;

