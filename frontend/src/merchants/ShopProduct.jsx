import { useEffect, useState } from 'react';
import { Form, Button, Container, Row, Col, Dropdown } from 'react-bootstrap';
import { FaMinusCircle, FaPlusCircle } from "react-icons/fa";
import AlertMessage from "../components/AlertMessage";
import BusinessAPI from "../services/BusinessAPI";
// import { Categories } from "../services/Categories.json";

const ShopProduct = () => {
    const [formData, setFormData] = useState({
        name: "",
        product_code: "",
        description: "",
        meta_data: "",
        is_available: true,
    });
    const [brands, setBrands] = useState([]);
    const [allCategories, setAllCategories] = useState([]);
    const [brand, setBrand] = useState("");
    const [variations, setVariations] = useState([{ size: 0.0, size_unit: 'ml', price: 0.0, currency: 'INR' }]);
    const [images, setImages] = useState(null);
    const [categories, setCategories] = useState([]);
    const [alertMessage, setAlertMessage] = useState(null);

    const handleReset = () => {
        setFormData({
            name: "",
            product_code: "",
            description: "",
            meta_data: "",
            is_available: true,
        });
        setBrand("");
        setBrands([]);
        setCategories([]);
        setVariations([{ size: 0.0, size_unit: 'ml', price: 0.0, currency: 'INR' }]);
        setImages(null);
    }

    const validateForm = () => {
        if (formData.name === "" || formData.name.length < 5 || formData.name.length > 255) {
            setAlertMessage({ type: "danger", message: "Please enter a valid name (5-255 characters)." });
            return false;
        }
        if (formData.product_code === "" || formData.product_code.length < 5 || formData.product_code.length > 25) {
            setAlertMessage({ type: "danger", message: "Please enter a valid product code (5-25 characters)." });
            return false;
        }
        if (categories.length === 0 || categories.length > 6) {
            setAlertMessage({ type: "danger", message: "Please select 1 to 6 product categories." });
            return false;
        }
        if (brands.length === 0 || brands.length > 6) {
            setAlertMessage({ type: "danger", message: "Please enter 1 to 6 brands." });
            return false;
        }
        return true;
    }

    const fetchAllCategories = async () => {
        try {
            const response = await BusinessAPI.getAllCategories();
            setAllCategories(response);
            // setAllCategories(Categories);

        } catch (error) {
            console.log(error.message);
        }
    }


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleAvailabilityChange = (e) => {
        const { name, checked } = e.target;
        setFormData({
            ...formData,
            [name]: checked
        });
    };

    const handleBrandChange = (e) => {
        setBrand(e.target.value);
    };


    const addBrand = (newBrand) => {
        if (brands.includes(newBrand)) return;
        setBrands([...brands, newBrand]);
    };

    const removeBrand = (currBrand) => {
        setBrands(brands.filter((brand) => brand !== currBrand));
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            if (brand !== "" && brand.length > 3 && brand.length < 30) {
                addBrand(brand);
                setBrand("");
            }
        }
    };

    const handleFileChange = (e) => {
        setImages(e.target.files);
    }

    const handleVariationChange = (e, index) => {
        const { name, value } = e.target;
        const newVariations = [...variations];
        newVariations[index] = {
            ...newVariations[index],
            [name]: value
        };
        setVariations(newVariations);
    };

    const handleAddVariation = () => {
        setVariations([...variations, { size: 0.0, size_unit: 'ml', price: 0.0, currency: 'INR' }]);
    };

    const handleRemoveVariation = (index) => {
        const newVariations = [...variations];
        newVariations.splice(index, 1);
        setVariations(newVariations);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!validateForm()) {
                return;
            }
            if (formData.description === "" || formData.meta_data == "") {
                setAlertMessage({ type: "danger", message: "Please write description and more info of the product." });
                return;
            }
            if (formData.description.length > 4000) {
                setAlertMessage({ type: "danger", message: "Please write description in less than 4000 characters." });
                return;
            }
            if (formData.meta_data.length > 3000) {
                setAlertMessage({ type: "danger", message: "Please write more info in less than 3000 characters." });
                return;
            }
            if (variations.length === 0 || variations.length > 10) {
                setAlertMessage({ type: "danger", message: "Please add 1 to 10 product variations." });
                return;
            }
            if (variations.some(variation => (variation.size < 0 || variation.price <= 0))) {
                setAlertMessage({ type: "danger", message: "Size and Price for each variation should be greater than 0." });
                return;
            }
            if (!images || images.length === 0 || images.length > 6) {
                setAlertMessage({ type: "danger", message: "Please upload 1 to 6 images." });
                return;
            }

            const product = new FormData();
            product.append('name', formData.name);
            product.append('product_code', formData.product_code);
            product.append('description', formData.description);
            product.append('meta_data', formData.meta_data);
            product.append('is_available', formData.is_available);

            Array.from(categories).forEach(category => {
                product.append('categories', category);
            });
            Array.from(brands).forEach(brand => {
                product.append('brands', brand);
            });
            Array.from(variations).forEach(variation => {
                product.append('product_variation', JSON.stringify(variation));
                console.log(variation);
            });

            Array.from(images).forEach(image => {
                product.append('images', image);
            });

            const response = await BusinessAPI.createShopProduct(product);
            new Promise((resolve) => setTimeout(resolve, 3000));
            handleReset();
            setAlertMessage({ type: "success", message: "Product added successfully." });
            console.log(response);

        } catch (error) {
            console.error('Error adding product:', error.message);
        }
    };

    const generateContent = async (content_type) => {
        if (!validateForm()) {
            return;
        }
        try {
            const product = {
                name: formData.name,
                product_code: formData.product_code,
                categories: categories,
                brands: brands,
                content_type: content_type
            }
            const response = await BusinessAPI.generateShopProductContent(product);
            setAlertMessage({ type: "success", message: "Product content generated successfully." });
            if (content_type === "description") {
                formData.description = response.content;
            }
            else {
                formData.meta_data = response.content;
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        fetchAllCategories();
    }, []);

    const handleToggle = (datalist, setdata, data, name) => {
        if (datalist.includes(data)) {
            setdata(
                datalist.filter((item) =>
                    item !== data));
        } else {
            if (datalist.length >= 6) {
                setAlertMessage({ type: "warning", message: `You can add upto 6 ${name}.` });
                return;
            }
            setdata(
                [...datalist, data]);
        }
    };

    return (
        <Container className='my-4'>
            {alertMessage && <AlertMessage type={alertMessage.type} message={alertMessage.message} setAlertMessage={setAlertMessage} />}
            <h3>Add Shop Product</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} placeholder='Enter product name' required />
                </Form.Group>
                <Form.Group controlId="product_code">
                    <Form.Label>Product Code</Form.Label>
                    <Form.Control type="text" name="product_code" value={formData.product_code} onChange={handleChange} placeholder='Enter product code' required />
                </Form.Group>
                <div className='my-2'>
                    <Dropdown>
                        <Dropdown.Toggle
                            variant='outline-dark'
                            id="dropdown-category">
                            {(categories && categories.length > 0) ? (
                                <>
                                    <span className='my-2'>
                                        {categories.join(', ')}
                                    </span>
                                </>
                            ) : (
                                <span>
                                    Select Categories
                                </span>
                            )}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {(allCategories && allCategories.length > 0) ? (allCategories.map((option, index) => (
                                <Dropdown.Item
                                    key={index}
                                    onClick={() => handleToggle(categories, setCategories, option.name, "categories")}
                                    active={
                                        categories.includes(option.name)}
                                >
                                    {option.display_name}
                                </Dropdown.Item>
                            ))) : (null)}
                        </Dropdown.Menu>
                    </Dropdown>
                </div>

                <div className="my-2 mb-3">
                    <Row>
                        <Col>
                            <Form.Label>Brand</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter brand name"
                                value={brand}
                                onChange={handleBrandChange}
                                onKeyPress={handleKeyPress}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            {brands.map((brand) => (
                                <Button
                                    key={brand}
                                    variant="secondary"
                                    className="me-2 mt-2 btn-sm rounded"
                                    onClick={() => removeBrand(brand)}
                                >
                                    {brand} <span aria-hidden="true">&times;</span>
                                </Button>
                            ))}
                        </Col>
                    </Row>
                </div>
                <Form.Group controlId="description" className="position-relative">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={5}
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder='Enter detailed description'
                        required
                    />
                    <Button variant="success" className="btn-sm position-absolute bottom-0 end-0 mb-3 me-3" onClick={() => generateContent('description')}>Generate</Button>
                </Form.Group>

                <Form.Group controlId="meta_data" className="position-relative">
                    <Form.Label>More info</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={5}
                        name="meta_data"
                        value={formData.meta_data}
                        onChange={handleChange}
                        placeholder='Enter more info of the product'
                        required
                    />
                    <Button variant="success" className="btn-sm position-absolute bottom-0 end-0 mb-3 me-3" onClick={() => generateContent('meta_data_or_more_info')}>Generate</Button>
                </Form.Group>

                <Form.Group>
                    <div className="d-flex justify-content-between my-2">
                        <Form.Label>Product Variations</Form.Label>
                        <Button variant="primary" className='btn-sm' onClick={handleAddVariation}><FaPlusCircle /></Button>
                    </div>
                    {variations.map((variation, index) => (
                        <div key={index} className="d-flex my-2">
                            <Form.Control type="number" min={0.0} step={0.01} name="size" value={variation.size} onChange={(e) => handleVariationChange(e, index)} placeholder='Size' className="me-2" />
                            <Form.Select name="size_unit" value={variation.size_unit} onChange={(e) => handleVariationChange(e, index)} className="me-2">
                                <option value="ml">Milliliter</option>
                                <option value="kg">Kilogram</option>
                                <option value="large">Large</option>
                                <option value="medium">Medium</option>
                                <option value="small">Small</option>
                                <option value="half">Half</option>
                                <option value="full">Full</option>
                                <option value="other">Other</option>
                            </Form.Select>
                            <Form.Control type="number" min={0.0} step={0.01} name="price" value={variation.price} onChange={(e) => handleVariationChange(e, index)} placeholder='Price' className="me-2" />
                            <Form.Select name="currency" value={variation.currency} onChange={(e) => handleVariationChange(e, index)}>
                                <option value="INR">Rupees</option>
                                <option value="USD">US Dollar</option>
                                <option value="EUR">Euro</option>
                            </Form.Select>
                            <Button variant="danger" className="btn-sm ms-2" onClick={() => handleRemoveVariation(index)}><FaMinusCircle /></Button>
                        </div>
                    ))}
                </Form.Group>
                <Form.Group controlId="images">
                    <Form.Label>Image</Form.Label>
                    <Form.Control type="file" accept='image/*' name="images" onChange={handleFileChange} multiple required />
                </Form.Group>

                <Form.Group controlId="is_available">
                    <Form.Check
                        type="checkbox"
                        label="Available"
                        name="is_available"
                        checked={formData.is_available}
                        onChange={handleAvailabilityChange}
                    />
                </Form.Group>

                <div className="my-2">
                    <Button className='btn-sm me-2' variant="primary" type="submit">
                        Add product
                    </Button>
                    <Button className='btn-sm me-2' variant="danger" type="reset" onClick={handleReset}>
                        Clear
                    </Button>
                </div>
            </Form>
        </Container>
    );
};

export default ShopProduct;
