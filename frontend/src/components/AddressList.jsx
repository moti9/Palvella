import { Container, Row, Col, Card } from 'react-bootstrap';
import PropTypes from "prop-types";


const AddressList = ({ addresses }) => {
    // console.log(addresses);
    return (
        <Container className='my-3'>
            {(addresses && addresses.length > 0) ? (
                <Row>
                    <Col>
                        <h3 className="text-center my-3">Address List</h3>
                        {addresses.map(address => (
                            <Card key={address.id} className="shadow-sm mb-3">
                                <Card.Body>
                                    {/* <Card.Title className="mb-3">Address {address.id}</Card.Title> */}
                                    <div>
                                        <p className="mb-1"><strong>Address:</strong></p>
                                        <p className="mb-1">{address.address_line1}</p>
                                        {address.address_line2 && <p className="mb-1">{address.address_line2}</p>}
                                        <p className="mb-1">{address.city}, {address.state}, {address.postal_code}</p>
                                        <p className="mb-0">{address.country}</p>
                                    </div>
                                </Card.Body>
                            </Card>
                        ))}
                    </Col>
                </Row>
            ) : (
                <h3 className="text-center my-3">Address List</h3>
            )}
        </Container>
    )
}

AddressList.propTypes = {
    addresses: PropTypes.object.isRequired,
}

export default AddressList;