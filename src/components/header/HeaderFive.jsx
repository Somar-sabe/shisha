'use client';
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import Nav from "@/components/header/elements/Nav";
import LangDropdown from "@/components/header/elements/LangDropdown";
import CuurencyDropdown from "@/components/header/elements/CurrencyDropdown";
import HeaderQuickLink from "@/components/header/elements/HeaderQuickLink";
import HeaderBrand from "@/components/header/elements/HeaderBrand";
import HeaderActions from "@/components/header/elements/HeaderActions";

const HeaderFive = (props) => {
  const menuOption = useSelector((state) => state.menu);
  const axilHeader = useRef();
  const axilPlaceholder = useRef();
  const axilMainmenu = useRef();
  
  useEffect(() => {
    const headerHeight = axilHeader.current.clientHeight;
    const mainMenu = axilMainmenu.current;
    const mainMenuHeight = axilMainmenu.current.clientHeight;
    const mainmenuPlaceholder = axilPlaceholder.current;
  
    window.addEventListener("scroll", (event) => {
        if (window.scrollY > headerHeight) {
            mainmenuPlaceholder.style.height = mainMenuHeight + 'px';
            mainMenu.classList.add("axil-sticky");
        } else {
            mainmenuPlaceholder.style.height = '0';
            mainMenu.classList.remove("axil-sticky");
        }
    });
  }, []);
  return (
    <header className="header axil-header header-style-3" ref={axilHeader}>

      <div id="axil-sticky-placeholder" ref={axilPlaceholder}/>
      <div className="axil-mainmenu" ref={axilMainmenu}>
        <div className="container">
          <div className="header-navbar">
            <HeaderBrand />
            <div className={`header-main-nav ${menuOption.isMobileMenuOpen ? "open": ""}`}>
              <Nav />
            </div>
            <HeaderActions searchBox searchIcon/>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderFive;
