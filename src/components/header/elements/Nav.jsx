'use client';
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { HeaderMenu } from "@/data/Menu";
import { mobileMenu } from "@/store/slices/menuSlice";

const Nav = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const menuOption = useSelector((state) => state.menu);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [openMenu, setOpenMenu] = useState(null);

  const mobileMenuHandler = (data) => {
    dispatch(mobileMenu(data));
  };

  const toggleSubMenu = (index) => {
    setOpenMenu(openMenu === index ? null : index);
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <nav className="mainmenu-nav">
        <button
          className="mobile-close-btn mobile-nav-toggler"
          onClick={() => mobileMenuHandler(false)}
        >
          <i className="fas fa-times" />
        </button>
        <div className="mobile-nav-brand">
          <Link href="/home/furniture" className="logo">
            <Image
              src="/images/logo/Holsterfont.png"
              alt="Site Logo"
              height={40}
              width={150}
            />
          </Link>
        </div>
        <ul className="mainmenu">
          {HeaderMenu.map((menuItem, index) => (
            <li
              className={`menu-item-has-children ${
                openMenu === index ? "open" : ""
              }`}
              key={index}
            >
              <Link
                className="submenu-link"
                href={menuItem.url}
                onClick={(e) => {
                  if (windowWidth < 992 && menuItem.hasChildren) {
                    e.preventDefault();
                    toggleSubMenu(index);
                  }
                }}
              >
                {t(menuItem.name)}
                {/* Render dropdown icon only for "Shop" */}
                {menuItem.name === "Shop" && menuItem.hasChildren && (
                  <span className="dropdown-icon">▼</span>
                )}
              </Link>
              {menuItem.hasChildren && (
                <ul
                  className="axil-submenu"
                  style={{
                    display: openMenu === index ? "block" : "none",
                  }}
                >
                  {menuItem.children.map((submenu, subIndex) => (
                    <li key={subIndex}>
                      <Link
                        onClick={() => mobileMenuHandler(false)}
                        href={submenu.url}
                      >
                        {t(submenu.name)}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>
      {menuOption.isMobileMenuOpen && windowWidth < 992 && (
        <div className="closeMask" onClick={() => mobileMenuHandler(false)}></div>
      )}
    </>
  );
};

export default Nav;
