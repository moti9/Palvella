import { useState, useEffect } from "react";
import { Col, Container, Row, Card, Button, Form, Collapse, InputGroup, DropdownButton, Dropdown, ButtonGroup } from "react-bootstrap";
import { FaFilter, FaSearch, FaSort } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import "../assets/css/ProductHome.css";
import { Categories } from "../services/Categories.json";
import { Cuisines } from "../services/Cuisines.json";
import { Allergens } from "../services/Allergens.json";
import { PostalCode } from "../services/PostalCode.json";
import ProductList from "../components/ProductList";
import { PRODUCT_TYPES, PRODUCT_SHORT_OPTIONS } from "../config";
import BusinessAPI from "../services/BusinessAPI";

const MerchantHome = () => {
    const [openFilter, setOpenFilter] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [sortedBy, setSortedBy] = useState(PRODUCT_SHORT_OPTIONS[0].value);
    const [productType, setProductType] = useState(PRODUCT_TYPES[0].value);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedCuisines, setSelectedCuisines] = useState([]);
    const [selectedAllergens, setSelectedAllergens] = useState([]);
    const [selectedPostalCodes, setSelectedPostalCodes] = useState([]);

    const [allCategories, setAllCategories] = useState([]);
    const [allCuisines, setAllCuisines] = useState([]);
    const [allAllergens, setAllAllergens] = useState([]);
    const [allPostalCodes, setAllPostalCodes] = useState([]);

    const [businesses, setBusinesses] = useState([]);

    const fetchBusiness = async () => {
        try {
            const response = await BusinessAPI.getBusinessList();
            setBusinesses(response);
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        setAllCategories(Categories);
        setAllCuisines(Cuisines);
        setAllAllergens(Allergens);
        setAllPostalCodes(PostalCode);
        fetchBusiness();
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
                            <InputGroup.Text>
                                <DropdownButton
                                    as={ButtonGroup}
                                    id={`dropdown-product-type`}
                                    size="sm"
                                    variant="gray"
                                    title={
                                        <>
                                            {productType}
                                        </>
                                    }
                                >
                                    {PRODUCT_TYPES.map((option, index) => (
                                        <Dropdown.Item
                                            key={index}
                                            eventKey={index}
                                            onClick={() => setProductType(option.value)}
                                        >
                                            {option.label}
                                        </Dropdown.Item>
                                    ))}

                                </DropdownButton>
                            </InputGroup.Text>

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

                            <InputGroup.Text>
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
                                    {PRODUCT_SHORT_OPTIONS.map((option, index) =>
                                        (<Dropdown.Item key={index} eventKey={index} onClick={() => setSortedBy(option.value)} >{option.label}</Dropdown.Item>)
                                    )}
                                </DropdownButton>
                            </InputGroup.Text>

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
            </div >
            <div className="d-flex flex-wrap">
                {(businesses && businesses.length > 0) ? (
                    <>
                        {
                            businesses.map(business => (
                                <Col key={business.id} md={3} className="mb-4 p-1">
                                    <Card>
                                        <Card.Img variant="top" src={business.logo.logo} />
                                        <Card.Body>
                                            <Card.Title>{business.name}</Card.Title>
                                            <Card.Text>
                                                Category: {business.category}
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))
                        }
                    </>
                ) : (null)}

            </div>
        </Container >
    );
};

export default MerchantHome;
