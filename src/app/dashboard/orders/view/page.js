"use client"; // Required for using hooks in a client-side component
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export const dynamic = "force-dynamic"; // Ensure the page renders dynamically at runtime

const OrderView = () => {
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const router = useRouter();
    const { id } = router.query; // Get the order ID from the route

    useEffect(() => {
        if (!id) return; // Wait for the ID to be available

        const fetchOrderDetails = async () => {
            try {
                const res = await fetch(`/api/order?id=${id}`);
                if (!res.ok) {
                    throw new Error("Failed to fetch order details");
                }
                const data = await res.json();
                if (data.success) {
                    setOrder(data.order);
                } else {
                    throw new Error(data.message || "Unknown error occurred");
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchOrderDetails();
    }, [id]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="axil-dashboard-order-view">
            <p>
                Order <strong>#{order.orderId}</strong> was placed on{" "}
                <strong>{new Date(order.orderDate).toLocaleDateString()}</strong> and is currently{" "}
                <strong>{order.status || "Processing"}</strong>.
            </p>
            <div className="order-details">
                <h2 className="block-title">Order details</h2>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {order.items.map((item, index) => (
                            <tr key={index}>
                                <td>
                                    {item.name} <strong>X {item.quantity}</strong>
                                </td>
                                <td>{item.total} AED</td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr>
                            <th>Subtotal:</th>
                            <th>{order.subtotal} AED</th>
                        </tr>
                        <tr>
                            <th>Shipping:</th>
                            <th>{order.shipping || "Flat rate"}</th>
                        </tr>
                        <tr>
                            <th>Payment Method:</th>
                            <th>{order.paymentMethod || "Cash"}</th>
                        </tr>
                        <tr>
                            <th>Total:</th>
                            <th>{order.totalAmount} AED</th>
                        </tr>
                        {order.note && (
                            <tr>
                                <th>Note:</th>
                                <th>{order.note}</th>
                            </tr>
                        )}
                    </tfoot>
                </table>
            </div>
            <div className="order-address">
                <h2 className="block-title">Billing address</h2>
                <address>
                    {order.billingAddress.name} <br />
                    {order.billingAddress.company} <br />
                    {order.billingAddress.address1} <br />
                    {order.billingAddress.address2} <br />
                    {order.billingAddress.city}, {order.billingAddress.state} <br />
                    {order.billingAddress.zip} <br />
                    {order.billingAddress.country} <br />
                    <p className="address-phone">
                        <i className="far fa-phone"></i> {order.billingAddress.phone}
                    </p>
                    <p className="address-email">
                        <i className="far fa-envelope"></i> {order.billingAddress.email}
                    </p>
                </address>
            </div>
            <div className="order-address">
                <h2 className="block-title">Shipping address</h2>
                <address>
                    {order.shippingAddress.name} <br />
                    {order.shippingAddress.company} <br />
                    {order.shippingAddress.address1} <br />
                    {order.shippingAddress.address2} <br />
                    {order.shippingAddress.city}, {order.shippingAddress.state} <br />
                    {order.shippingAddress.zip} <br />
                    {order.shippingAddress.country} <br />
                    <p className="address-phone">
                        <i className="far fa-phone"></i> {order.shippingAddress.phone}
                    </p>
                    <p className="address-email">
                        <i className="far fa-envelope"></i> {order.shippingAddress.email}
                    </p>
                </address>
            </div>
        </div>
    );
};

export default OrderView;
