// import { MapContainer, TileLayer, Marker, Popup } from 'react-bootstrap';
import { Card, Col, Button } from 'react-bootstrap';
import PropTypes from "prop-types";
import "../assets/css/Composed.styles.css";

const BusinessDetail = ({ data }) => {
    // Extracting data
    const {
        id,
        user,
        name,
        category,
        service_available_at,
        description,
        alt_contact_number,
        alt_email,
        created_at,
        updated_at,
    } = data;

    return (
        <div>
            <Card>
                <Card.Body className='shadow'>
                    <Card.Header className='my-2'>
                        <h2>{name}</h2>
                    </Card.Header>
                    <Card.Subtitle><strong>Business Id: </strong>{id}</Card.Subtitle>
                    <Card.Subtitle><strong>Business Account id: </strong>{user}</Card.Subtitle>
                    <Card.Subtitle><strong>Business category: </strong>{category}</Card.Subtitle>
                    <Card.Text><strong>Alt Contact Number:</strong> {alt_contact_number}</Card.Text>
                    <Card.Text><strong>Alt Email:</strong> {alt_email}</Card.Text>
                    <Card.Text><strong>Joining data:</strong> {created_at}</Card.Text>
                    <Card.Text><strong>Account details last updated at:</strong> {updated_at}</Card.Text>
                    <Col>
                        <p><strong>Service available at</strong></p>
                        {service_available_at.map((pin) => (
                            <Button
                                key={pin['postal_code']}
                                variant="primary"
                                className="me-2 mt-2 p-2"
                            >
                                {pin['postal_code']}
                            </Button>
                        ))}
                    </Col>
                    <div className='my-2'>
                        <pre>{description}</pre>
                    </div>
                </Card.Body>
            </Card>
        </div>
    );
};

BusinessDetail.propTypes = {
    data: PropTypes.object.isRequired,
}

export default BusinessDetail;
