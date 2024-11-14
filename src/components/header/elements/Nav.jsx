import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";  // Import useTranslation
import { HeaderMenu } from "@/data/Menu";
import { mobileMenu } from "@/store/slices/menuSlice";

const Nav = () => {
  const { t, i18n } = useTranslation();  // Initialize useTranslation hook
  const dispatch = useDispatch();
  const menuOption = useSelector((state) => state.menu);
  const [windowWidth, setWindowWidth] = useState();

  const mobileMneuHandler = (data) => {
    dispatch(mobileMenu(data));
  };

  const mobileMenuToggleHandler = () => {
    let windowWidthCheck = window.innerWidth;
    setWindowWidth(windowWidthCheck);
    window.addEventListener("resize", (e) => {
      let windowWidth = window.innerWidth;
      setWindowWidth(windowWidth);
    });

    let subMenuToggler = document.getElementsByClassName("submenu-link");
    if (windowWidth < 992) {
      for (let i = 0; i < subMenuToggler.length; i++) {
        let element = subMenuToggler[i];
        element.addEventListener("click", function (e) {
          e.preventDefault();
          if (element.offsetParent.classList.contains("open")) {
            for (let j = 0; j < subMenuToggler.length; j++) {
              const subElem = subMenuToggler[j];
              subElem.offsetParent.classList.remove("open");
              subElem.nextSibling.style.display = "none";
            }
          } else {
            for (let j = 0; j < subMenuToggler.length; j++) {
              const subElem = subMenuToggler[j];
              subElem.offsetParent.classList.remove("open");
              subElem.nextSibling.style.display = "none";
            }
            element.offsetParent.classList.add("open");
            element.nextSibling.style.display = "block";
          }
        });
      }
    }
  };

  useEffect(() => {
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
                {t(menuItem.name)} {/* Apply translation here */}
              </Link>
              {menuItem.hasChildren && (
                <ul className="axil-submenu">
                  {menuItem.children.map((submenu, subIndex) => (
                    <li key={subIndex}>
                      <Link onClick={() => mobileMneuHandler(false)} href={submenu.url}>
                        {t(submenu.name)} {/* Apply translation here for submenus */}
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
