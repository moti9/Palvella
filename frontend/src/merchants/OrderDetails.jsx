import { Orders } from "./UserOrderDetails.json";


const OrderDetails = () => {
    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item">
                                <a href="#">My Account</a>
                            </li>
                            <li class="breadcrumb-item">
                                <a href="#">Order History</a>
                            </li>
                            <li class="breadcrumb-item active" aria-current="page">
                                Order Details
                            </li>
                        </ol>
                    </nav>
                </div>
            </div>
            <div className="row text-start">
                <div className="col">
                    <h3 className="fw-bold">Order Details</h3>
                </div>
            </div>
            <div className="row text-start">
                <div className="col">
                    <h5>Order #{Orders[0].number}</h5>
                </div>
            </div>
            <div className="row d-flex justify-content-end">
                <div className="col-2">
                    <p>Print</p>
                </div>
                <div className="col-2">
                    <p>PDF</p>
                </div>
            </div>
            <div className="card">
                <div className="card-body">
                    <div className="row g-2 d-flex justify-content-between">
                        {/* Map over orders */}
                        <div className="col-md-6">
                            <div className="d-flex flex-row">
                                <img
                                    className="order-detail-thumbnail"
                                    src={Orders[0].lines[0].thumbnail.url}
                                    alt={Orders[0].lines[0].thumbnail.alt}
                                />
                                <div className="ps-3 text-start">
                                    <h6 className="text-decoration-underline">
                                        Lock & Ride Rear Bed Storage Rack
                                    </h6>
                                    <p className="fw-bold m-0">Part Number</p>
                                    <p className="m-0">2885113</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <table class="table table-borderless">
                                <thead>
                                    <tr>
                                        <th scope="col">Price</th>
                                        <th scope="col">Qty</th>
                                        <th scope="col">Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>$899.99</td>
                                        <td>1</td>
                                        <td>$899.99</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        {/* Map over orders */}
                        <div className="col">
                            <div className="d-flex justify-content-end">
                                <div className="col-9 col-md-6">
                                    <table class="table table-borderless border-top">
                                        <tbody>
                                            <tr>
                                                <th scope="row">Pre-Tax Total</th>
                                                <td>$2699.97</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Sales Tax</th>
                                                <td>$162.00</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Shipping</th>
                                                <td>$23.74</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Grand Total</th>
                                                <td className="fw-bold">$2885.71</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row g-4 text-start">
                        <div className="col-12 col-md-3">
                            <h6 className="fw-bold m-0">Part Number</h6>
                            <p className="m-0">Shipped</p>
                            <p className="m-0">USPS Tracking #</p>
                            <a href="#">
                                <p className="m-0">19195039UHZ</p>
                            </a>
                        </div>
                        <div className="col-12 col-md-3 order-2">
                            <h6 className="fw-bold m-0">Billing Address</h6>
                            <p className="m-0">Ronald Swanson</p>
                            <p className="m-0">Address Line 1</p>
                            <p className="m-0">Address Line 2</p>
                        </div>
                        <div className="col-12 col-md-3 order-3">
                            <h6 className="fw-bold m-0">Shipping Address</h6>
                            <p className="m-0">Ronald Swanson</p>
                            <p className="m-0">Address Line 1</p>
                            <p className="m-0">Address Line 2</p>
                        </div>
                        <div className="col-12 col-md-3 order-1 order-md-last">
                            <h6 className="fw-bold m-0">Payment Method</h6>
                            <p className="m-0">**** **** **** 4564</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OrderDetails;