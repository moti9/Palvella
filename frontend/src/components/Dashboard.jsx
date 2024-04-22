// import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { BsFileText, BsBell, BsGeoAlt, BsPerson, BsHeart, BsMap, BsCreditCard, BsWallet, BsBoxArrowRight } from 'react-icons/bs';
import PropTypes from "prop-types";
import { useSelector } from 'react-redux';

const Dashboard = ({ setShowComponent }) => {
    const username = useSelector((state) => state.palvella.username) || "Guest User";
    return (
        <Container>
            <Row>
                <Col md={9} className="p-4">
                    <div>
                        <p>Hello <strong>{username}</strong></p>
                        <p>From your account dashboard you can view your <a href="/my-account/orders"> recent orders</a>, manage your <a href="/my-account/manage-address">shipping and billing addresses</a>, and <a href="/my-account/profile"> edit your password and account details.</a></p>
                    </div>
                    <Row className="mt-4">
                        <Col md={4} xs={12} className="dashboard-links-container mb-3">
                            <Button variant='light' onClick={() => setShowComponent("orderhistory")} className="p-3 d-block w-100 text-start">
                                <BsFileText className="mb-2" size={30} />
                                <p className="m-0">Orders</p>
                            </Button>
                        </Col>
                        <Col md={4} xs={12} className="dashboard-links-container mb-3">
                            <Button variant='light' href="/my-account/notifications" className="p-3 d-block w-100 text-start">
                                <BsBell className="mb-2" size={30} />
                                <p className="m-0">Notification</p>
                            </Button>
                        </Col>
                        <Col md={4} xs={12} className="dashboard-links-container mb-3">
                            <Button variant='light' onClick={() => setShowComponent("businessaddress")} className="p-3 d-block w-100 text-start">
                                <BsGeoAlt className="mb-2" size={30} />
                                <p className="m-0">Address</p>
                            </Button>
                        </Col>
                        <Col md={4} xs={12} className="dashboard-links-container mb-3">
                            <Button variant='light' href="/my-account/profile" className="p-3 d-block w-100 text-start">
                                <BsPerson className="mb-2" size={30} />
                                <p className="m-0">Account Details</p>
                            </Button>
                        </Col>
                        <Col md={4} xs={12} className="dashboard-links-container mb-3">
                            <Button variant='light' href="/my-account/favorites" className="p-3 d-block w-100 text-start">
                                <BsHeart className="mb-2" size={30} />
                                <p className="m-0">Wishlist</p>
                            </Button>
                        </Col>
                        <Col md={4} xs={12} className="dashboard-links-container mb-3">
                            <Button variant='light' href="/my-account/transactions" className="p-3 d-block w-100 text-start">
                                <BsMap className="mb-2" size={30} />
                                <p className="m-0">Transactions</p>
                            </Button>
                        </Col>
                        <Col md={4} xs={12} className="dashboard-links-container mb-3">
                            <Button variant='light' href="/my-account/refer_and_earn" className="p-3 d-block w-100 text-start">
                                <BsCreditCard className="mb-2" size={30} />
                                <p className="m-0">Refer and earn</p>
                            </Button>
                        </Col>
                        <Col md={4} xs={12} className="dashboard-links-container mb-3">
                            <Button variant='light' href="/my-account/wallet" className="p-3 d-block w-100 text-start">
                                <BsWallet className="mb-2" size={30} />
                                <p className="m-0">Wallet</p>
                            </Button>
                        </Col>
                        <Col md={4} xs={12} className="dashboard-links-container mb-3">
                            <Button variant='light' href="https://eshopweb.store/login/logout" className="p-3 d-block w-100 text-start">
                                <BsBoxArrowRight className="mb-2" size={30} />
                                <p className="m-0">Logout</p>
                            </Button>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
};

Dashboard.propTypes = {
    setShowComponent: PropTypes.func.isRequired,
}

export default Dashboard;
