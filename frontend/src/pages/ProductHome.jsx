import { useState, useEffect } from "react";
import { Col, Container, Row, Card, Button, Form, Collapse, InputGroup, DropdownButton, Dropdown, ButtonGroup } from "react-bootstrap";
import { FaFilter, FaSearch, FaSort, FaDotCircle } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import "../assets/css/ProductHome.css";
import { Categories } from "../services/Categories.json";
import { Cuisines } from "../services/Cuisines.json";
import { Allergens } from "../services/Allergens.json";
import { PostalCode } from "../services/PostalCode.json";
import { sort_options } from "../services/ProductSort.json";
import ProductList from "../components/ProductList";
import BusinessAPI from "../services/BusinessAPI";
import { Link } from "react-router-dom";

const ProductHome = () => {
    const [openFilter, setOpenFilter] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [sortedBy, setSortedBy] = useState('default');
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedCuisines, setSelectedCuisines] = useState([]);
    const [selectedAllergens, setSelectedAllergens] = useState([]);
    const [selectedPostalCodes, setSelectedPostalCodes] = useState([]);

    const [allCategories, setAllCategories] = useState([]);
    const [allCuisines, setAllCuisines] = useState([]);
    const [allAllergens, setAllAllergens] = useState([]);
    const [allPostalCodes, setAllPostalCodes] = useState([]);
    const [allSortOptions, setAllSortOptions] = useState([]);

    const [products, setProducts] = useState([]);

    const fetchProducts = async () => {
        try {
            const response = await BusinessAPI.getProductList();
            setProducts(response);
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        setAllCategories(Categories);
        setAllCuisines(Cuisines);
        setAllAllergens(Allergens);
        setAllPostalCodes(PostalCode);
        setAllSortOptions(sort_options);
        fetchProducts();
    }, []);

    const handleFilterListChange = (currData, setCurrData, data) => {
        if (currData.includes(data)) {
            setCurrData(currData.filter((cData) => cData !== data));
        } else {
            setCurrData([...currData, data]);
        }
    };

    return (
        <Container className="my-3">
            <div className="mx-2">
                <Row className="">
                    <Col>
                        <InputGroup size="sm" className="mb-3">
                            <Form.Control name="search" value={searchText} onChange={(e) => setSearchText(e.target.value)} type="text" placeholder="Search products...." />
                            <InputGroup.Text>
                                <Button size="sm" variant="btn-link" onClick={() => setSearchText('')}><ImCross /></Button></InputGroup.Text>
                            <InputGroup.Text>
                                <Button size="sm" variant="btn-link"><FaSearch /></Button></InputGroup.Text>
                            <InputGroup.Text>
                                <Button
                                    size="sm"
                                    onClick={() => setOpenFilter(!openFilter)}
                                    aria-controls="product-filters"
                                    aria-expanded={openFilter}
                                    variant="btn-link"
                                >
                                    <FaFilter /> Filters
                                </Button>
                            </InputGroup.Text>

                            <DropdownButton
                                as={ButtonGroup}
                                id={`dropdown-button-drop`}
                                size="sm"
                                variant="light"
                                title={
                                    <>
                                        <FaSort />
                                        {sortedBy}
                                    </>
                                }
                            >
                                {allSortOptions.map((option, index) =>
                                    (<Dropdown.Item key={index} eventKey={index} onClick={() => setSortedBy(option.value)} >{option.name}</Dropdown.Item>)
                                )}
                            </DropdownButton>

                        </InputGroup>
                    </Col>
                </Row>
                <Collapse in={openFilter}>
                    <div id="product-filters">
                        <Card>
                            <Card.Body>
                                <Form>
                                    <Row>
                                        <Col>
                                            <Form.Group controlId="categoryFilters">
                                                <Form.Label>Categories:</Form.Label>
                                                <div className="filter-list-data">
                                                    {allCategories.map((category) => (
                                                        <Form.Check
                                                            key={category.id}
                                                            type="checkbox"
                                                            label={category.display_name}
                                                            value={category.name}
                                                            checked={selectedCategories.includes(category.name)}
                                                            onChange={() => handleFilterListChange(selectedCategories, setSelectedCategories, category.name)}
                                                        />
                                                    ))}
                                                </div>
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group controlId="cuisineFilters">
                                                <Form.Label>Cuisines:</Form.Label>
                                                <div className="filter-list-data">
                                                    {allCuisines.map((cuisine) => (
                                                        <Form.Check
                                                            key={cuisine.id}
                                                            type="checkbox"
                                                            label={cuisine.display_name}
                                                            value={cuisine.name}
                                                            checked={selectedCuisines.includes(cuisine.name)}
                                                            onChange={() => handleFilterListChange(selectedCuisines, setSelectedCuisines, cuisine.name)}
                                                        />
                                                    ))}
                                                </div>
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group controlId="allergenFilters">
                                                <Form.Label>Allergens:</Form.Label>
                                                <div className="filter-list-data">
                                                    {allAllergens.map((allergen) => (
                                                        <Form.Check
                                                            key={allergen.id}
                                                            type="checkbox"
                                                            label={allergen.display_name}
                                                            value={allergen.name}
                                                            checked={selectedAllergens.includes(allergen.name)}
                                                            onChange={() => handleFilterListChange(selectedAllergens, setSelectedAllergens, allergen.name)}
                                                        />
                                                    ))}
                                                </div>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Form.Group controlId="shopFilters">
                                        <Form.Label>Postal Code:</Form.Label>
                                        <div className="filter-list-data">
                                            {allPostalCodes.map((postalCode) => (
                                                <Form.Check
                                                    key={postalCode.id}
                                                    type="checkbox"
                                                    label={postalCode.postal_code}
                                                    value={postalCode.postal_code}
                                                    checked={selectedPostalCodes.includes(postalCode.postal_code)}
                                                    onChange={() => handleFilterListChange(selectedPostalCodes, setSelectedPostalCodes, postalCode.postal_code)}
                                                />
                                            ))}
                                        </div>
                                    </Form.Group>
                                </Form>
                            </Card.Body>
                        </Card>
                    </div>
                </Collapse>
            </div>
            
            <div className="d-flex flex-wrap">
                {(products && products.length > 0) ? (
                    <>
                        {
                            products.map(product => (
                                <Col key={product.id} md={3} className="mb-4 p-1">
                                    <Card className="h-100">
                                        <Card.Img variant="top" src={product.thumbnail} />
                                        <Card.Body className="d-flex flex-column">
                                            <Card.Title className="text-truncate">{product.name}</Card.Title>
                                            {/* <Card.Text>
                                                    Category: {product.category}
                                                </Card.Text> */}
                                        </Card.Body>
                                        <Card.Footer className="d-flex justify-content-between">
                                            <FaDotCircle className="me-2" color={product.is_available ? "green" : "red"} />
                                            <Link to={`details/${product.id}`}>
                                                <Button size="sm" variant="primary">More info</Button>
                                            </Link>
                                        </Card.Footer>
                                    </Card>
                                </Col>
                            ))
                        }
                    </>
                ) : (null)}
            </div>
        </Container>
    );
};

export default ProductHome;
