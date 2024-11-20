"use client";
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";
import { ScocialLink } from "@/data/Common";
import { FooterData } from "@/data/Footer";
import ProductQuickView from "../product/elements/ProductQuickView";
import { useTranslation } from "react-i18next";
import "../../lib/i18n"

const FooterTwo = () => {
  const { t } = useTranslation();
  const getQuickView = useSelector((state) => state.productData);

  return (
    <>
      <footer className="axil-footer-area footer-style-2">
        <div className="footer-top separator-top">
          <div className="container">
            <div className="row" style={{    display: "flex",   justifyContent: "space-around" }}>
              <div className="col-lg-3 col-sm-6">
                <div className="axil-footer-widget">
                  <h5 className="widget-title">{t("footer.support")}</h5>
                  <div className="inner">
                    <p
                      dangerouslySetInnerHTML={{
                        __html: t("footer.address"),
                      }}
                    ></p>
                    <ul className="support-list-item">
                      <li>
                        <a href={`mailto:${FooterData.footerInfo.email}`}>
                          <i className="fal fa-envelope-open" />
                          {FooterData.footerInfo.email}
                        </a>
                      </li>
                      <li>
                        <a href={`tel:${FooterData.footerInfo.phone}`}>
                          <i className="fal fa-phone-alt" />{" "}
                          {FooterData.footerInfo.phone}
                        </a>
                      </li>
                      <li>
                        <a href={`tel:${FooterData.footerInfo.phone}`}>
                          <i className="fal fa-phone-alt" />{" "}
                          +971 4 834 5641
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              {FooterData.footerLink.slice(0, 2).map((items, index) => (
                <div className="col-lg-3 col-sm-6" key={index}>
                  <div className="axil-footer-widget">
                    <h5 className="widget-title">{items.label}</h5>
                    <div className="inner">
                      <ul>
                        {items.linkList.map((link, index) => (
                          <li key={index}>
                            <Link href={link.url}>{link.name}</Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
 
            </div>
          </div>
        </div>
        <div className="copyright-area copyright-default separator-top">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-xl-4">
                <div className="social-share">
                  <a href={ScocialLink.facebook.url} target="_blank">
                    <i className={ScocialLink.facebook.icon} />
                  </a>
                  <a href={ScocialLink.instagram.url} target="_blank">
                    <i className={ScocialLink.instagram.icon} />
                  </a>
                  <a href={ScocialLink.whatsapp.url} target="_blank">
                    <i className={ScocialLink.whatsapp.icon} />
                  </a>
                  <a href={ScocialLink.linkedin.url} target="_blank">
                    <i className={ScocialLink.linkedin.icon} />
                  </a>
                </div>
              </div>
              <div className="col-xl-4 col-lg-12">
                <div className="copyright-left d-flex flex-wrap justify-content-center">
                  <ul className="quick-link">
                    <li>
                      © {new Date().getFullYear()}. All rights reserved by {" "}
                      <a target="_blank" href="https://baylabs.tech/">
                        Bay Labs
                      </a>
                      .
                    </li>
                  </ul>
                </div>
              </div>

            </div>
          </div>
        </div>

      </footer>
      {getQuickView.quickView && <ProductQuickView />}
    </>
  );
};

export default FooterTwo;
