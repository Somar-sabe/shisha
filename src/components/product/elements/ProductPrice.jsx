import { useCurrency } from '@/app/contexts/CurrencyContext'; // Import the custom hook
const currencyRates = {
  AED: 1,
  USD: 0.27,
  EUR: 0.22
};
const ProductPrice = (props) => {
  const { currency } = useCurrency(); // Access currency from context

      // Function to convert prices based on selected currency
      const convertPrice = (price) => {
        return (price * currencyRates[currency]).toFixed(2);
      };
    return ( 
        <div className="product-price-variant">
              {props.price.salePrice ? (
                <span className="price old-price">
                {convertPrice(props.price.price)} 
                  <span className="currency-symbol"> {currency}</span>
                </span>
              ) : (
                ""
              )}
              <span className="price current-price">
                
                {props.price.salePrice
                  ? convertPrice(props.price.salePrice)
                  : convertPrice(props.price.price)}
                  <span className="currency-symbol"> {currency}</span>
              </span>
            </div>
     );
}
 
export default ProductPrice;