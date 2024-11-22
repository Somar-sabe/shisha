"use client"; 
import Breadcrumb from "@/components/breadcrumb/Breadcrumb";
import Section from "@/components/elements/Section";
import FooterTwo from "@/components/footer/FooterTwo";
import HeaderFive from "@/components/header/HeaderFive";
import ServiceTwo from "@/components/services/ServiceTwo";
import privacyPolicyData from "@/data/privacyPolicyData"; // Import the new static data
import { useTranslation } from "react-i18next";
import "../../lib/i18n"; 

const PrivacyPolicy = () => {
    const { t } = useTranslation();
  const { breadcrumb, privacy_policy } = privacyPolicyData; // Destructure the data

  return (
    <>
      <HeaderFive headerSlider />
      <main className="main-wrapper">
        <Breadcrumb activeItem={breadcrumb.pages} title={breadcrumb.privacy_policy} />
        <Section>
          <div className="row">
            <div className="col-lg-10">
              <div className="axil-privacy-policy">
                <span className="policy-published">
                {t("privacy_policy.published_on", { date: privacy_policy.effective_date })}
                </span>
                <h2>{t("privacy_policy.commitment_to_privacy_title")}</h2>
                <p>{t("privacy_policy.commitment_to_privacy_content")}</p>
                <h3>{t("privacy_policy.why_do_we_gather_info_title")}</h3>
                <p>{t("privacy_policy.why_do_we_gather_info_content")}</p>
                <h3>{t("privacy_policy.what_info_do_we_collect_title")}</h3>
                <p>{t("privacy_policy.what_info_do_we_collect_content")}</p>
                <h3>{t("privacy_policy.how_we_use_info_title")}</h3>
                <p>{t("privacy_policy.how_we_use_info_content")}</p>
                <h3>{t("privacy_policy.cookies_title")}</h3>
                <p>{t("privacy_policy.cookies_content")}</p>
                <h3>{t("privacy_policy.google_analytics_tracking_title")}</h3>
                <p>{t("privacy_policy.google_analytics_tracking_content")}</p>
                <h3>{t("privacy_policy.third_party_services_title")}</h3>
                <p>{t("privacy_policy.third_party_services_content")}</p>
                <h3>{t("privacy_policy.age_verification_title")}</h3>
                <p>{t("privacy_policy.age_verification_content")}</p>
                <h3>{t("privacy_policy.data_security_title")}</h3>
                <p>{t("privacy_policy.data_security_content")}</p>
                <h3>{t("privacy_policy.disclosure_of_information_title")}</h3>
                <p>{t("privacy_policy.disclosure_of_information_content")}</p>
                <h3>{t("privacy_policy.links_to_third_party_websites_title")}</h3>
                <p>{t("privacy_policy.links_to_third_party_websites_content")}</p>
                <h3>{t("privacy_policy.updates_to_privacy_policy_title")}</h3>
                <p>{t("privacy_policy.updates_to_privacy_policy_content")}</p>
                <p>{t("privacy_policy.contact_us")}</p>
              </div>
            </div>
          </div>
        </Section>
        <ServiceTwo />
      </main>
      <FooterTwo />
    </>
  );
};

export default PrivacyPolicy;
