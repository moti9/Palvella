import { useState, useEffect } from "react";
// import { NavLink, useNavigate } from "react-router-dom";
import { NavLink, Outlet } from "react-router-dom";
// import logo from '../static/images/logo2.png';
import '../assets/css/Navbar.css';
import defaultUser from "../assets/images/default_user.png";
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from "../slices/authSlice";
import UserLogin from "../auth/UserLogin";
import UserSignup from "../auth/UserSignup";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import styles from '../assets/css/Nav.module.css';
import brand from "../assets/images/brand.png";
import Dropdown from 'react-bootstrap/Dropdown';



const MainNavbar = () => {
  const dispatch = useDispatch();
  // const authUser = useSelector((state) => state.auth.user);
  const isAuthenticated = useSelector((state) => state.palvella.isAuthenticated);
  const user_image = useSelector((state) => state.palvella.image);
  // const navigate = useNavigate();


  // State to control visibility of modals
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);

  // console.log(authUser);

  useEffect(() => {
    if (showLoginModal || showSignupModal) {
      // Disable scroll when modal is open
      document.body.style.overflow = 'hidden';
    } else {
      // Enable scroll when modal is closed
      document.body.style.overflow = 'unset';
    }

    // Cleanup function to reset overflow style
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showLoginModal, showSignupModal]);

  const handleLogout = () => {
    try {
      dispatch(logoutUser());
    } catch (error) {
      console.error('Logout error:', error.message);
    }
  };

  return (

    <>
      <div className={styles.containerNav}>
        <div className={`d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start ${styles.navContainer}`}>
          <NavLink to="/" className={`d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none ${styles.logo}`}>
            <img src={brand} alt="Brand Logo" width="90" height="25" className="me-3" />
          </NavLink>

          <ul className={`nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0 ${styles.navList}`}>
            <li><NavLink to="/home" className={`navLink px-2 ${styles.navLink}`}>Home</NavLink></li>
            <li><NavLink to="/features" className={`navLink px-2 ${styles.navLink}`}>Features</NavLink></li>
            <li><NavLink to="/pricing" className={`navLink px-2 ${styles.navLink}`}>Pricing</NavLink></li>
            <li><NavLink to="/faq" className={`navLink px-2 ${styles.navLink}`}>FAQs</NavLink></li>
            <li><NavLink to="/about" className={`navLink px-2 ${styles.navLink}`}>About</NavLink></li>
            <li><NavLink to="/m" className={`navLink px-2 ${styles.navLink}`}>Business</NavLink></li>
          </ul>

          <form className={`col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3 ${styles.searchForm}`} role="search">
            <div className={`input-group ${styles.inputGroup}`}>
              <input type="search" className={`form-control form-control-dark text-bg-white ${styles.input}`} placeholder="Search shop,restaurants,..." aria-label="Search" />
              <button className={`btn btn-dark ${styles.searchBtn}`} type="button">Search</button>
            </div>
          </form>

          <div className={`text-end d-flex ${styles.buttons}`}>
            {isAuthenticated ? (
              <>
                {/* <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="/" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <div className="profile-pic">
                      <img src={(user_image) ? "http://127.0.0.1:8000" + user_image : defaultUser} alt="User" />
                    </div>
                  </a>
                  <ul
                    className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown" >
                    <NavLink className="dropdown-item" to={"/user"}>Account</NavLink>
                    <hr className="dropdown-divider" />
                    <button className="dropdown-item" onClick={handleLogout}> Log Out</button>
                  </ul>
                </li> */}
                <button type="button" className={`btn ${styles.cartButton}`}>
                  <FontAwesomeIcon icon={faShoppingCart} />
                </button>
                <Dropdown data-bs-theme="light">
                  <Dropdown.Toggle variant="gray" id="dropdown-nav">
                    <div className="profile-pic">
                      <img src={(user_image) ? "http://127.0.0.1:8000" + user_image : defaultUser} alt="User" />
                    </div>
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item href="/user">Account</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item href="#/action-3" onClick={handleLogout}>Logout</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </>
            ) : (
              <>
                <button type="button" className="btn mx-1" style={{ backgroundColor: 'black', color: 'white' }} onClick={() => { setShowLoginModal(false); setShowSignupModal(true); }}>Sign-up</button>
                <button type="button" className="btn mx-1" style={{ backgroundColor: 'black', color: 'white' }} onClick={() => { setShowSignupModal(false); setShowLoginModal(true) }}>Sign-in</button>
              </>
            )}
          </div>
        </div>
      </div>
      <Outlet />
      {showLoginModal && <UserLogin closeModal={() => setShowLoginModal(false)} signupModal={() => { setShowLoginModal(false); setShowSignupModal(true) }} />}
      {showSignupModal && <UserSignup closeModal={() => setShowSignupModal(false)} loginModal={() => { setShowSignupModal(false); setShowLoginModal(true) }} />}
    </>
  );
}

export default MainNavbar;
