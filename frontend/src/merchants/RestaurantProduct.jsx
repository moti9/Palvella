import { useState, useEffect } from 'react';
import { Form, Button, Container, Dropdown } from 'react-bootstrap';
import { FaPlusCircle, FaMinusCircle } from 'react-icons/fa';
import AlertMessage from '../components/AlertMessage';
import BusinessAPI from '../services/BusinessAPI';
import { Categories } from "../services/Categories.json";
import { Cuisines } from "../services/Cuisines.json";
import { Allergens } from "../services/Allergens.json";


const RestaurantProduct = () => {
    const [formData, setFormData] = useState({
        name: '',
        product_code: '',
        description: '',
        meta_data: '',
        is_available: true,
        preparation_time: 0.0,
        available_from: '08:00',
        available_until: '20:00',
    });
    const [allCategories, setAllCategories] = useState([]);
    const [allCuisines, setAllCuisines] = useState([]);
    const [allAllergens, setAllAllergens] = useState([]);
    const [categories, setCategories] = useState([]);
    const [cuisines, setCuisines] = useState([]);
    const [allergens, setAllergens] = useState([]);
    const [variations, setVariations] = useState([{ size: 0.0, size_unit: 'ml', price: 0.0, currency: 'INR' }]);
    const [images, setImages] = useState(null);
    const [alertMessage, setAlertMessage] = useState(null);

    const handleReset = () => {
        setFormData({
            name: '',
            product_code: '',
            description: '',
            meta_data: '',
            preparation_time: 0.0,
            available_from: '08:00',
            available_until: '20:00',
            is_available: true,
        });
        setCategories([]);
        setCuisines([]);
        setAllergens([]);
        setVariations([{ size: 0.0, size_unit: 'ml', price: 0.0, currency: 'INR' }]);
        setImages(null);
    }

    const fetchAllCategories = async () => {
        try {
            // const response = await BusinessAPI.getAllCategories();
            // setAllCategories(response);
            setAllCategories(Categories);

        } catch (error) {
            console.log(error.message);
        }
    }

    const fetchAllCuisines = async () => {
        try {
            // const response = await BusinessAPI.getAllCuisines();
            // setAllCuisines(response);
            setAllCuisines(Cuisines);
        } catch (error) {
            console.log(error.message);
        }
    }

    const fetchAllAllergens = async () => {
        try {
            // const response = await BusinessAPI.getAllAllergens();
            // setAllAllergens(response);
            setAllAllergens(Allergens);
        } catch (error) {
            console.log(error.message);
        }
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
        if (cuisines.length === 0 || cuisines.length > 6) {
            setAlertMessage({ type: "warning", message: 'You can add minimum 1 and maximum 6 cuisines.' });
            return false;
        }

        if (allergens.length === 0 || allergens.length > 6) {
            setAlertMessage({ type: "warning", message: 'You can add minimum 1 and maximum 6 allergens.' });
            return false;
        }
        return true;
    }

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const newValue = type === 'checkbox' ? checked : value;
        setFormData({
            ...formData,
            [name]: newValue
        });
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

    const generateContent = async (content_type) => {
        if (!validateForm()) {
            return;
        }
        try {
            const product = {
                name: formData.name,
                product_code: formData.product_code,
                categories: categories,
                cuisines: cuisines,
                allergens: allergens,
                content_type: content_type
            }
            const response = await BusinessAPI.generateRestaurantProductContent(product);
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
        fetchAllCuisines();
        fetchAllAllergens();
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            if (variations.length === 0 || variations.length > 10) {
                setAlertMessage({ type: "warning", message: 'You can add minimum 1 and maximum 10 product variations.' });
                return;
            }

            if (!images || images.length === 0 || images.length > 6) {
                setAlertMessage({ type: "warning", message: 'You can upload minimum 1 and maximum 6 images.' });
                return;
            }

            if (variations.some(variation => (variation.size < 0 || variation.price <= 0))) {
                setAlertMessage({ type: "warning", message: 'Size and Price for each variation should be greater than 0.' });
                return;
            }

            if (formData.preparation_time <= 0) {
                setAlertMessage({ type: "warning", message: 'Preparation time should be greater than 0.' });
                return;
            }

            if (!isValidTime(formData.available_from) || !isValidTime(formData.available_until)) {
                setAlertMessage({ type: "warning", message: 'Please enter valid time for available from and available until.' });
                return;
            }
            const product = new FormData();
            product.append('name', formData.name);
            product.append('product_code', formData.product_code);
            product.append('description', formData.description);
            product.append('meta_data', formData.meta_data);
            product.append('preparation_time', formData.preparation_time);
            product.append('available_from', formData.available_from);
            product.append('available_until', formData.available_until);
            product.append('is_available', formData.is_available);

            Array.from(variations).forEach(variation => {
                product.append('product_variation', JSON.stringify(variation));
            });

            Array.from(categories).forEach(category => {
                product.append('categories', category);
            });
            Array.from(cuisines).forEach(cuisine => {
                product.append('cuisines', cuisine);
            });
            Array.from(allergens).forEach(allergen => {
                product.append('allergens', allergen);
            });
            Array.from(images).forEach(image => {
                product.append('images', image);
            });
            const response = await BusinessAPI.createRestaurantProduct(product);
            new Promise((resolve) => setTimeout(resolve, 3000));
            handleReset();
            setAlertMessage({ type: "success", message: "Product added successfully" });
            console.log(response);
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    const isValidTime = (time) => {
        return /^(?:2[0-3]|[01][0-9]):[0-5][0-9]$/.test(time);
    };


    return (
        <Container className='my-4'>
            {alertMessage && <AlertMessage type={alertMessage.type} message={alertMessage.message} setAlertMessage={setAlertMessage} />}
            <h3>Add Restaurant Product</h3>
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
                <div className='my-2'>
                    <Dropdown>
                        <Dropdown.Toggle
                            variant='outline-dark'
                            id="dropdown-cuisines">
                            {(cuisines && cuisines.length > 0) ? (
                                <>
                                    <span className='my-2'>
                                        {cuisines.join(', ')}
                                    </span>
                                </>
                            ) : (
                                <span>
                                    Select Cuisines
                                </span>
                            )}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {(allCuisines && allCuisines.length > 0) ? (allCuisines.map((option, index) => (
                                <Dropdown.Item
                                    key={index}
                                    onClick={() => handleToggle(cuisines, setCuisines, option.name, "cuisines")}
                                    active={
                                        cuisines.includes(option.name)}
                                >
                                    {option.display_name}
                                </Dropdown.Item>
                            ))) : (null)}
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
                <div className='my-2'>
                    <Dropdown>
                        <Dropdown.Toggle
                            variant='outline-dark'
                            id="dropdown-allergen">
                            {(allergens && allergens.length > 0) ? (
                                <>
                                    <span className='my-2'>
                                        {allergens.join(', ')}
                                    </span>
                                </>
                            ) : (
                                <span>
                                    Select Allergens
                                </span>
                            )}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {(allAllergens && allAllergens.length > 0) ? (allAllergens.map((option, index) => (
                                <Dropdown.Item
                                    key={index}
                                    onClick={() => handleToggle(allergens, setAllergens, option.name, "allergens")}
                                    active={
                                        allergens.includes(option.name)}
                                >
                                    {option.display_name}
                                </Dropdown.Item>
                            ))) : (null)}
                        </Dropdown.Menu>
                    </Dropdown>
                </div>

                <Form.Group controlId="description" className="position-relative">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={5}
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder='Enter product description'
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
                        placeholder="Enter more info's product"
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

                <Form.Group controlId="preparation_time">
                    <Form.Label>Preparation Time(in minutes)</Form.Label>
                    <Form.Control type="number" min={0.0} step={0.01} name="preparation_time" value={formData.preparation_time} onChange={handleChange} placeholder='15' />
                </Form.Group>

                <Form.Group controlId="available_from">
                    <Form.Label>Available From</Form.Label>
                    <Form.Control type="time" name="available_from" value={formData.available_from} onChange={handleChange} />
                </Form.Group>

                <Form.Group controlId="available_until">
                    <Form.Label>Available Until</Form.Label>
                    <Form.Control type="time" name="available_until" value={formData.available_until} onChange={handleChange} />
                </Form.Group>

                <Form.Group controlId="image">
                    <Form.Label>Image</Form.Label>
                    <Form.Control type="file" accept='image/*' name="image" onChange={handleFileChange} multiple required />
                </Form.Group>

                <Form.Group controlId="is_available">
                    <Form.Check
                        type="checkbox"
                        label="Available"
                        name="is_available"
                        checked={formData.is_available}
                        onChange={handleChange}
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

export default RestaurantProduct;
