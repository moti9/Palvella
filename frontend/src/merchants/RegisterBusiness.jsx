import { useState, useEffect } from 'react';
import { Form, Button, Card, Row, Col, Container } from 'react-bootstrap';
import AlertMessage from "../components/AlertMessage";
import BusinessAPI from "../services/BusinessAPI";
import BusinessDetail from './BusinessDetail';

const RegisterBusiness = () => {
  const [formData, setFormData] = useState({
    name: '',
    category: 'shop',
    alt_contact_number: '',
    alt_email: '',
    gstin: '',
    description: '',
    service_available_at: null
  });
  const [pinCodes, setPinCodes] = useState([]);
  const [currentPin, setCurrentPin] = useState('');
  const [alertMessage, setAlertMessage] = useState(null);

  const [business, setBusiness] = useState(null);

  const getBusineeDetail = async () => {
    try {
      const response = await BusinessAPI.getBusinessDetails();
      setBusiness(response);
      setAlertMessage({ type: "success", message: "Thankyou for your collaboration with us." });
    } catch (error) {
      // setAlertMessage({ type: "primary", message: "Please register your business." });
      console.log(error.message);
    }
  }

  useEffect(() => {
    getBusineeDetail();
    // console.log(business);
  }, [])

  const handleInputChange = (event) => {
    setCurrentPin(event.target.value.replace(/\D/, '')); // Allow only digits
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevent form submission
      if (currentPin.length === 6) {
        addPinCode(currentPin);
        setCurrentPin('');
      }
    }
  };

  const addPinCode = (pin) => {
    if (pinCodes.includes(pin)) return; // Avoid duplicate PINs
    setPinCodes([...pinCodes, pin]);
  };

  const removePinCode = (pin) => {
    setPinCodes(pinCodes.filter((code) => code !== pin));
  };


  const handleReset = () => {
    setFormData({
      name: '',
      category: 'shop',
      alt_contact_number: '',
      alt_email: '',
      gstin: '',
      description: '',
    });
    setCurrentPin('');
    setPinCodes([]);
  }

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleBusinessDescriptionGeneration = async (e) => {
    e.preventDefault();
    // onSubmit(formData);

    if (formData.name.length < 6) {
      setAlertMessage({ type: "error", message: "Please enter the business name." });
      return;
    }
    if (formData.gstin.length !== 15) {
      setAlertMessage({ type: "error", message: "Please enter the valid GSTIN." });
      return;
    }

    if (pinCodes.length == 0) {
      setAlertMessage({ type: "error", message: "Please enter the service zip code." });
      return;
    }
    const business = {
      'name': formData.name,
      'gstin': formData.gstin,
      'category': formData.category,
      'service_available_at': pinCodes
    }
    try {
      const response = await BusinessAPI.generateBusinessDescription(business);
      // console.log(response);
      setAlertMessage({ type: "success", message: "Your business's description has been generated." });
      formData.description = response.content;
    } catch (error) {
      setAlertMessage({ type: "error", message: "Sorry!!, we're unable to complete your request." });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // onSubmit(formData);

    if (pinCodes.length == 0) {
      setAlertMessage({ type: "error", message: "Please enter the service zip code." });
      return;
    }
    formData.service_available_at = pinCodes;

    try {
      const response = await BusinessAPI.businessRegister(formData);
      console.log(response);
      new Promise((resolve) => setTimeout(resolve, 3000));
      handleReset();
      setAlertMessage({ type: "success", message: "Your business has been registered" });
    } catch (error) {
      setAlertMessage({ type: "error", message: "Oops!!, some error occured, please try again" });
    }
  };

  return (
    <Container>
      {alertMessage && <AlertMessage type={alertMessage.type} message={alertMessage.message} setAlertMessage={setAlertMessage} />}
      <h3 className='mb-2'>Register your business</h3>
      <Card className='shadow rounded'>
        {business ? (<BusinessDetail data={business} />) : (
          <Card.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder='Enter your business name'
                  required
                />
              </Form.Group>

              <Form.Group controlId="category">
                <Form.Label>Category</Form.Label>
                <Form.Control
                  as="select"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                >
                  <option value="shop">Shop</option>
                  <option value="restaurant">Restaurant</option>
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="gstin">
                <Form.Label>GSTIN</Form.Label>
                <Form.Control
                  type="text"
                  name="gstin"
                  value={formData.gstin}
                  onChange={handleChange}
                  placeholder='GSTIN20240001'
                  required
                />
              </Form.Group>

              <Form.Group controlId="alt_contact_number">
                <Form.Label>Alternate contact number</Form.Label>
                <Form.Control
                  type="text"
                  name="alt_contact_number"
                  value={formData.alt_contact_number}
                  onChange={handleChange}
                  placeholder='9876543210'
                />
              </Form.Group>

              <Form.Group controlId="alt_email">
                <Form.Label>Alternate email</Form.Label>
                <Form.Control
                  type="email"
                  name="alt_email"
                  value={formData.alt_email}
                  onChange={handleChange}
                  placeholder='business.example@gmail.com'
                />
              </Form.Group>

              <div className="my-2 mb-3">
                <Row>
                  <Col>
                    <Form.Label>Service  available at</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter 6-digit PIN code like 813204"
                      value={currentPin}
                      onChange={handleInputChange}
                      onKeyPress={handleKeyPress}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    {pinCodes.map((pin) => (
                      <Button
                        key={pin}
                        variant="secondary"
                        className="me-2 mt-2 btn-sm rounded"
                        onClick={() => removePinCode(pin)}
                      >
                        {pin} <span aria-hidden="true">&times;</span>
                      </Button>
                    ))}
                  </Col>
                </Row>
              </div>

              <Form.Group controlId="description" className="position-relative">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={5}
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder='description of our business'
                />
                <Button variant="success" className="btn-sm position-absolute bottom-0 end-0 mb-3 me-3" onClick={handleBusinessDescriptionGeneration}>Generate</Button>
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
        )}
        <Card.Footer className='text-bg-info'>
          <blockquote className='blockquote mb-1'>
            <p><strong>Note:</strong> You can only add single business with a account.</p>
            <footer className='blockquote-footer'>
              <cite title='Admin message'>Admin</cite>
            </footer>
          </blockquote>
        </Card.Footer>
      </Card >
    </Container>
  );
}

export default RegisterBusiness;