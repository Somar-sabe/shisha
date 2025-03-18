'use client';
import { useRouter } from 'next/navigation'
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from "react-redux";
import Section from "@/components/elements/Section";
import FooterTwo from "@/components/footer/FooterTwo";
import HeaderFive from "@/components/header/HeaderFive";
import ServiceTwo from "@/components/services/ServiceTwo";
import { useCurrency } from '@/app/contexts/CurrencyContext'; // Import the custom hook
const currencyRates = {
  AED: 1,
  USD: 0.27,
  EUR: 0.22
};

const Checkout = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const cartProducts = useSelector((state) => state.productData);
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();
      const checkoutFormHandler = async (data, e) => {
        const { cartItems, cartTotalAmount } = cartProducts;
        const { paymentMethod, firstName, lastName, phone, country } = data; // Get the selected payment method and customer name
    
        const orderId = `ORD-${Date.now()}`; // Generate an orderId using the current timestamp
        const customerName = `${firstName} ${lastName}`; // Combine first name and last name
    
        const orderData = {
            orderId,
            phone,
            customerName,
            cartItems,
          country,
            totalAmount: cartTotalAmount,
            paymentMethod, // Set payment method to what the user selected (can be 'cash' or 'ziina')
            customerEmail: data.email, // Add customer email if it's missing
        };
    
        try {
            // Call the saveOrder API to save the order data before proceeding with payment
            const saveOrderResponse = await fetch('/api/saveOrder', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(orderData),
            });
    
            const saveOrderResult = await saveOrderResponse.json();
    
            if (saveOrderResult.success) {
                console.log('Order saved successfully!');
            } else {
                console.error('Failed to save order:', saveOrderResult.message);
                return; // If saving fails, stop further execution
            }
    
            // Now, proceed with the payment flow
            if (paymentMethod === "cash" || paymentMethod === "ziina") {
                // If either 'cash' or 'ziina' (Pay by card) is selected, treat them both as cash on delivery
                localStorage.setItem('orderData', JSON.stringify(orderData)); // Save order data to localStorage
                router.push('/checkout/order-received'); // Redirect to the order received page
            }
    
        } catch (error) {
            console.error('Error processing checkout:', error);
        }
    };    
    
    const { currency } = useCurrency(); // Access currency from context

    // Function to convert prices based on selected currency
    const convertPrice = (price) => {
      return (price * currencyRates[currency]).toFixed(2);
    };
    return ( 
        <>
        <HeaderFive headerSlider />
        <main className="main-wrapper">
            <Section pClass="axil-checkout-area">
                {cartProducts.cartItems.length > 0 ? 
                <form onSubmit={handleSubmit(checkoutFormHandler)}>
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="axil-checkout-billing">
                                <h4 className="title mb--40">Billing details</h4>
                                <div className="row">
                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <label>First Name <span>*</span></label>
                                            <input type="text" {...register('firstName', { required: true })} placeholder="Adam"  />
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
                                            <label>City<span>*</span></label>
                                            <select {...register('country', { required: true })}>
                                                <option value="">Select a City</option>
                                                <option value="dubai">Dubai</option>
                                                <option value="sharjah">Sharjah</option>
                                                <option value="abudhabi">Abu Dhabi</option>
                                                <option value="ajman">Ajman</option>
                                                <option value="rak">RAK</option>
                                                <option value="fujairah">Fujairah</option>
                                            </select>
                                            {errors.country && <p className="error">Country Name is required.</p>}
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Street Address <span>*</span></label>
                                            <input type="text" {...register('street1', { required: true })} placeholder="House number and street name"/>
                                            {errors.street1 && <p className="error">Street Address is required.</p>}
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Street Address</label>
                                            <input type="text" {...register('street2')} placeholder="Apartment, suite, unit, etc. (optonal)"/>
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Phone <span>*</span></label>
                                            <input type="number" {...register('phone', { required: true, maxLength: 11 })} />
                                            {errors.phone && <p className="error">Please enter 11 digit phone number.</p>}
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Email Address <span>*</span></label>
                                            <input type="email" {...register('email', { required: true })}    name="email" autoComplete="email" />
                                            {errors.email && <p className="error">Email is required.</p>}
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-group input-group">
                                        <input {...register("createAccount")} id="accountCreate" type="checkbox" value="true" />
                                        <label htmlFor="accountCreate">Create an account</label>
                                        </div>
                                    </div>

                                   
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Other Notes (optional)</label>
                                            <textarea rows="2" {...register('notes')} placeholder="Notes about your order, e.g. speacial notes for delivery."></textarea>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
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
                                                    <td>{convertPrice(items.price)} {currency}</td>
                                                </tr>
                                            ))}
                                            <tr className="order-subtotal">
                                                <td>Subtotal</td>
                                                <td>{convertPrice(cartProducts.cartTotalAmount)} {currency}</td>
                                            </tr>
                                          <tr className="order-total">
                                                <td>Total</td>
                                                <td className="order-total-amount">{convertPrice(cartProducts.cartTotalAmount)} {currency}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className="order-payment-method">
                                    <div className="single-payment">
                                        <div className="input-group">
                                            <input type="radio" {...register("paymentMethod")} id="ziina" value="ziina" />
                                            <label htmlFor="ziina">Pay By card</label>
                                        </div>
                                        <p>Pay securely using Straipe api. You will be redirected to Stripe api for payment.</p>
                                    </div>

                                    <div className="single-payment">
                                        <div className="input-group">
                                            <input type="radio" {...register("paymentMethod")} id="cash" value="cash" />
                                            <label htmlFor="cash">Cash on delivery</label>
                                        </div>
                                        <p>Pay with cash upon delivery.</p>
                                    </div>

                                </div>
                                <button type="submit" className="axil-btn btn-bg-primary checkout-btn">Process to Checkout</button>
                            </div>
                        </div>
                    </div>
                </form>
                : 
                <div className="text-center">
                    <h4>There is no item for checkout</h4>
                    <Link href="/shop" className="axil-btn btn-bg-primary">Back to shop</Link>
                </div>                            

                }
            </Section>
            <ServiceTwo />
        </main>
        <FooterTwo />
        </>
    )
};

export default Checkout;
