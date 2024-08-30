import { useState, useEffect } from 'react';
import { Carousel, Card, Button } from 'react-bootstrap';
import styles from '../assets/css/Popular.module.css';
import logo1 from "../assets/images/logo1.jpg";
import logo2 from "../assets/images/logo2.jpg";
import logo3 from "../assets/images/logo3.jpg";
import logo4 from "../assets/images/logo4.png";
import logo5 from "../assets/images/logo5.jpg";
import logo6 from "../assets/images/logo6.png";
import logo7 from "../assets/images/logo7.png";
import logo8 from "../assets/images/logo8.png";
import logo9 from "../assets/images/logo9.png";
import logo10 from "../assets/images/logo10.png";
import logo11 from "../assets/images/logo11.png";
import logo12 from "../assets/images/logo12.png";


const TopBusinessList = () => {
  const logos = [logo1, logo2, logo3, logo4, logo5, logo6, logo7, logo8, logo9, logo10, logo11, logo12];
  const [index, setIndex] = useState(0);
  const [buttonPosition, setButtonPosition] = useState({});

  useEffect(() => {
    const calculateButtonPosition = () => {
      const cardWidth = document.querySelector('.card-container .card').offsetWidth;
      setButtonPosition({ top: 19, right: cardWidth * 0.2 }); // Adjusted right value
    };

    calculateButtonPosition();

    window.addEventListener('resize', calculateButtonPosition);

    return () => {
      window.removeEventListener('resize', calculateButtonPosition);
    };
  }, [index]);

  const handleNext = () => {
    setIndex((prevIndex) => Math.min(prevIndex + 1, logos.length - 4));
  };

  const handlePrev = () => {
    setIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  return (
    <>
      <h3 style={{ fontFamily: "sans-serif", margin: '20px', marginBottom: '-60px', marginLeft: '120px' }}>Trending</h3>
      <Carousel interval={null} indicators={false} controls={false}>
        <Carousel.Item>
          <div className={`card-container ${styles.cardContainer}`}>
            {logos.slice(index, index + 4).map((logo, i) => (
              <Card key={index + i} style={{ width: '18rem' }} className='my-2'>
                <Card.Img variant="top" src={logo} />
              </Card>
            ))}
            <Button
              className="bg-black"
              onClick={handlePrev}
              disabled={index === 0}
              style={{
                border: '1px solid black',
                position: 'absolute',
                ...buttonPosition
              }}
            >
              {"<"}
            </Button>
            <Button
              className="bg-black"
              onClick={handleNext}
              disabled={index === logos.length - 4}
              style={{
                border: '1px solid black',
                position: 'absolute',
                ...buttonPosition,
                right: '0.1%' // Adjusted position
              }}
            >
              {">"}
            </Button>
          </div>
        </Carousel.Item>
      </Carousel>
    </>
  );
}

export default TopBusinessList;

