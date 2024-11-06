'use client';
import Image from "next/image";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import FsLightbox from "fslightbox-react";
import { addToCart, addToWishlist } from "@/store/slices/productSlice";
import SlickSlider from "@/components/elements/SlickSlider";
import { discountPercentage, reviewAverage, slugify } from "@/utils";
import { ProductReview } from "@/data/Comments";
import ProductRating from "@/components/product/elements/ProductRating";

const SingleLayouThree = ({ singleData }) => {
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
                                            <h2 className="product-title">{singleData.title}</h2>
                                            <div className="price-amount price-offer-amount">
                                                <span className="price current-price">{singleData.price} AED</span>
                                            </div>
                                            {/* Start Product Action Wrapper  */}
                                            <div className="product-action-wrapper d-flex-center">
                                                {/* Start Product Action  */}
                                                <ul className="product-action action-style-two d-flex-center mb--0">
                                                    <li className="add-to-cart"><a href={singleData.buyUrl} className="axil-btn btn-bg-primary">Buy Product</a></li>
                                                </ul>
                                                {/* End Product Action  */}
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
export default SingleLayouThree;