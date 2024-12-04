'use client';
import Image from "next/image";
import Link from "next/link";
import Breadcrumb from "@/components/breadcrumb/Breadcrumb";
import Section from "@/components/elements/Section";
import SectionTitle from "@/components/elements/SectionTitle";
import SlickSlider from "@/components/elements/SlickSlider";
import FooterTwo from "@/components/footer/FooterTwo";
import HeaderFive from "@/components/header/HeaderFive";
import { AboutAchievment, AboutFeatures, AboutStore } from "@/data/About";
import { TeamData } from "@/data/Team";
import { useTranslation } from "react-i18next";
import "../../lib/i18n"

const AboutUs = () => {
    const { t } = useTranslation();
    return ( 
        <>
        <HeaderFive headerSlider/>
        <main className="main-wrapper">

                    <Breadcrumb 
                activeItem={t('about-us')}
                title={t('about-our-store')}
            />
            <Section pClass="axil-about-area about-style-1">
                <div className="row align-items-center">
                    <div className="col-xl-4 col-lg-6">
                        <div className="about-thumbnail">
                            <div className="thumbnail">
                                <Image 
                                src={AboutStore.thumbnail} 
                                alt="About Us"
                                width={420}
                                height={501}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-8 col-lg-6">
                        <div className="about-content content-right">
                            <span className="title-highlighter highlighter-primary2"> 
                                <i className={AboutStore.subtitleIcon} />{t("subtitle")}
                            </span>
                            <h3 className="title">{t("title")}</h3>
                            <span className="text-heading">{t("higlightLine")}</span>
                            <div className="row">
                            <div className="col-xl-6">
                <p>{t("description1")}</p>
            </div>
            <div className="col-xl-6">
                <p>{t("description2")}</p>
            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Section>
            <section className="about-info-area">
    <div className="container">
        <div className="row row--20">
            <div className="col-lg-4">
                <div className="about-info-box">
                    <div className="thumb">
                        <Image 
                            src="/images/about/shape-01.png" 
                            width={60}
                            height={60}
                            alt="Achievement Icon 1"
                        />
                    </div>
                    <div className="content">
                        <h6 className="title">{t("AchievementTitle1")}</h6>
                        <p>{t("AchievementDescription1")}</p>
                    </div>
                </div>
            </div>

            <div className="col-lg-4">
                <div className="about-info-box">
                    <div className="thumb">
                        <Image 
                            src="/images/about/shape-02.png" 
                            width={60}
                            height={60}
                            alt="Achievement Icon 2"
                        />
                    </div>
                    <div className="content">
                        <h6 className="title">{t("AchievementTitle2")}</h6>
                        <p>{t("AchievementDescription2")}</p>
                    </div>
                </div>
            </div>

            <div className="col-lg-4">
                <div className="about-info-box">
                    <div className="thumb">
                        <Image 
                            src="/images/about/shape-03.png" 
                            width={60}
                            height={60}
                            alt="Achievement Icon 3"
                        />
                    </div>
                    <div className="content">
                        <h6 className="title">{t("AchievementTitle3")}</h6>
                        <p>{t("AchievementDescription3")}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

            <section className="axil-team-area axil-section-gap bg-wild-sand">
                <div className="team-left-fullwidth">
                    <div className="container ml--xxl-0">
                        <SectionTitle
                        title="Expart Management Team"
                        subtitle="Our Team"
                        subtitleIcon="fas fa-users"
                        subColor="highlighter-primary"
                        />
                        <SlickSlider
                        class="team-slide-activation slick-layout-wrapper--20 axil-slick-arrow arrow-top-slide"
                        slidesToShow={4}
                        infinite={false}
                        >
                            {TeamData?.map((data, index) => (
                                <div className="axil-team-member" key={index}>
                                    <div className="thumbnail">
                                        <Image 
                                        src={data.thumbnail} 
                                        width={330}
                                        height={380}
                                        alt={data.name}
                                        />
                                    </div>
                                    <div className="team-content">
                                        <span className="subtitle">{data.designation}</span>
                                        <h5 className="title">{data.name}</h5>
                                    </div>
                                </div>
                            ))}
                        </SlickSlider>
                    </div>
                </div>
            </section>
          
          
        </main>
        <FooterTwo />
        </>
     );
}
 
export default AboutUs;