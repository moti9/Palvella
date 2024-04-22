import { useEffect, useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import AlertMessage from "../components/AlertMessage";
import MerchantAPI from '../services/BusinessAPI';
import { useSelector } from 'react-redux';

const BusinessAccountRegister = () => {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        username: '',
        email: '',
        password: '',
        confirm_password: '',
        contact_number: ''
    });
    const [alertMessage, setAlertMessage] = useState(null);
    const isAuthenticated = useSelector((state) => state.palvella.isAuthenticated);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleReset = () => {
        setFormData({
            first_name: '',
            last_name: '',
            username: '',
            email: '',
            password: '',
            confirm_password: '',
            contact_number: ''
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirm_password) {
            setAlertMessage({ type: 'error', message: "Password and Confirm Password should be same." });
            return;
        }

        try {
            await MerchantAPI.businessAccountSignup(formData);
            new Promise((resolve) => setTimeout(resolve, 2000));
            handleReset();
            setAlertMessage({ type: "success", message: "Account created successfully." });
        } catch (error) {
            // console.log(error.message);
            setAlertMessage({ type: "error", message: "Oops!!, some error occured please try again." });
        }
    };

    useEffect(() => {
        if (isAuthenticated) {
            window.location.href = "/m";
        }
    }, [isAuthenticated]);

    return (
        <Container>
            <h3 className="mb-4">Register Business Account</h3>
            {alertMessage && <AlertMessage type={alertMessage.type} message={alertMessage.message} setAlertMessage={setAlertMessage} />}
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="firstName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="text" name="first_name" value={formData.first_name} onChange={handleChange} autoComplete='first_name' placeholder='Enter first name' required />
                </Form.Group>
                <Form.Group controlId="lastName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="text" name="last_name" value={formData.last_name} onChange={handleChange} autoComplete='last_name' placeholder='Enter last name' required />
                </Form.Group>
                <Form.Group controlId="username">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" name="username" minLength={5} value={formData.username} onChange={handleChange} autoComplete='username' placeholder='Enter username' required />
                </Form.Group>
                <Form.Group controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} autoComplete='email' placeholder='Enter email address' required />
                </Form.Group>
                <Form.Group controlId="contactNumber">
                    <Form.Label>Contact Number</Form.Label>
                    <Form.Control type="number" minLength={10} maxLength={10} name="contact_number" value={formData.contact_number} autoComplete='contact_number' placeholder='Enter active contact number' onChange={handleChange} />
                </Form.Group>
                <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" minLength={6} name="password" value={formData.password} onChange={handleChange} autoComplete='password' placeholder='Enter password' required />
                </Form.Group>
                <Form.Group controlId="confirm_password">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" minLength={6} name="confirm_password" value={formData.confirm_password} onChange={handleChange} autoComplete='confirm_password' placeholder='Enter confirm password' required />
                </Form.Group>
                <div className="my-3">
                    <Button variant="primary" className='btn-sm me-2' type="submit">Register</Button>
                    <Button variant="danger" className='btn-sm me-2' type="reset" onClick={handleReset}>Clear</Button>
                </div>
            </Form>
        </Container>
    );
};

export default BusinessAccountRegister;
