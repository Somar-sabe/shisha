import Image from "next/image";
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from "react-redux";
import { removeCartItem, miniCartHandler } from "@/store/slices/productSlice";
import { useCurrency } from '@/app/contexts/CurrencyContext'; // Import the custom hook
import { useTranslation } from 'next-i18next';
const currencyRates = {
  AED: 1,
  USD: 0.27,
  EUR: 0.22
};


const MiniCart = () => {
  const { t } = useTranslation(); 
const dispatch = useDispatch();
const getProducts = useSelector((state) => state.productData);
const router = useRouter();

const removeCartHandler = (data) => {
    dispatch(removeCartItem(data));
}
const cartHandler = (data) => {
  dispatch(miniCartHandler(data));
}

const miniCartFooterBtnHandler = (data) => {
	router.push(data);
	dispatch(miniCartHandler(false));
}
const { currency } = useCurrency(); // Access currency from context

// Function to convert prices based on selected currency
const convertPrice = (price) => {
  return (price * currencyRates[currency]).toFixed(2);
};
return (
    <>
      <div className={`cart-dropdown ${getProducts.isMinicartOpen ? "open" : ""}`}>
        <div className="cart-content-wrap">
          <div className="cart-header">
            <h2 className="header-title">Cart review</h2>
            <button
              className="cart-close sidebar-close"
              onClick={() => cartHandler(false)}
            >
              <i className="fas fa-times"></i>
            </button>
          </div>
          <div className="cart-body">
            <ul className="cart-item-list">
              {getProducts.cartItems.length > 0 ? (
                getProducts.cartItems.map((data) => (
                  <li className="cart-item" key={data.id}>
                    <div className="item-img">
						<Image
							src={data.thumbnail}
							alt={data.title}
							height={100}
							width={100}
						/>
						<button className="close-btn" onClick={() => removeCartHandler(data)}>
							<i className="fas fa-times"></i>
						</button>
                    </div>
                    <div className="item-content">
                      <h3 className="item-title">
                        {data.title}
                      </h3>
                      <div className="item-price">
                        
                        {convertPrice(data.price)}
                          <span className="currency-symbol"> {currency}</span>
                        <strong>x{data.cartQuantity}</strong>
                      </div>
                      <div className="pro-qty item-quantity">
                        <input type="number" className="quantity-input" />
                      </div>
                    </div>
                  </li>
                ))
              ) : (
                <h4 className="text-center">Your cart are empty</h4>
              )}
            </ul>
          </div>
          {getProducts.cartItems.length > 0 ? (
            <div className="cart-footer">
              <h3 className="cart-subtotal">
                <span className="subtotal-title">Subtotal:</span>
                <span className="subtotal-amount">
                  {convertPrice(getProducts.cartTotalAmount)} {currency}
                </span>
              </h3>
              <div className="group-btn">
				<button className="axil-btn btn-bg-primary viewcart-btn" onClick={() => miniCartFooterBtnHandler("/cart")}>{t('viewCart')}</button>
				<button className="axil-btn btn-bg-secondary checkout-btn" onClick={() => miniCartFooterBtnHandler("/checkout")}>{t('checkout')}</button>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
      {getProducts.isMinicartOpen && (
        <div className="closeMask" onClick={() => cartHandler(false)}></div>
      )}
    </>
  );
};

export default MiniCart;
