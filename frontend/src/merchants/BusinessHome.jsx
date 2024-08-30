import { useEffect, useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { FaBars, FaHome, FaShoppingCart, FaChartLine, FaSignOutAlt, FaUserPlus, FaBox, FaComment, FaPlusCircle, FaUpload, FaInfoCircle, FaLocationArrow, FaMoneyBill } from 'react-icons/fa';
import brand from "../assets/images/brand.png";
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Dashboard from '../components/Dashboard';
import AddProduct from './AddProduct';
import "../assets/css/Sidebar.css";
import BusinessLogin from '../auth/BusinessLogin';
import BusinessAccountRegister from '../auth/BusinessAccountRegister';
import UploadDocs from './UploadDocs';
// import BusinessDetail from "./BusinessDetail";
import BusinessAddress from './BusinessAddress';
import BillPage from './BillPage';
import { useDispatch } from 'react-redux';
import { logoutBusiness } from '../slices/authSlice';
import RegisterBusiness from './RegisterBusiness';
import AccountDetail from './AccountDetail';
import ProductList from './ProductList';
import OrderHistory from './OrderHistory';
import HandleOrders from '../components/HandleOrders';

const BusinessHome = () => {
    const [showSidebar, setShowSidebar] = useState(true);
    const isAuthenticated = useSelector((state) => state.palvella.isAuthenticated);
    const [showComponent, setShowComponent] = useState("dashboard");

    const dispatch = useDispatch();

    const renderComponent = () => {
        switch (showComponent) {
            case "dashboard": return <Dashboard setShowComponent={setShowComponent} />;
            case "addproduct": return <AddProduct />;
            case "productlist": return <ProductList />
            case "orderhistory": return <OrderHistory />
            case "businessregister": return <RegisterBusiness />
            case "businessaddress": return <BusinessAddress />
            case "billpage": return <BillPage />
            case "login": return <BusinessLogin />
            case "register": return <BusinessAccountRegister />
            case "uploaddocs": return <UploadDocs />
            case "accountdetails": return <AccountDetail />
            case "handleorders": return <HandleOrders />

            default:
                return null;
        }
    };

    const handleBusinessLogout = () => {
        try {
            dispatch(logoutBusiness());
        } catch (error) {
            console.error('logout error:', error.message);
        }
    }

    useEffect(() => {
        if (!isAuthenticated && showComponent !== "register") {
            setShowComponent("login");
        }
    }, [isAuthenticated, showComponent])

    return (
        <Container>
            <Row className="mb-3 pt-2">
                <Col xs={12} className="d-md-none text-end">
                    <Button variant="light" onClick={() => setShowSidebar(!showSidebar)}>
                        <FaBars />
                    </Button>
                </Col>
            </Row>
            <Row>
                <Col xs={12} md={3} className={`sidebar ${showSidebar ? 'show' : 'hide'}`}>
                    <div className="scroll-sidebar">
                        <div className="brand-logo text-center p-4">
                            <Link to="/" className="text-nowrap logo-img">
                                <img src={brand} alt="Palvella" width="120" />
                            </Link>
                        </div>
                    </div>
                    <nav className="sidebar-nav">
                        <ul className="list-unstyled" id="sidebarnav">
                            <li className="nav-item my-2">
                                <span className="text-center">PAGES</span>
                            </li>
                            <li className={`sidebar-item my-1`}>
                                <Button variant={`${showComponent === "dashboard" ? 'active' : 'link'}`} className="sidebar-link" onClick={() => setShowComponent("dashboard")}>
                                    <FaHome className="mx-2" />
                                    <span className="">Dashboard</span>
                                </Button>
                            </li>
                            <li className={`sidebar-item my-1`}>
                                <Button variant={`${showComponent === "addproduct" ? 'active' : 'link'}`} className="sidebar-link" onClick={() => setShowComponent("addproduct")}>
                                    <FaPlusCircle className="mx-2" />
                                    <span className="">Add Product</span>
                                </Button>
                            </li>
                            <li className={`sidebar-item my-1`}>
                                <Button variant={`${showComponent === "handleorders" ? 'active' : 'link'}`} className="sidebar-link" onClick={() => setShowComponent("handleorders")}>
                                    <FaShoppingCart className="mx-2" />
                                    <span className="">Handle Orders</span>
                                </Button>
                            </li>
                            <li className={`sidebar-item my-1`}>
                                <Button variant={`${showComponent === "chats" ? 'active' : 'link'}`} className="sidebar-link" onClick={() => setShowComponent("chats")}>
                                    <FaComment className="mx-2" />
                                    <span className="">Chats</span>
                                </Button>
                            </li>
                            <li className={`sidebar-item my-1`}>
                                <Button variant={`${showComponent === "productlist" ? 'active' : 'link'}`} className="sidebar-link" onClick={() => setShowComponent("productlist")}>
                                    <FaBox className="mx-2" />
                                    <span className="">Products</span>
                                </Button>
                            </li>
                            <li className={`sidebar-item my-1`}>
                                <Button variant={`${showComponent === "orderhistory" ? 'active' : 'link'}`} className="sidebar-link" onClick={() => setShowComponent("orderhistory")}>
                                    <FaChartLine className="mx-2" />
                                    <span className="">Order History</span>
                                </Button>
                            </li>
                            <li className="nav-item my-2">
                                <span className="text-center">BUSINESS</span>
                            </li>
                            <li className={`sidebar-item my-1`}>
                                <Button variant={`${showComponent === "businessregister" ? 'active' : 'link'}`} className="sidebar-link" onClick={() => setShowComponent("businessregister")}>
                                    <FaPlusCircle className="mx-2" />
                                    <span className="">Register Business</span>
                                </Button>
                            </li>

                            <li className={`sidebar-item my-1`}>
                                <Button variant={`${showComponent === "businessaddress" ? 'active' : 'link'}`} className="sidebar-link" onClick={() => setShowComponent("businessaddress")}>
                                    <FaLocationArrow className="mx-2" />
                                    <span className="">Manage Address</span>
                                </Button>
                            </li>
                            <li className={`sidebar-item my-1`}>
                                <Button variant={`${showComponent === "uploaddocs" ? 'active' : 'link'}`} className="sidebar-link" onClick={() => setShowComponent("uploaddocs")}>
                                    <FaUpload className="mx-2" />
                                    <span className="">Upload images/docs</span>
                                </Button>
                            </li>
                            <li className={`sidebar-item my-1`}>
                                <Button variant={`${showComponent === "billpage" ? 'active' : 'link'}`} className="sidebar-link" onClick={() => setShowComponent("billpage")}>
                                    <FaMoneyBill className="mx-2" />
                                    <span className="">Bills</span>
                                </Button>
                            </li>
                            <li className={`sidebar-item my-1`}>
                                <Button variant={`${showComponent === "accountdetails" ? 'active' : 'link'}`} className="sidebar-link" onClick={() => setShowComponent("accountdetails")}>
                                    <FaInfoCircle className="mx-2" />
                                    <span className="">Account details</span>
                                </Button>
                            </li>

                            <li className="nav-item my-2">
                                <span className="text-center">AUTH</span>
                            </li>
                            {isAuthenticated ? (
                                <>
                                    <li className="sidebar-item my-1">
                                        <Button variant={`${showComponent === "logout" ? 'active' : 'link'}`} className="sidebar-link" onClick={handleBusinessLogout} >
                                            <FaSignOutAlt className="mx-2" />
                                            <span className="">Logout</span>
                                        </Button>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li className="sidebar-item my-1">
                                        <Button variant={`${showComponent === "login" ? 'active' : 'link'}`} className="sidebar-link" onClick={() => setShowComponent("login")}>
                                            <FaSignOutAlt className="mx-2" />
                                            <span className="">Login</span>
                                        </Button>
                                    </li>
                                    <li className="sidebar-item my-1">
                                        <Button variant={`${showComponent === "register" ? 'active' : 'link'}`} className="sidebar-link" onClick={() => setShowComponent("register")}>
                                            <FaUserPlus className='mx-2' />
                                            <span className="">Register</span>
                                        </Button>
                                    </li>
                                </>
                            )}
                        </ul>
                    </nav>
                </Col>
                <Col xs={12} md={9} className="px-md-4">
                    <Row>
                        <Col xs={12}>
                            {renderComponent()}
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
};

export default BusinessHome;
