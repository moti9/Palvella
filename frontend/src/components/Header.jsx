import { useState, useEffect } from "react";
import Carousel from 'react-bootstrap/Carousel';
// import c1 from "../assets/images/c1.jpg";
// import c2 from "../assets/images/c2.png";
// import c3 from "../assets/images/c3.png";

import BusinessAPI from "../services/BusinessAPI";

const Header = () => {
  const [index, setIndex] = useState(0);
  const [topProducts, setTopProducts] = useState([]);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  const fetchProducts = async () => {
    try {
      const response = await BusinessAPI.getTopProducts();
      setTopProducts(response);
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      {(topProducts && topProducts.length > 0) ? (
        <Carousel activeIndex={index} onSelect={handleSelect}>
          {topProducts.map(product => (
            <Carousel.Item key={product.id}>
              <img style={{ height: '70vh' }} src={product.image} className="d-block w-100" alt="First slide" />
              <Carousel.Caption>
                <div className="text-bg-light rounded">
                  <h3>{product.name}</h3>
                </div>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
      ) : (null)}
    </>
  );
}

export default Header;
