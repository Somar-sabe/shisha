'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const Checkout = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const checkoutFormHandler = async (data) => {
        // Define the paymentRequest object
        const paymentRequest = {
            amount: 1000,  // Sample amount in AED for testing
            currency: "AED",
            customer: {
                name: "John Doe",
                email: "john.doe@example.com",
                phone: "1234567890",
            },
            description: "Test Order Payment",
            callback_url: "https://example.com/checkout/order-received",
        };

        setLoading(true); // Set loading state to true

        try {
            const response = await fetch("https://shisha-zeta.vercel.app/api/payment-intent", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(paymentRequest),
            });

            const paymentResponse = await response.json();

            if (paymentResponse.status === "success") {
                router.push(paymentResponse.payment_url); // Redirect if success
            } else {
                console.error("Payment initiation failed", paymentResponse.message);
                alert("There was an issue with your payment. Please try again.");
            }
        } catch (error) {
            console.error("Error processing payment", error);
            alert("Payment processing failed. Please try again later.");
        } finally {
            setLoading(false); // Set loading state to false after request is complete
        }
    };

    return (
        <div>
            <h1>Checkout</h1>
            <button onClick={() => checkoutFormHandler()} disabled={loading}>
                {loading ? "Processing..." : "Place Order"}
            </button>
        </div>
    );
};

export default Checkout;
