import ProductsData from "@/data/Products";
import ProductSeven from "@/components/product/ProductSeven";
import { slugify } from "@/utils";
import SingleLayouThree from "./SingleLayouThree";
import Section from "@/components/elements/Section";
import SectionTitle from "@/components/elements/SectionTitle";
import SingleLayouSeven from "./SingleLayouSeven";
import SingleLayoutOne from "./SingleLayoutOne";
import SingleLayoutTwo from "./SingleLayoutTwo";
import SingleLayoutFour from "./SingleLayoutFour";

const ProductDetails = ({ params }) => {
  // تنظيف المنتجات: استبعاد أي عنصر مفقود id أو pCate
  const cleanProducts = ProductsData.filter(
    (p) => p && typeof p.id === "string" && p.id.trim() && typeof p.pCate === "string" && p.pCate.trim()
  );

  // البحث عن المنتج حسب params.id
  const singleProduct = cleanProducts.find(
    (p) => slugify(p.id) === slugify(params.id)
  );

  if (!singleProduct) {
    return <div>Product not found</div>;
  }

  // المنتجات المرتبطة
  const relatedProduct = cleanProducts.filter(
    (p) =>
      p.id !== singleProduct.id &&
      slugify(p.pCate) === slugify(singleProduct.pCate)
  );

  const ProductSingleLayout = () => {
    switch (singleProduct.pCate) {
      case "NFT":
        return <SingleLayouSeven singleData={singleProduct} />;
      case "Electronics":
        return <SingleLayoutOne singleData={singleProduct} />;
      case "Fashion":
        return <SingleLayoutFour singleData={singleProduct} />;
      case "Furniture":
        return <SingleLayouThree singleData={singleProduct} />;
      default:
        return <SingleLayoutTwo singleData={singleProduct} />;
    }
  };

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
          {relatedProduct.slice(0, 4).map((data) => (
            <div className="col-xl-3 col-lg-4 col-sm-6" key={data.id}>
              <ProductSeven product={data} />
            </div>
          ))}
        </div>
      </Section>
    </>
  );
};

export default ProductDetails;

// توليد static params مع حماية ضد أي id غير موجود
export async function generateStaticParams() {
  const validProducts = ProductsData.filter(
    (p) => p && typeof p.id === "string" && p.id.trim()
  );

  return validProducts.map((p) => ({
    id: slugify(p.id),
  }));
}
