'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Section from "@/components/elements/Section";
import FooterTwo from "@/components/footer/FooterTwo";
import HeaderFive from "@/components/header/HeaderFive";

const OrderReceived = () => {
  const [orderData, setOrderData] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const order = JSON.parse(localStorage.getItem('orderData'));
    if (order) {
      setOrderData(order);
    } else {
      router.push('/checkout'); // Redirect to checkout if no order data found
    }
  }, [router]);

  return (
    <>
    <HeaderFive />
        <main className="main-wrapper">
            <Section pClass="order-received">
    <div>
      {orderData ? (
        <div>
          <h1>Thank you for your order!</h1>
          <p>Your order has been received. Here are your order details:</p>
          <ul className="order-overview">
            {orderData.cartItems.map((item, index) => (
              <li className="overview-item order-number" key={index}>{item.title} x {item.cartQuantity} - {item.salePrice || item.price} AED</li>
            ))}
          </ul>
          <p>Total Amount: {orderData.totalAmount} AED</p>
          <p>Payment Method: {orderData.paymentMethod === 'cash' ? 'Cash on Delivery' : 'Card Payment'}</p>
        </div>
      ) : (
        <p>Loading order details...</p>
      )}
    </div>
    </Section>
            </main>
        <FooterTwo />
        </>
  );
};

export default OrderReceived;
