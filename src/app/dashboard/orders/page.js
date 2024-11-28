"use client"
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import Link from "next/link";
import '../../../lib/i18n';

const UserOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const router = useRouter(); 
    useEffect(() => {
        const fetchOrders = async () => {
            const email = localStorage.getItem('userEmail'); // Retrieve the email from localStorage
            if (!email) {
                setError("User email not found. Please log in again.");
                setLoading(false);
                return;
            }
    
            try {
                const res = await fetch(`/api/getOrders?email=${encodeURIComponent(email)}`);
                if (!res.ok) {
                    throw new Error("Failed to fetch orders");
                }
                const data = await res.json();
                if (data.success) {
                    setOrders(data.orders);
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
                            <th scope="col">Phone</th>
                            <th scope="col">Status</th>
                            <th scope="col">Total</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.length > 0 ? (
                            orders.map((order) => (
                                <tr key={order._id}>  
                                    <th scope="row">#{order.orderId}</th>
                                    <td>{new Date(order.orderDate).toLocaleDateString()}</td>  
                                    <th scope="row">#{order.phone}</th>
                                    <td>{order.status || "Processing"}</td>  
                                    <td>{order.totalAmount} AED </td>  
                                    <td>
                                    <Link href={`/dashboard/orders/view/${order.orderId}`} className="axil-btn view-btn">View</Link>
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
