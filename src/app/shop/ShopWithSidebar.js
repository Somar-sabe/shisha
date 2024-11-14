'use client';
import { useState, useEffect } from "react";
import Section from "@/components/elements/Section";
import ProductsData from "@/data/Products";
import ProductSeven from "@/components/product/ProductSeven";
import { slugify } from "@/utils";
import { Category } from "@/data/ProductCategory";

const ShopWithSidebar = () => {
    const [filterProduct, setFilterProduct] = useState(ProductsData);
    const [productShow, setProductShow] = useState(9);
    const [filterText, setFilterText] = useState('');
    const [cateToggle, setCateToggle] = useState(true);

    const getCategoryFromURL = () => {
        const params = new URLSearchParams(window.location.search);
        return params.get('category');
    }

    const updateCategoryInURL = (category) => {
        const params = new URLSearchParams(window.location.search);
        params.set('category', category); // Add or update the category parameter
        window.history.pushState({}, '', '?' + params.toString());
    }

    const categoryHandler = (cateSelect) => {
        const cateFilterProduct = ProductsData.filter((data) => slugify(data.pCate) === cateSelect);
        setFilterProduct(cateFilterProduct);
        setFilterText(cateSelect);
        updateCategoryInURL(cateSelect); // Update the URL with the selected category
    }

    const ProductShowHandler = () => {
        setProductShow(productShow + 3);
    }

    useEffect(() => {
        const categoryFromURL = getCategoryFromURL();
        console.log('Category from URL:', categoryFromURL); // Debugging log
        if (categoryFromURL) {
            setFilterText(categoryFromURL);
            const cateFilterProduct = ProductsData.filter((data) => slugify(data.pCate) === categoryFromURL);
            setFilterProduct(cateFilterProduct);
        }
    }, []);

    return (
        <Section pClass="axil-shop-area">
            <div className="row">
                <div className="col-lg-3">
                    <div className="axil-shop-sidebar">
                        <div className="d-lg-none">
                            <button className="sidebar-close filter-close-btn"><i className="fas fa-times" /></button>
                        </div>
                        <div className={`toggle-list product-categories ${cateToggle ? "active" : ""}`}>
                            <h6 onClick={() => setCateToggle(!cateToggle)} className="title">CATEGORIES</h6>
                            {cateToggle && 
                                <div className="shop-submenu">
                                    <ul>
                                        {Category.map((data, index) => (
                                            <li className={filterText === slugify(data.cate) ? "current-cat" :""} key={index}>
                                                <button onClick={() => categoryHandler(slugify(data.cate))}>{data.cate}</button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            }
                        </div>
                    </div>
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
                        <button className={`axil-btn btn-bg-lighter btn-load-more ${filterProduct.length < productShow ? "disabled" : ""}`} onClick={ProductShowHandler}>{filterProduct.length < productShow ? "No More Data" : "Load more"}</button>
                    </div>
                </div>
            </div>
        </Section>
    );
}

export default ShopWithSidebar;
