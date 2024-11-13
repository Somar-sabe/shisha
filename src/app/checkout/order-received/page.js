'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import HeaderFive from './HeaderFive';  // Assuming you have a HeaderFive component
import FooterTwo from './FooterTwo';    // Assuming you have a FooterTwo component
import Section from './Section';        // Assuming you have a Section component

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
          {orderData ? (
            <>
              <h1 className="thank-you-text">Thank you. Your order has been received.</h1>
              <ul className="order-overview">
                <li className="overview-item order-number">
                  ORDER NUMBER: <strong>{orderData.orderId}</strong>
                </li>
                <li className="overview-item order-number">
                  DATE: <strong>{new Date(orderData.orderDate).toLocaleDateString()}</strong>
                </li>
                <li className="overview-item order-number">
                  EMAIL: <strong>{orderData.billingAddress.email}</strong>
                </li>
                <li className="overview-item order-number">
                  TOTAL: <strong>{orderData.totalAmount} AED</strong>
                </li>
                <li className="overview-item order-number">
                  PAYMENT METHOD: <strong>{orderData.paymentMethod === 'cash' ? 'Cash on Delivery' : 'Card Payment'}</strong>
                </li>
              </ul>
              <div className="order-details">
                <h5 className="block-title">Order details</h5>
                <table className="table">
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orderData.cartItems.map((item, index) => (
                      <tr key={index}>
                        <td>{item.title} <strong>X {item.cartQuantity}</strong></td>
                        <td>{item.salePrice || item.price} AED</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <th>Subtotal:</th>
                      <th>{orderData.totalAmount} AED</th>
                    </tr>
                    <tr>
                      <th>Shipping:</th>
                      <th>Flat rate</th>
                    </tr>
                    <tr>
                      <th>Payment Method:</th>
                      <th>{orderData.paymentMethod === 'cash' ? 'Cash on Delivery' : 'Card Payment'}</th>
                    </tr>
                    <tr>
                      <th>Total:</th>
                      <th>{orderData.totalAmount} AED</th>
                    </tr>
                  </tfoot>
                </table>
              </div>
              <div className="customer-details">
                <div className="row">
                  <div className="col-lg-6">
                    <div className="customer-address">
                      <h5 className="block-title">Billing address</h5>
                      <address>
                        {orderData.billingAddress.firstName} {orderData.billingAddress.lastName} <br />
                        {orderData.billingAddress.companyName}<br />
                        {orderData.billingAddress.street1}<br />
                        {orderData.billingAddress.street2}<br />
                        {orderData.billingAddress.city}<br />
                        {orderData.billingAddress.country}<br />
                        <p className="address-phone"><i className="far fa-phone"></i> {orderData.billingAddress.phone}</p>
                        <p className="address-email"><i className="far fa-envelope"></i> {orderData.billingAddress.email}</p>
                      </address>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="customer-address">
                      <h5 className="block-title">Shipping address</h5>
                      {orderData.billingAddress.shippingDifferent === "true" ? (
                        <address>
                          {orderData.shippingAddress.name} <br />
                          {orderData.shippingAddress.street1}<br />
                          {orderData.shippingAddress.street2}<br />
                          {orderData.shippingAddress.city}<br />
                          {orderData.shippingAddress.country}<br />
                          <p className="address-phone"><i className="far fa-phone"></i> {orderData.shippingAddress.phone}</p>
                          <p className="address-email"><i className="far fa-envelope"></i> {orderData.shippingAddress.email}</p>
                        </address>
                      ) : (
                        <address>
                          {orderData.billingAddress.firstName} {orderData.billingAddress.lastName} <br />
                          {orderData.billingAddress.companyName}<br />
                          {orderData.billingAddress.street1}<br />
                          {orderData.billingAddress.street2}<br />
                          {orderData.billingAddress.city}<br />
                          {orderData.billingAddress.country}<br />
                          <p className="address-phone"><i className="far fa-phone"></i> {orderData.billingAddress.phone}</p>
                          <p className="address-email"><i className="far fa-envelope"></i> {orderData.billingAddress.email}</p>
                        </address>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <p>Loading order details...</p>
          )}
        </Section>
      </main>
      <FooterTwo />
    </>
  );
};

export default OrderReceived;
