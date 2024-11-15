import { useEffect, useState } from "react";
import Link from "next/link";

const UserOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch orders on component mount
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await fetch("/api/getOrders");  // Assuming the API is accessible here
                if (!res.ok) {
                    throw new Error("Failed to fetch orders");
                }
                const data = await res.json();
                if (data.success) {
                    setOrders(data.orders); // Set the fetched orders to state
                } else {
                    throw new Error(data.message);
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return ( 
        <div className="axil-dashboard-order">
            <div className="table-responsive">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Order</th>
                            <th scope="col">Date</th>
                            <th scope="col">Status</th>
                            <th scope="col">Total</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.length > 0 ? (
                            orders.map((order) => (
                                <tr key={order._id}>  {/* Assuming order._id is the unique identifier */}
                                    <th scope="row">#{order.orderId}</th>
                                    <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                                    <td>{order.status}</td>
                                    <td>{order.totalAmount} AED for {order.items.length} items</td>
                                    <td>
                                        <Link href={`/dashboard/orders/view/${order._id}`} className="axil-btn view-btn">View</Link>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5">No orders found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default UserOrders;
