import { useState } from 'react';
import { Container, Navbar, Nav, Form, FormControl, Button, DropdownButton, Dropdown } from 'react-bootstrap';

const ProductList = () => {
    const [searchInput, setSearchInput] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [sortBy, setSortBy] = useState('');
    const [filter, setFilter] = useState('');

    const handleSearchInputChange = (event) => {
        setSearchInput(event.target.value);
    };

    const handlePostalCodeChange = (event) => {
        setPostalCode(event.target.value);
    };

    const handleSortByChange = (event) => {
        setSortBy(event.target.value);
    };

    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    };

    const handleSearchSubmit = () => {
        // Handle search submit logic here
        console.log('Search submitted:', searchInput);
    };

    const handleFilterSubmit = () => {
        // Handle filter submit logic here
        console.log('Filter submitted:', filter);
    };

    return (
        <Container fluid className='my-5 bg-light'>
            <Navbar expand='md' className='p-4'>
                <Navbar.Toggle aria-controls='basic-navbar-nav' />
                <Navbar.Collapse id='basic-navbar-nav'>
                    <Nav className='me-auto'>
                        <Form className='d-flex'>
                            <FormControl
                                type='search'
                                placeholder='Search food, groceries,...'
                                className='mr-2'
                                aria-label='Search'
                                value={searchInput}
                                onChange={handleSearchInputChange}
                            />
                            <Button variant='primary' onClick={handleSearchSubmit}>Search</Button>
                        </Form>
                    </Nav>
                    <Form className='d-flex'>
                        <FormControl
                            type='number'
                            placeholder='Postal code'
                            className='mr-2'
                            aria-label='Postal code'
                            value={postalCode}
                            onChange={handlePostalCodeChange}
                        />
                        <Form.Select className='mr-2' value={sortBy} onChange={handleSortByChange}>
                            <option value=''>Sorted by</option>
                            <option value='priceLowHigh'>Price Low-High</option>
                            <option value='priceHighLow'>Price High-Low</option>
                            <option value='AZ'>A-Z</option>
                            <option value='ZA'>Z-A</option>
                        </Form.Select>
                        <DropdownButton id='dropdown-basic-button' title='Filter'>
                            <Dropdown.Item onClick={() => handleFilterChange('filter1')}>Filter 1</Dropdown.Item>
                            <Dropdown.Item onClick={() => handleFilterChange('filter2')}>Filter 2</Dropdown.Item>
                            <Dropdown.Item onClick={() => handleFilterChange('filter3')}>Filter 3</Dropdown.Item>
                            {/* Add more filter options as needed */}
                        </DropdownButton>
                        <Button variant='primary' onClick={handleFilterSubmit}>Apply Filter</Button>
                    </Form>
                </Navbar.Collapse>
            </Navbar>
        </Container>
    );
}

export default ProductList;
