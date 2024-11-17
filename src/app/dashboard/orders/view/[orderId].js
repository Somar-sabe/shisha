"use client"; // Required for using hooks in a client-side component
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

// Remove dynamic import unless you have a specific reason
// import dynamic from "next/dynamic";

const OrderView = () => {
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const router = useRouter();
    const { orderId } = router.query; // Corrected the query to use `orderId`

    useEffect(() => {
        if (!orderId) return; // Wait for the orderId to be available

        const fetchOrderDetails = async () => {
            try {
                const res = await fetch(`/api/order?orderId=${orderId}`);
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
    }, [orderId]);

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
                        {order.cartItems.map((item, index) => (
                            <tr key={index}>
                                <td>
                                    {item.title} <strong>X {item.cartQuantity}</strong>
                                </td>
                                <td>{item.price * item.cartQuantity} AED</td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr>
                            <th>Subtotal:</th>
                            <th>{order.totalAmount} AED</th>
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
            {order.billingAddress && (
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
            )}
            {order.shippingAddress && (
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
            )}
        </div>
    );
};

export default OrderView;
