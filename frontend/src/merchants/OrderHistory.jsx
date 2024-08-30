import { useState } from "react";
import { Orders } from "../services/UserOrderDetails.json";



const OrderHistory = () => {
    const [visibleOrders, setVisibleOrders] = useState(10);
    const ordersPerPage = 10;

    const handleLoadMore = () => {
        setVisibleOrders((prevVisibleOrders) => prevVisibleOrders + ordersPerPage);
    };

    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item">
                                    <a href="#">My Account</a>
                                </li>
                                <li className="breadcrumb-item active" aria-current="page">
                                    Order History
                                </li>
                            </ol>
                        </nav>
                    </div>
                </div>
                <div className="row text-start">
                    <div className="col">
                        <h3 className="fw-bold">Order History</h3>
                    </div>
                </div>
                <div className="row">
                    <div className="col table-responsive">
                        <table className="table table-striped table-borderless">
                            <thead>
                                <tr>
                                    <th scope="col">Order Date</th>
                                    <th scope="col ">Order Number</th>
                                    <th scope="col">Total</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Shipping</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>4/25/2022</td>
                                    <td>1156489</td>
                                    <td>$36.76</td>
                                    <td>Order Received</td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>4/25/2022</td>
                                    <td>1156489</td>
                                    <td>$36.76</td>
                                    <td>Processing</td>
                                    <td>Track Shipping</td>
                                </tr>
                                <tr>
                                    <td>4/25/2022</td>
                                    <td>1156489</td>
                                    <td>$36.76</td>
                                    <td>Order Shipped</td>
                                    <td>Track Shipping</td>
                                </tr>
                                {Orders.slice(0, Math.min(visibleOrders, Orders.length)).map(
                                    (order, index) => (
                                        <tr key={index}>
                                            <td>{order.created}</td>
                                            <td>{order.number}</td>
                                            <td>${order.total.toFixed(2)}</td>
                                            <td>{order.status}</td>
                                            <td>{order.isShipped ? "Track Shipping" : ""}</td>
                                        </tr>
                                    )
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="row">
                    {Orders.length > visibleOrders && (
                        <div className="col-12">
                            <button
                                type="button"
                                onClick={handleLoadMore}
                                className="btn btn-secondary"
                            >
                                Load More
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default OrderHistory;