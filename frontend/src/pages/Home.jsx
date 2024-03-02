import React from 'react';

const Home = () => {
    return (
        <div className='container my-5'>
            <nav className='d-flex justify-content-between align-items-center flex-wrap'>
                <div className='col-md-6 d-flex p-2'>
                    <div className='col-md-3'>
                        <select className="form-select me-2">
                            <option selected>Restaurant</option>
                            <option value="2">Shop</option>
                            <option value="3">Products</option>
                        </select>
                    </div>
                    <input name='search_by' id='search_by' className='form-control' type="search" placeholder="Search..." />
                </div>
                <div className='col-md-6 d-flex p-2'>
                    <input name='postal_code' id='postal_code' className='form-control me-2' type='number' placeholder='Postal code' />
                    <div className="col-md-4">
                        <select className="form-select me-2">
                            <option selected>Sorted by</option>
                            <option value="1">Price Low-High</option>
                            <option value="2">Price High-Low</option>
                            <option value="3">A-Z</option>
                            <option value="4">Z-A</option>
                        </select>
                    </div>
                    <button className="btn btn-primary mx-2">Search</button>
                    <button className="btn btn-primary mx-2">Filter</button>
                </div>
            </nav>
        </div>
    );
}

export default Home;
