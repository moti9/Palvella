import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import styles from '../assets/css/Nav.module.css'; 
import brand from "../assets/images/brand.png";

const Nav =() => (
    <>
      <div className={styles.containerNav}>
        <div className={`d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start ${styles.navContainer}`}>
          <a href="/" className={`d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none ${styles.logo}`}>
            <img src={brand} alt="Brand Logo" width="90" height="25"  className="me-3" />
          </a>

          <ul className={`nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0 ${styles.navList}`}>
            <li><a href="#" className={`navLink px-2 ${styles.navLink}`}>Home</a></li>
            <li><a href="#" className={`navLink px-2 ${styles.navLink}`}>Features</a></li>
            <li><a href="#" className={`navLink px-2 ${styles.navLink}`}>Pricing</a></li>
            <li><a href="#" className={`navLink px-2 ${styles.navLink}`}>FAQs</a></li>
            <li><a href="#" className={`navLink px-2 ${styles.navLink}`}>About</a></li>
          </ul>

          <form className={`col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3 ${styles.searchForm}`} role="search">
            <div className={`input-group ${styles.inputGroup}`}>
              <input type="search" className={`form-control form-control-dark text-bg-white ${styles.input}`} placeholder="Search..." aria-label="Search" />
              <button className={`btn btn-dark ${styles.searchBtn}`} type="button">Search</button>
            </div>
          </form>

          <div className={`text-end ${styles.buttons}`}>
            <button type="button" className="btn" style={{ backgroundColor: 'black', color: 'white' }}>Sign-up</button>
            <button type="button" className={`btn ${styles.cartButton}`}>
              <FontAwesomeIcon icon={faShoppingCart} />
            </button>
          </div>
        </div>
      </div>
    </>
  );


export default Nav;
