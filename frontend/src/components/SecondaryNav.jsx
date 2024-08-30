
import { Container, InputGroup, Form, Button, Col, Row } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { Link } from "react-router-dom";
import { ROUTES } from "../config";

const SecondaryNav = () => {

    return (
        <Container className="py-4">
            <Row className="d-flex justify-content-center align-items-center flex-wrap">
                <Col>
                    <Row className="d-flex justify-content-center align-items-center flex-wrap">
                        <Col className="my-2">
                            <Link to={ROUTES.BUSINESSHOME}><Button variant="dark" size="sm">Business</Button></Link>
                        </Col>
                        <Col className="my-2">
                            <Link to={ROUTES.PRODUCTHOME}>  <Button variant="dark" size="sm">Products</Button></Link>
                        </Col>
                        <Col className="my-2">
                            <Link to={ROUTES.MERCHANTHOME}> <Button variant="dark" size="sm">Merchants</Button></Link>
                        </Col>
                    </Row>
                </Col>
                <Col xs={8} className="my-2">
                    <InputGroup className="mb-3">
                        <Form.Control
                            placeholder="Search groceries, foods, products...."
                            aria-label="search-product"
                            aria-describedby="search button"
                        />
                        <InputGroup.Text>
                            <Button size="sm" variant="btn-link"><ImCross /></Button>
                        </InputGroup.Text>
                        <InputGroup.Text>
                            <Button size="sm" variant="btn-link"><FaSearch /></Button>
                        </InputGroup.Text>
                    </InputGroup>
                </Col>
            </Row>
        </Container >
    );
}

export default SecondaryNav;
