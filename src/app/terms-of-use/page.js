"use client"; // Use this if your component requires client-side functionality (like `useTranslation`)

import Breadcrumb from "@/components/breadcrumb/Breadcrumb";
import Section from "@/components/elements/Section";
import FooterTwo from "@/components/footer/FooterTwo";
import HeaderFive from "@/components/header/HeaderFive";
import ServiceTwo from "@/components/services/ServiceTwo";
import termsOfUseData from "@/data/termsOfUse";
import { useTranslation } from "react-i18next";
import "../../lib/i18n"; // Ensure i18n is initialized

export default function TermsOfUse() {
  const { t } = useTranslation(); // Ensure i18n is set up and `useTranslation` is working
  const { breadcrumb, terms } = termsOfUseData; // Fetch data from the file

  return (
    <>
      <HeaderFive headerSlider />
      <main className="main-wrapper">
      <Breadcrumb activeItem={breadcrumb.pages} title={breadcrumb.terms_of_use} />
        <Section>
          <div className="row">
            <div className="col-lg-10">
              <div className="axil-privacy-policy">
                <h2>{t("terms.overview_title")}</h2>
                <p>{t("terms.overview_content")}</p>
                <p>{t("terms.terms_read_carefully")}</p>
                <p>{t("terms.terms_new_features")}</p>
              </div>
            </div>
          </div>
        </Section>
        <ServiceTwo />
      </main>
      <FooterTwo />
    </>
  );
}
