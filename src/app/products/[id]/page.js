import ProductsData from "@/data/Products";
import ProductSeven from "@/components/product/ProductSeven";
import { slugify } from "@/utils";
import SlickSlider from "@/components/elements/SlickSlider";
import SingleLayouThree from "./SingleLayouThree";
import Section from "@/components/elements/Section";
import SectionTitle from "@/components/elements/SectionTitle";
import SingleLayouSeven from "./SingleLayouSeven";
import SingleLayoutOne from "./SingleLayoutOne";
import SingleLayoutTwo from "./SingleLayoutTwo";
import SingleLayoutFour from "./SingleLayoutFour";

const ProductDetails = ({ params }) => {
    const findProduct = ProductsData.filter(product => slugify(product.id) === slugify(params.id));
    const singleProduct = findProduct[0];
    const productCategory = singleProduct.pCate;
    const relatedProduct = ProductsData.filter(product => slugify(product.pCate) === slugify(productCategory));

    const ProductSingleLayout = () => {
        switch (singleProduct.pCate) {
            case "NFT":
                return <SingleLayouSeven singleData={singleProduct} />
                break;
            case "Electronics":
                return <SingleLayoutOne singleData={singleProduct} />
             
                break;
            case "Fashion":
                return <SingleLayoutFour singleData={singleProduct} />
                break;
            case "Furniture":
                return <SingleLayouThree singleData={singleProduct} />
                
                
                break;
            default:
                return <SingleLayoutTwo singleData={singleProduct} />
                break;
        }
    }

    return (
        <>
            <ProductSingleLayout />
            <Section pClass="pb--0" borderBottom="pb--50">
                <SectionTitle 
                    title="Viewed Items"
                    subtitle="Your Recently"
                    subtitleIcon="far fa-shopping-basket"
                    subColor="highlighter-primary"
                />
                <div className="row">
                {relatedProduct?.slice(0, 4).map((data) => (
                        <div className="col-xl-3 col-lg-4 col-sm-6" key={data.id}>
                            <ProductSeven product={data} />
                        </div>
                    ))}
                </div>
            </Section>
        </>
    );
}

export default ProductDetails;


export async function generateStaticParams() {
    const products = ProductsData;

    return products.map((post) => ({
        id: slugify(post.id),
    }));
}