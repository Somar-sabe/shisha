import ProductsData from "@/data/Products";
import ProductSeven from "@/components/product/ProductSeven";
import Section from "@/components/elements/Section";
import SectionTitle from "@/components/elements/SectionTitle";
import SingleLayouThree from "./SingleLayouThree";
import SingleLayouSeven from "./SingleLayouSeven";
import SingleLayoutOne from "./SingleLayoutOne";
import SingleLayoutTwo from "./SingleLayoutTwo";
import SingleLayoutFour from "./SingleLayoutFour";
import { notFound } from "next/navigation";

export default async function ProductDetails(props) {
  // ✅ Next 16 / Turbopack: params ممكن يكون Promise
  const params = await props.params;
  const rawId = params?.id;

  if (!rawId) return notFound();

  const idNum = Number(rawId);
  if (Number.isNaN(idNum)) return notFound();

  const singleProduct = ProductsData.find((p) => Number(p?.id) === idNum);
  if (!singleProduct) return notFound();

  const relatedProduct = ProductsData.filter(
    (p) =>
      Number(p?.id) !== Number(singleProduct.id) &&
      String(p?.pCate || "").trim().toLowerCase() ===
        String(singleProduct.pCate || "").trim().toLowerCase()
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
            <div className="col-xl-3 col-lg-4 col-sm-6" key={String(data.id)}>
              <ProductSeven product={data} />
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}

export function generateStaticParams() {
  return ProductsData.map((p) => ({ id: String(p.id) }));
}
