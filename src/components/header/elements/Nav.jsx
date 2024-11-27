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
  const [windowWidth, setWindowWidth] = useState();

  const mobileMneuHandler = (data) => {
    dispatch(mobileMenu(data));
  };

  useEffect(() => {
    const mobileMenuToggleHandler = () => {
      const updateWindowWidth = () => {
        const windowWidth = window.innerWidth;
        setWindowWidth(windowWidth);
      };

      updateWindowWidth();
      window.addEventListener("resize", updateWindowWidth);

      let menuLinks = document.getElementsByClassName("submenu-link");

      if (windowWidth < 992) {
        // Attach click handler to both submenu and non-submenu items
        for (let i = 0; i < menuLinks.length; i++) {
          const element = menuLinks[i];

          element.addEventListener("click", function (e) {
            // Prevent default behavior
            e.preventDefault();

            const isSubMenu = element.offsetParent.classList.contains("menu-item-has-children");
            const isOpen = element.offsetParent.classList.contains("open");

            // Close all open menus
            for (let j = 0; j < menuLinks.length; j++) {
              const subElem = menuLinks[j];
              subElem.offsetParent.classList.remove("open");

              if (subElem.nextSibling && subElem.nextSibling.style) {
                subElem.nextSibling.style.display = "none";
              }
            }

            // Toggle clicked menu or redirect if no submenu
            if (isSubMenu) {
              // Open the submenu if it's not already open
              if (!isOpen) {
                element.offsetParent.classList.add("open");
                if (element.nextSibling && element.nextSibling.style) {
                  element.nextSibling.style.display = "block";
                }
              }
            } else {
              // For non-submenu items, just handle the navigation
              window.location.href = element.href;
              mobileMneuHandler(false); // Close mobile menu after clicking
            }
          });
        }
      }

      // Cleanup on unmount
      return () => {
        window.removeEventListener("resize", updateWindowWidth);
      };
    };

    mobileMenuToggleHandler();
  }, [windowWidth]);

  return (
    <>
      <nav className="mainmenu-nav">
        <button
          className="mobile-close-btn mobile-nav-toggler"
          onClick={() => mobileMneuHandler(false)}
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
            <li className={menuItem.hasChildren ? "menu-item-has-children" : ""} key={index}>
              <Link className="submenu-link" href={menuItem.url}>
                {t(menuItem.name)} 
              </Link>
              {menuItem.hasChildren && (
                <ul className="axil-submenu">
                  {menuItem.children.map((submenu, subIndex) => (
                    <li key={subIndex}>
                      <Link onClick={() => mobileMneuHandler(false)} href={submenu.url}>
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
        <div className="closeMask" onClick={() => mobileMneuHandler(false)}></div>
      )}
    </>
  );
};

export default Nav;
