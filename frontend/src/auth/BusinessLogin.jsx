import { useState, useEffect } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import AlertMessage from '../components/AlertMessage';
import { useDispatch, useSelector } from 'react-redux';
import { loginBusiness } from '../slices/authSlice';

const BusinessLogin = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const isAuthenticated = useSelector((state) => state.palvella.isAuthenticated);
    const [alertMessage, setAlertMessage] = useState(null);
    const dispatch = useDispatch();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleReset = () => {
        setFormData({
            email: '',
            password: ''
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        try {
            dispatch(loginBusiness(formData));
            new Promise((resolve) => setTimeout(resolve, 5000));
            if (isAuthenticated) {
                setAlertMessage({ type: "success", message: "Welcome to your dashboard." });
                handleReset(); // Reset the form after successful login
            }
            // else {
            //     // throw new Error("Please enter correct credential.");
            //     setAlertMessage({ type: "error", message: "Oops, please enter correct credentials." });
            // }
        } catch (error) {
            setAlertMessage({ type: "error", message: "Oops, please enter correct credentials." });
        }
    };

    useEffect(() => {
        if (isAuthenticated) {
            setAlertMessage({ type: "primary", message: "You're already loggedin." });
            window.location.href = "/b";
        }
    }, [isAuthenticated]);

    return (
        <Container>
            <h3 className="mb-4">Business Login</h3>
            {alertMessage && <AlertMessage type={alertMessage.type} message={alertMessage.message} setAlertMessage={setAlertMessage} />}
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" name='email' value={formData.email} onChange={handleChange} autoComplete='email' required />
                    <Form.Text className="text-muted">We&apos;ll never share your email with anyone else.</Form.Text>
                </Form.Group>

                <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" name='password' value={formData.password} onChange={handleChange} autoComplete='password' required />
                </Form.Group>
                <div className="my-3">
                    <Button variant="primary" className='btn-sm me-2' type="submit">Submit</Button>
                    <Button variant="danger" className='btn-sm me-2' type="reset" onClick={handleReset}>Clear</Button>
                </div>
            </Form>
        </Container>
    );
};

export default BusinessLogin;
