import Link from "next/link";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ProductSearchModal from "@/components/header/elements/ProductSearchModal";
import MiniCart from "@/components/header/elements/MiniCart";
import { miniCartHandler } from "@/store/slices/productSlice";
import { mobileMenu } from "@/store/slices/menuSlice";
import { useTranslation } from "react-i18next";

const HeaderActions = (props) => {
  const { t } = useTranslation();
  const [searchToggle, setSearchToggle] = useState(false);
  const [accountDropdown, setaccountDropdown] = useState(false);

  const dispatch = useDispatch();
  const getProducts = useSelector((state) => state.productData);

  const searchBoxToggleHandler = () => {
    setSearchToggle((toggler) => !toggler);
  };
  const accountDropdownToggler = () => {
    setaccountDropdown((toggler) => !toggler);
  };
  const cartHandler = (data) => {
    dispatch(miniCartHandler(data));
  }

const mobileMneuHandler = (data) => {
  dispatch(mobileMenu(data))
}
  return (
    <div className="header-action">
      <ul className="action-list">
        {props.searchBox && (
          <li className="axil-search somar" onClick={searchBoxToggleHandler}>
            <input
              type="search"
              className="placeholder product-search-input"
              name="search2"
              placeholder={t("search_placeholder")}
              autoComplete="off"
            />
            <button type="submit" className="icon wooc-btn-search">
              <i className="far fa-search" />
            </button>
          </li>
        )}
        {props.searchIcon && (
          <li className="axil-search axil-search-icon">
            <button
              className="header-search-icon"
              onClick={searchBoxToggleHandler}
            >
              <i className="far fa-search" />
            </button>
          </li>
        )}

        <li className="wishlist">
          <Link href="/wishlist">
            {getProducts.wishListQuantity > 0 && 
              <span className="cart-count">{getProducts.wishListQuantity}</span>
            }
            <i className="far fa-heart" />
          </Link>
        </li>
        <li className="shopping-cart">
          <button className="cart-dropdown-btn" onClick={() => cartHandler(true)}>
            <span className="cart-count">{getProducts.cartQuantityTotal}</span>
            <i className="far fa-shopping-cart" />
          </button>
        </li>
        <li className="my-account">
          <button onClick={accountDropdownToggler}>
            <i className="far fa-user" />
          </button>
          <div
            className={`my-account-dropdown ${accountDropdown ? "open" : ""}`}
          >
            <span className="title">{t('quickLinks')}</span>
            <ul>
              <li>
                <Link href="/dashboard">{t('myAccount')}</Link>
              </li>
              <li>
                <Link href="/dashboard/orders">{t('orde')}</Link>
              </li>
            </ul>
            <div className="login-btn">
              <Link href="/sign-in" className="axil-btn btn-bg-primary">
              {t('login')}
              </Link>
            </div>
            <div className="reg-footer text-center">
            {t('noAccount')}
              <Link href="/sign-up" className="btn-link">
              {t('registerHere')}
              </Link>
            </div>
          </div>
        </li>
        <li className="axil-mobile-toggle">
          <button className="menu-btn mobile-nav-toggler" onClick={() => mobileMneuHandler(true)}>
            <i className="fal fa-bars"></i>
          </button>
        </li>
      </ul>
      <MiniCart />
      {(props.searchIcon || props.searchBox) && (
        <ProductSearchModal
          toggleHandler={searchBoxToggleHandler}
          toggler={searchToggle}
        />
      )}


      <style jsx>{` 
@media (max-width: 768px) {
    .somar{
       display:none;
    }}
`}</style>
    </div>
  );
};

export default HeaderActions;
