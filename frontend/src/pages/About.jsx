import { Container, Row, Col, Image } from 'react-bootstrap';
import brand from "../assets/images/brand.png";

const About = () => {
    return (
        <Container>
            <Row className="mt-5">
                <Col>
                    <Image src={brand} alt="Palvella Logo" fluid />
                </Col>
            </Row>
            <Row className="mt-5">
                <Col>
                    <h2>Our Mission</h2>
                    <p>At Palvella, our mission is clear: to make online shopping effortless for customers while empowering local businesses to thrive in the digital age...</p>
                </Col>
            </Row>
            <Row className="mt-5">
                <Col>
                    <h2>How Palvella Works</h2>
                    <p>Palvella is more than just a platform - it&apos;s a gateway to convenience and connectivity. With our user-friendly interface, customers can effortlessly browse through a diverse array of products, place orders, and make secure payments...</p>
                </Col>
            </Row>
            <Row className="mt-5">
                <Col>
                    <h2>Our Technological Backbone</h2>
                    <p>Behind the scenes, Palvella is powered by cutting-edge technology meticulously crafted to deliver a seamless experience. Our frontend is built using React and Redux, ensuring a dynamic and responsive user interface. On the backend, we leverage the robust capabilities of Django, coupled with Django REST Framework and Django Channels for real-time updates. With Postgresql as our trusted database, we&apos;ve constructed a platform that&apos;s not only robust but also infinitely scalable...</p>
                </Col>
            </Row>
            <Row className="mt-5">
                <Col>
                    <h2>Overcoming Challenges, Celebrating Successes</h2>
                    <p>Throughout our journey, we&apos;ve encountered challenges that tested our resolve and ingenuity. From navigating the complexities of real-time updates to fine-tuning our platform for optimal performance, every obstacle has been met with perseverance and innovation. Yet, amidst the challenges, there have been triumphs worth celebrating. We take pride in the positive impact Palvella has had on our community, empowering local businesses to thrive in an ever-evolving digital landscape...</p>
                </Col>
            </Row>
            <Row className="mt-5">
                <Col>
                    <h2>Continuous Learning and Growth</h2>
                    <p>The development of Palvella has been a journey of continuous learning and growth. With each hurdle we&apos;ve overcome, we&apos;ve gleaned invaluable insights into building scalable web applications, managing complex state with Redux, and harnessing the power of technology to drive positive change. Moreover, our journey has deepened our understanding of the unique challenges faced by local businesses, fueling our commitment to innovation and excellence...</p>
                </Col>
            </Row>
            <Row className="mt-5">
                <Col>
                    <h2>The Future of Palvella</h2>
                    <p>As we look ahead, the future of Palvella brims with promise and possibility. We&apos;re committed to ongoing improvement, fueled by the invaluable feedback of our users. In the days to come, we plan to enrich our platform with new features and functionalities, enhancing the overall experience for both customers and businesses alike. Additionally, we&apos;re exploring exciting partnerships with local delivery services to offer expanded delivery options, further elevating the convenience of Palvella. Ultimately, our vision is simple yet ambitious: to make Palvella the premier destination for local online shopping, enriching communities and empowering businesses every step of the way...</p>
                </Col>
            </Row>
            <Row className="mt-5">
                <Col>
                    <h2>Join Us on Our Journey</h2>
                    <p>Join us on our journey as we revolutionize the way communities connect and thrive. Whether you&apos;re a customer seeking convenience or a business striving for success, Palvella welcomes you with open arms. Together, let&apos;s build a brighter future where local businesses flourish and communities thrive. Welcome to Palvella – your gateway to local online shopping reimagined...</p>
                </Col>
            </Row>
        </Container>
    );
}

export default About;
