import { Container, Card, ListGroup, Col } from "react-bootstrap";
import AlertMessage from "../components/AlertMessage";
import { useState } from "react";

const ProductList = () => {
    const [alertMessage, setAlertMessage] = useState(null);
    return (
        <Container>
            {alertMessage && <AlertMessage type={alertMessage.type} message={alertMessage.message} setAlertMessage={setAlertMessage} />}

            <h3>Product list</h3>

            <Col xs={6}>
                <Card className="p-2">
                    <Card.Img variant="top" src="http://www.pngall.com/wp-content/uploads/2016/06/Makeup-Kit-Products-Free-PNG-Image.png" alt="product image" />
                    <Card.Body>
                        <Card.Title>Card Title</Card.Title>
                        <Card.Text>
                            Some quick example text to build on the card title and make up the
                            bulk of the card&apos;s content.
                        </Card.Text>
                    </Card.Body>
                    <ListGroup className="list-group-flush">
                        <ListGroup.Item>Cras justo odio</ListGroup.Item>
                        <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                        <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
                    </ListGroup>
                    <Card.Body>
                        <Card.Link href="#">Card Link</Card.Link>
                        <Card.Link href="#">Another Link</Card.Link>
                    </Card.Body>
                </Card>
            </Col>
        </Container>
    )
}

export default ProductList;