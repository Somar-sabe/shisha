'use client';

import { useState, useEffect } from "react";
import Section from "@/components/elements/Section";
import ProductsData from "@/data/Products";
import ProductSeven from "@/components/product/ProductSeven";
import { useSearchParams } from "next/navigation"; // Use the `useSearchParams` hook from Next.js

const ShopWithSidebar = () => {
    const searchParams = useSearchParams();
    const category = searchParams.get("category"); // Get the category from query params

    const [filterProduct, setFilterProduct] = useState(ProductsData);
    const [productShow, setProductShow] = useState(9);

    // Filter products based on category from URL
    useEffect(() => {
        if (category) {
            // Normalize category string (replace spaces with hyphens and lowercase the string)
            const normalizedCategory = category.toLowerCase().replace(/\s+/g, '-');

            const filtered = ProductsData.filter(product => 
                product.pCate.toLowerCase().replace(/\s+/g, '-') === normalizedCategory
            );
            setFilterProduct(filtered);
        } else {
            setFilterProduct(ProductsData); // Show all products if no category is selected
        }
    }, [category]);

    const ProductShowHandler = () => {
        setProductShow(productShow + 3);
    };

    return (
        <Section pClass="axil-shop-area">
            <div className="row">
                <div className="col-lg-3">
                    {/* Sidebar and filters */}
                </div>
                <div className="col-lg-9">
                    <div className="row row--15">
                        {filterProduct.length > 0 ? filterProduct.slice(0, productShow).map((data) => (
                            <div className="col-xl-4 col-sm-6" key={data.id}>
                                <ProductSeven product={data} pClass="mb--30" />
                            </div>
                        )) : <h4 className="text-center pt--30">No Product Found</h4>}
                    </div>
                    <div className="text-center pt--20">
                        <button className="axil-btn btn-bg-lighter btn-load-more" onClick={ProductShowHandler}>
                            {filterProduct.length < productShow ? "No More Data" : "Load more"}
                        </button>
                    </div>
                </div>
            </div>
        </Section>
    );
};

export default ShopWithSidebar;
