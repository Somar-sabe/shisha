import Link from "next/link";
import { useTranslation } from 'next-i18next';

const ProductTitle = (props) => {
  const { t } = useTranslation();  
  const CustomTag = props.titleTag ? props.titleTag : "h5";
  const productKey = props.productTitle.title.replace(/\s+/g, "").toLowerCase();

  // Use the product name as the key for translation

  return (
    <CustomTag className="title">
      <Link href={`/products/${props.productTitle.id}`}>
      {t(`products.${productKey}.title`)} {/* Use the product name as the key */}
        {props.verified && 
          <span className="verified-icon">
            <i className="fas fa-badge-check" />
          </span>
        }
      </Link>
    </CustomTag>
  );
};

export default ProductTitle;
