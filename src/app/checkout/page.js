'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from "react-redux";
import Section from "@/components/elements/Section";
import HeaderFive from "@/components/header/HeaderFive";
import { addToOrder } from '@/store/slices/productSlice';

const Checkout = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const [openShippingForm, setopenShippingForm] = useState(false);
    const cartProducts = useSelector((state) => state.productData);

    const ShippingInfoHandler = (e) => {
        setopenShippingForm(e.target.checked);
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const checkoutFormHandler = async (data, e) => {
        if (data) {
            const orderData = {
                billingAddress: {
                    firstName: data.firstName,
                    lastName: data.lastName,
                    companyName: data.companyName,
                    country: data.country,
                    street1: data.street1,
                    street2: data.street2,
                    city: data.city,
                    phone: data.phone,
                    email: data.email,
                    createAccount: data.createAccount,
                    notes: data.notes,
                    shippingDifferent: data.shippingDifferent,
                    payment: data.paymentMethod,
                },
                shippingAddress: data.shippingDifferent === "true" ? {
                    name: data.shippingName,
                    email: data.shippingEmail,
                    phone: data.shippingPhone,
                    country: data.shippingCountry,
                    street1: data.shippingStreet1,
                    street2: data.shippingStreet2,
                    city: data.shippingCity,
                } : null,
                items: cartProducts.cartItems,
                totalAmount: cartProducts.cartTotalAmount,
                totalQuantity: cartProducts.cartQuantityTotal,
                orderDate: new Date().toLocaleString(),
            };

            dispatch(addToOrder(orderData));

            try {
                const paymentRequest = {
                    amount: cartProducts.cartTotalAmount,
                    currency: "AED",
                    customer: {
                        name: `${data.firstName} ${data.lastName}`,
                        email: data.email,
                        phone: data.phone,
                    },
                    description: "Order Payment",
                    callback_url: "https://shisha-zeta.vercel.app/checkout/order-received",
                };

                const response = await fetch("/api/payment-intent", {  // API call should be made to a server-side endpoint
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(paymentRequest),
                });

                const paymentResponse = await response.json();

                if (paymentResponse.status === "success") {
                    router.push(paymentResponse.payment_url);
                } else {
                    console.error("Payment initiation failed", paymentResponse.message);
                    alert("There was an issue with your payment. Please try again.");
                }
            } catch (error) {
                console.error("Error processing payment", error);
                alert("Payment processing failed. Please try again later.");
            }
        }
    };

    return (
        <>
            <HeaderFive headerSlider />
            <main className="main-wrapper">
                <Section pClass="axil-checkout-area">
                    {cartProducts.cartItems.length > 0 ? 
                    <form onSubmit={handleSubmit(checkoutFormHandler)}>
                        {/* Billing Form Fields */}
                        <div className="row">
                            <div className="col-lg-6">
                                <div className="axil-checkout-billing">
                                    <h4 className="title mb--40">Billing details</h4>
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <div className="form-group">
                                                <label>First Name <span>*</span></label>
                                                <input type="text" {...register('firstName', { required: true })} placeholder="Adam" />
                                                {errors.firstName && <p className="error">First Name is required.</p>}
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="form-group">
                                                <label>Last Name <span>*</span></label>
                                                <input type="text" {...register('lastName', { required: true })} placeholder="John" />
                                                {errors.lastName && <p className="error">Last Name is required.</p>}
                                            </div>
                                        </div>
                                        <div className="col-lg-12">
                                            <div className="form-group">
                                                <label>Company Name</label>
                                                <input type="text" {...register('companyName')} />
                                            </div>
                                        </div>
                                        <div className="col-lg-12">
                                            <div className="form-group">
                                                <label>City<span>*</span></label>
                                                <select {...register('country', { required: true })}>
                                                    <option value="">Select a Country</option>
                                                    <option value="Australia">Dubai</option>
                                                    <option value="Australia">Sharjah</option>
                                                    <option value="New Zealand">Abo Dhabi</option>
                                                    <option value="Switzerland">Ajman</option>
                                                    <option value="United Kindom (UK)">RAK</option>
                                                    <option value="United States (USA)">Alfujeirah</option>
                                                </select>
                                                {errors.country && <p className="error">Country Name is required.</p>}
                                            </div>
                                        </div>
                                        {/* Additional Form Fields */}
                                    </div>
                                </div>
                            </div>
                            {/* Order Summary */}
                            <div className="col-lg-6">
                                <div className="axil-order-summery order-checkout-summery">
                                    <h5 className="title mb--20">Your Order</h5>
                                    <div className="summery-table-wrap">
                                        <table className="table summery-table">
                                            <thead>
                                                <tr>
                                                    <th>Product</th>
                                                    <th>Subtotal</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {cartProducts.cartItems.map((items, index) => (
                                                    <tr className="order-product" key={index}>
                                                        <td>{items.title} <span className="quantity">x{items.cartQuantity}</span></td>
                                                        <td>{items.salePrice ? items.salePrice : items.price} AED</td>
                                                    </tr>
                                                ))}
                                                <tr className="order-subtotal">
                                                    <td>Subtotal</td>
                                                    <td>{cartProducts.cartTotalAmount} AED</td>
                                                </tr>
                                                {/* Shipping Info */}
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="checkout-btn">
                                        <button type="submit" className="axil-btn">Place Order</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                    : <p>Your cart is empty.</p>}
                </Section>
            </main>
        </>
    );
}

export default Checkout;
