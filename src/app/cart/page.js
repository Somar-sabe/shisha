"use client";
import { useCurrency } from '@/app/contexts/CurrencyContext'; // Import the custom hook
import Image from "next/image";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import HeaderFive from "@/components/header/HeaderFive";
import { slugify } from "@/utils";
import { removeCartItem, cartQuantityIncrease, cartQuantityDecrease, cartClear, updateCartAmount } from "@/store/slices/productSlice";
import FooterTwo from "@/components/footer/FooterTwo";

// Example currency rates (1 AED = 0.27 USD, 1 AED = 0.22 EUR)
const currencyRates = {
  AED: 1,
  USD: 0.27,
  EUR: 0.22
};

const Cart = () => {
    const dispatch = useDispatch();
    const cartProducts = useSelector((state) => state.productData);
    const { currency } = useCurrency(); // Access currency from context

    const removeCartHandler = (data) => {
        dispatch(removeCartItem(data));
    };

    const quantityIncreaseHandler = (data) => {
        dispatch(cartQuantityIncrease(data));
    };

    const quantityDecreaseHandler = (data) => {
        dispatch(cartQuantityDecrease(data));
    };

    const cartClearHandler = () => {
        dispatch(cartClear());
    };

    const updateCartHandler = () => {
        dispatch(updateCartAmount());
    };

    // Function to convert prices based on selected currency
    const convertPrice = (price) => {
      return (price * currencyRates[currency]).toFixed(2);
    };

    return (
        <>
            <HeaderFive headerSlider />
            <main className="main-wrapper">
                <div className="axil-product-cart-area axil-section-gap">
                    <div className="container">
                        {cartProducts.cartItems.length > 0 ? 
                            <div className="axil-product-cart-wrap">
                                <div className="product-table-heading">
                                    <h4 className="title">Your Cart</h4>
                                    <button className="cart-clear" onClick={() => cartClearHandler()}>Clear Shopping Cart</button>
                                </div>
                                <div className="table-responsive">
                                    <table className="table axil-product-table axil-cart-table mb--40">
                                        <thead>
                                            <tr>
                                                <th scope="col" className="product-remove" />
                                                <th scope="col" className="product-thumbnail">Product</th>
                                                <th scope="col" className="product-title" />
                                                <th scope="col" className="product-price">Price</th>
                                                <th scope="col" className="product-quantity">Quantity</th>
                                                <th scope="col" className="product-subtotal">Subtotal</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {cartProducts.cartItems.map((product) => (
                                                <tr key={product.id}>
                                                    <td className="product-remove">
                                                        <button className="remove-wishlist" onClick={() => removeCartHandler(product)}>
                                                            <i className="fal fa-times" />
                                                        </button>
                                                    </td>
                                                    <td className="product-thumbnail">
                                                        <Link href={`/products/${slugify(product.id)}`}>
                                                            <Image 
                                                                src={product.thumbnail}
                                                                width={80}
                                                                height={80}
                                                                alt={product.title}
                                                            />
                                                        </Link>
                                                    </td>
                                                    <td className="product-title">
                                                        <Link href={`/products/${slugify(product.id)}`}>
                                                            {product.title}
                                                        </Link>
                                                    </td>
                                                    <td className="product-price" data-title="Price">
                                                        {product.salePrice ? convertPrice(product.salePrice) : convertPrice(product.price)}
                                                        <span className="currency-symbol"> {currency}</span>
                                                    </td>
                                                    <td className="product-quantity" data-title="Qty">
                                                        <div className="pro-qty">
                                                            <span className="qtybtn" onClick={() => quantityDecreaseHandler(product)}>-</span>
                                                            <input type="number" className="quantity-input" value={product.cartQuantity} readOnly />
                                                            <span className="qtybtn" onClick={() => quantityIncreaseHandler(product)}>+</span>
                                                        </div>
                                                    </td>
                                                    <td className="product-subtotal" data-title="Subtotal">
                                                        {parseFloat(product.salePrice ? convertPrice(product.salePrice) * product.cartQuantity : convertPrice(product.price) * product.cartQuantity).toFixed(2)}
                                                        <span className="currency-symbol"> {currency}</span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <div className="cart-update-btn-area">
                                    <div className="input-group product-coupon">
                                        <input placeholder="Enter coupon code" type="text" />
                                        <div className="product-coupon-btn">
                                            <button type="submit" className="axil-btn btn-outline">Apply</button>
                                        </div>
                                    </div>
                                    <div className="update-btn">
                                        <button className="axil-btn btn-outline" onClick={() => updateCartHandler()}>Update Cart</button>
                                    </div>
                                </div>
                            </div> :
                            <div className="text-center">
                                <h4>Your Cart is empty</h4>
                                <Link className="axil-btn btn-bg-primary" href="/shop">Back to shop</Link>
                            </div>
                        }
                    </div>
                </div>
            </main>
            <FooterTwo />
        </>
    );
};

export default Cart;
