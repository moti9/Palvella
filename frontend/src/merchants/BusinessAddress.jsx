import { useEffect, useState } from 'react';
import { Form, Button, Card, Container } from 'react-bootstrap';
import AlertMessage from '../components/AlertMessage';
import BusinessAPI from '../services/BusinessAPI';
import AddressList from '../components/AddressList';

const BusinessAddress = () => {
    const [formData, setFormData] = useState({
        address_line1: '',
        address_line2: '',
        city: '',
        state: '',
        postal_code: '',
        country: 'India',
    });
    const [alertMessage, setAlertMessage] = useState(null);
    const [addresses, setAddresses] = useState(null);

    const handleReset = () => {
        setFormData({
            address_line1: '',
            address_line2: '',
            city: '',
            state: '',
            postal_code: '',
            country: '',
        });
    }

    const handleChange = e => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await BusinessAPI.addBusinessAddress(formData);
            console.log(response.status);
            handleReset();
            setAlertMessage({ type: "success", message: "Your business address added successfully." });
        } catch (error) {
            setAlertMessage({ type: "danger", message: `Error: ${error.message}` });
        }
    };

    const handleGetAddresses = async () => {
        try {
            const response = await BusinessAPI.getBusinessAddress();
            setAddresses(response);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        handleGetAddresses();
    }, []);

    return (
        <Container>
            {alertMessage && <AlertMessage type={alertMessage.type} message={alertMessage.message} setAlertMessage={setAlertMessage} />}
            <h3>Add Business Address</h3>
            <Card className='shadow rounded'>
                <Card.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="address_line1">
                            <Form.Label>Address Line 1</Form.Label>
                            <Form.Control
                                type="text"
                                name="address_line1"
                                value={formData.address_line1}
                                onChange={handleChange}
                                placeholder='address line 1'
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="address_line2">
                            <Form.Label>Address Line 2</Form.Label>
                            <Form.Control
                                type="text"
                                name="address_line2"
                                value={formData.address_line2}
                                onChange={handleChange}
                                placeholder='address line 2'
                            />
                        </Form.Group>

                        <Form.Group controlId="city">
                            <Form.Label>City</Form.Label>
                            <Form.Control
                                type="text"
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                                placeholder='city like Bhagalpur'
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="state">
                            <Form.Label>State</Form.Label>
                            <Form.Control
                                type="text"
                                name="state"
                                value={formData.state}
                                onChange={handleChange}
                                placeholder='state like Bihar'
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="postal_code">
                            <Form.Label>Postal Code</Form.Label>
                            <Form.Control
                                type="text"
                                name="postal_code"
                                value={formData.postal_code}
                                onChange={handleChange}
                                placeholder='pin code like 813204'
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="country">
                            <Form.Label>Country</Form.Label>
                            <Form.Control
                                type="text"
                                name="country"
                                value={formData.country}
                                onChange={handleChange}
                                placeholder='Our beloved country Bharat'
                                required
                            />
                        </Form.Group>

                        <div className="my-2">
                            <Button className='btn-sm me-2' variant="primary" type="submit">
                                Submit
                            </Button>
                            <Button className='btn-sm me-2' variant="danger" type="reset" onClick={handleReset}>
                                Clear
                            </Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
            {(addresses && addresses.length > 0) ? (<AddressList addresses={addresses} />) : (null)}
        </Container>
    );
}

export default BusinessAddress;
