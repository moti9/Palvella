import { useState } from 'react';
import { Container, Row, Col, Form, Button, Table } from 'react-bootstrap';
import PropTypes from "prop-types";

const DueForm = ({ onSubmit }) => {
  const [amount, setAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(parseFloat(amount));
    setAmount('');
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group as={Row} controlId="formAmountDue">
        <Form.Label column sm={3}>Amount Due:</Form.Label>
        <Col sm={6}>
          <Form.Control
            type="number"
            step="0.01"
            value={amount}
            min={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </Col>
        <Col sm={3}>
          <Button className='btn-sm' type="submit" variant="primary">Pay Now</Button>
        </Col>
      </Form.Group>
    </Form>
  );
};

const PaidDetailsTable = ({ payments }) => {
  return (
    <div className="paid-details">
      <h3>Paid Details</h3>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Date</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment, index) => (
            <tr key={index}>
              <td>{payment.date}</td>
              <td>${payment.amount.toFixed(2)}</td>
              <td>{payment.status}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

const BillPage = () => {
  const [payments, setPayments] = useState([
    { date: 'January 1, 2024', amount: 50.00, status: 'Paid' },
    { date: 'January 15, 2024', amount: 50.00, status: 'Paid' }
  ]);

  const totalPaid = payments.reduce((acc, curr) => acc + curr.amount, 0);

  const handlePayment = (amount) => {
    const newPayment = {
      date: new Date().toLocaleDateString(),
      amount: amount,
      status: 'Paid' // Assuming all payments are marked as paid upon submission
    };
    setPayments([...payments, newPayment]);
  };

  return (
    <Container>
      <h3 className="mb-4">Bill Details</h3>
      <DueForm onSubmit={handlePayment} />
      {totalPaid}
      <PaidDetailsTable payments={payments} />
    </Container>
  );
};

DueForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}

PaidDetailsTable.propTypes = {
  payments: PropTypes.object.isRequired,
}

export default BillPage;
