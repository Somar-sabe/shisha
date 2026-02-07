'use client';

import Link from "next/link";
import { useDispatch } from "react-redux";
import { addToCart } from "@/store/slices/productSlice";
import { reviewAverage } from "@/utils";
import ProductPrice from "./elements/ProductPrice";
import ProductThumbnail from "./elements/ProductThumbnail";
import ProductTitle from "./elements/ProductTitle";
import { ProductReview } from "@/data/Comments";

const ProductSeven = ({ product }) => {
  // ✅ بدون slugify للأرقام
  const findReview = ProductReview.filter(
    (data) => String(data.productId) === String(product.id)
  );
  const ratingNumber = reviewAverage(findReview); // إذا عم تستخدمه بمكان تاني

  const dispatch = useDispatch();

  const handleAddToCart = (e) => {
    e.preventDefault();   // ✅ مهم: حتى ما يفتح الرابط
    e.stopPropagation();  // ✅ مهم
    dispatch(addToCart(product));
  };

  return (
    <Link
      href={`/products/${product.id}`}
      className="axil-product product-style-seven"
      style={{ display: "block", textDecoration: "none" }}
    >
      <div className="product-content">
        <div className="cart-btn">
          <button
            type="button"
            style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
            onClick={handleAddToCart}
          >
            <i className="far fa-shopping-cart" />
          </button>
        </div>

        <div className="inner">
          <ProductTitle productTitle={product} />
          <ProductPrice price={product} />
        </div>
      </div>

      <ProductThumbnail productThumb={product} />
    </Link>
  );
};

export default ProductSeven;
