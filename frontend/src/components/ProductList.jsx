import { products } from "../services/ProductList.json";
import {Card, Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";

const ProductList = () => {
  return (
    <Container>
      {(products && products.length > 0) ? (
        <div className="d-flex flex-wrap">
          {products.map(product => (
            <Card key={product.id} className="shadow-sm mb-3 col-md-4 m-1">
              <Card.Img variant="top" src={product.thumbnail} />
              <Card.Body>
                <Card.Title>{product.title}</Card.Title>
                <Card.Text>{product.price}</Card.Text>
              </Card.Body>
              <Card.Footer className="d-flex justify-content-between">
                <FaHeart color="red" className="m-2" />
                <Link to={`details/${product.id}`}>
                  <Button size="sm" variant="primary">More info</Button>
                </Link>
              </Card.Footer>
            </Card>
          ))}
        </div>
      ) : (<h3> No products found</h3>)
      }
    </Container>
  )
}

export default ProductList; 