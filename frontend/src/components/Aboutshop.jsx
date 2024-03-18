import React from 'react';
import Shopimg1 from "../assets/images/Shopimg1.jpg";
import styles from '../assets/css/Aboutshop.module.css'; 

const AboutShop = () => (
  <>
    <div className={styles["about-shop-container"]}> 
      <div className={styles["shop-info"]}> 
        <hr className={styles["bold-hr"]} />
        <h1>Starbucks Coffee</h1>
        <h6 className={styles["red-text"]}>Beverages, Cafe</h6> 
        <p>Discover your favorite coffee moments at our Starbucks Coffee shop. Conveniently located in [Location], we're your go-to destination for exceptional coffee experiences. From expertly brewed beverages to cozy surroundings, we invite you to indulge in the warmth and comfort of our café. Join us for a sip and a smile today!</p>
      </div>
      <div className={styles["image-container"]}> 
        <div className={styles["image-wrapper"]}> 
          <img src={Shopimg1} alt="Shop" />
        </div>
      </div>
    </div>
    <hr className={styles["bold-hr"]} /> 
  </>
);

export default AboutShop;
