'use client';

import { useCurrency } from '@/app/contexts/CurrencyContext'; 
import { useState } from "react";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, addToWishlist } from "@/store/slices/productSlice";

const currencyRates = {
    AED: 1,
    USD: 0.27,
    EUR: 0.22
  };

const SingleLayoutTwo = ({singleData}) => {
    const dispatch = useDispatch();
    const [quantity, setquantity] = useState(1);
    const [productSize, setProductSize] = useState("");
    const getWishlist = useSelector((state) => state.productData.wishlistItems);
    const isWishlistAdded = getWishlist.filter((data) => data.id === singleData.id);
    const { currency } = useCurrency(); // Access currency from context

    const decrementQuantity = () => {
        if (quantity > 0) {
            setquantity(quantity - 1);
        }
    }
    const incrementQuantity = () => {
        setquantity(quantity + 1);
    }
    const handleAddToCart = (cartAddedData) => {
        let product = {...cartAddedData}
        if (quantity > 0) {
            product.cartQuantity = quantity;
            dispatch(addToCart(product));
        }else {
            alert("Please select minimum 1 quantity")
        }
    }
    const handleAddToWishlist = (product) => {
        dispatch(addToWishlist(product));
    }
    const convertPrice = (price) => {
        return (price * currencyRates[currency]).toFixed(2);
      };
    return (
        <section className="axil-single-product-area bg-color-white" style={{ backgroundColor: "#f9f3f0" }}>
            <div className="single-product-thumb axil-section-gap pb--30 pb_sm--20">
                <div className="container">
                    <div className="row row--50">
                        <div className="col-lg-6 mb--40">
                            <div className="h-100">
                                <div className="position-sticky sticky-top">
                                    <div className="single-product-thumbnail axil-product">
                                        <div className="thumbnail">
                                            <Image 
                                            src={singleData.thumbnail}
                                            width={595}
                                            height={595}
                                            alt={singleData.title}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 mb--40">
                            <div className="h-100">
                                <div className="position-sticky sticky-top">
                                    <div className="single-product-content nft-single-product-content">
                                        <div className="inner">
                                            <h2 className="product-title" style={{ paddingLeft: "25px" }}>{singleData.title}</h2>
                                            <div className="price-amount price-offer-amount" style={{ paddingLeft: "25px" }}>
                                                <span className="price current-price">{convertPrice(singleData.price)} {currency}</span>
                                            </div>
                                            {/* Start Product Action Wrapper  */}
                                            <div className="product-action-wrapper d-flex-center" style={{ paddingLeft: "25px" }}>
                                        <div className="pro-qty">
                                            <span className="qtybtn" onClick={decrementQuantity}>-</span>
                                            <input type="number" className="quantity-input" value={quantity} readOnly />
                                            <span className="qtybtn" onClick={incrementQuantity}>+</span>
                                        </div>
                                        <ul className="product-action d-flex-center mb--0">
                                            <li className="add-to-cart">
                                                <button disabled={(singleData.colorAttribute && !colorImage) || (singleData.sizeAttribute && !productSize) ? true : false} onClick={() => handleAddToCart(singleData)} className="axil-btn btn-bg-primary">Add to Cart</button>
                                            </li>
                                            <li className="wishlist">
                                                <button className="axil-btn wishlist-btn" onClick={() => handleAddToWishlist(singleData)}><i className={isWishlistAdded.length === 1 ? "fas fa-heart" : "far fa-heart"} /></button>
                                            </li>
                                        </ul>
                                    </div>
                                  
                                            <div className="woocommerce-tabs wc-tabs-wrapper bg-vista-white nft-info-tabs">
                                                <div className="container">
                                                    <ul className="nav tabs" id="myTab" role="tablist">
                                                        <li className="nav-item" role="presentation">
                                                            <a className="active" id="description-tab" data-bs-toggle="tab" href="#description" role="tab" aria-controls="description" aria-selected="true">Description</a>
                                                        </li>
                                                        <li className="nav-item " role="presentation">
                                                            <a id="additional-info-tab" data-bs-toggle="tab" href="#additional-info" role="tab" aria-controls="additional-info" aria-selected="false">Mixology</a>
                                                        </li>                                
                                                    </ul>
                                                    <div className="tab-content" id="myTabContent">
                                                        <div className="tab-pane fade show active" id="description" role="tabpanel" aria-labelledby="description-tab">
                                                            <div className="product-additional-info">
                                                                <p className="mb--15"><strong>{singleData.description.textDesc.title}</strong></p>
                                                                <p>{singleData.description.textDesc.text}</p>
                                                                <div className="table-responsive">
                                                                    <table>
                                                                        <tbody>
                                                                            {singleData.description.listDesc?.map((data, index)=> (
                                                                                <tr key={index}>
                                                                                    <th>{data.title}</th>
                                                                                    <td>{data.text}</td>
                                                                                </tr>
                                                                            ))}
                                                                        </tbody>
                                                                    </table>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="tab-pane fade" id="additional-info" role="tabpanel" aria-labelledby="additional-info-tab">
                                                            <div className="product-additional-info">
                                                         
                                                                <div className="table-responsive">
                                                                    <table>
                                                                        <tbody>
                                                                            {singleData.addInfo?.map((data, index)=> (
                                                                                <tr key={index}>
                                                                                    <th>{data.title}</th>
                                                                                    <td>{data.text}</td>
                                                                                </tr>
                                                                            ))}
                                                                        </tbody>
                                                                    </table>
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </section>
    );
}
export default SingleLayoutTwo;