import { Container, Card } from "react-bootstrap";
import AlertMessage from "../components/AlertMessage";
import { useState, useEffect } from "react";
import BusinessAPI from "../services/BusinessAPI";
import { FaDotCircle } from "react-icons/fa";

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [alertMessage, setAlertMessage] = useState(null);

    const fetchProducts = async () => {
        try {
            const response = await BusinessAPI.getAllProducts();
            // console.log(response);
            setProducts(response);
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <Container>
            {alertMessage && <AlertMessage type={alertMessage.type} message={alertMessage.message} setAlertMessage={setAlertMessage} />}

            <h3>Product list</h3>
            {(products && products.length > 0) ? (
                <>
                    <div className="d-flex flex-wrap">
                        {products.map((product) => (
                            <>
                                <Card key={product.id} className="m-2" style={{ width: "18rem" }}>
                                    <Card.Img variant="top" src={product.thumbnail} alt="product image" />
                                    <Card.Body>
                                        <Card.Title>{product.name}</Card.Title>
                                        <Card.Text>{product.id}</Card.Text>
                                        <Card.Text>{product.product_code}</Card.Text>
                                    </Card.Body>
                                    <Card.Footer>
                                        <FaDotCircle className="me-2" color={product.is_available ? "green" : "red"} />
                                        <Card.Link href={`/p/details/${product.id}`}>Know more</Card.Link>
                                    </Card.Footer>
                                </Card>
                            </>
                        ))}
                    </div>
                </>
            ) : (
                <h3 className="text-center"> No products found!! </h3>
            )
            }
        </Container >
    )
}

export default ProductList;