'use client';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import FooterTwo from "@/components/footer/FooterTwo";
import HeaderFive from "@/components/header/HeaderFive";
import ProductsData from '@/data/Products';
import Section from '@/components/elements/Section';
import SectionTitle from '@/components/elements/SectionTitle';
import ProductSeven from '@/components/product/ProductSeven';
import PosterOne from '@/components/poster/PosterOne';
import BannerFive from '@/components/hero-banner/BannerFive';
import ChatWidget from '@/components/widget/ChatWidget';
import '../lib/i18n';
import { useState, useEffect } from 'react';
const Home = () => {
    const { t } = useTranslation(); 
    const pathname = usePathname();
    const split = pathname.split("/");
    const pageCategory = split[split.length - 1];
    const furnitureProduct = ProductsData.slice(0, 4);
    const furnitureProduc = ProductsData.slice(4, 8);
    const exploreProduct = ProductsData.filter(data => data.pCate === "Shisha Accssesores");

    const [isPopupVisible, setIsPopupVisible] = useState(true); // Initially show the popup
    const [isAdult, setIsAdult] = useState(false); // Track if user confirmed they are 18+

    // Check localStorage to see if the user has already confirmed age
    useEffect(() => {
        const isUserAdult = localStorage.getItem('isAdult');
        if (isUserAdult === 'true') {
            setIsPopupVisible(false); // Hide the popup if the user is already confirmed as an adult
        }
    }, []);

    // Handle user response
    const handleYes = () => {
        setIsAdult(true);
        setIsPopupVisible(false); // Hide the popup
        localStorage.setItem('isAdult', 'true'); // Store the response in localStorage
    };

    const handleNo = () => {
        setIsAdult(false);
        setIsPopupVisible(false); // Hide the popup
        localStorage.setItem('isAdult', 'false'); // Optionally store the "no" response
    };


    return ( 
        <>
        <HeaderFive headerSlider />
        <main className="main-wrapper">
            
        {isPopupVisible && (
                    <div className="popup-overlay">
                        <div className="popup">
                            <h2>are you 18 years of age or older?</h2>
                            <p>You must be at least 18 to enter this</p>
                            <div className="popup-buttons">
                                <button onClick={handleYes} className="btn-yes">{t('yes')}</button>
                                <button onClick={handleNo} className="btn-no">{t('no')}</button>
                            </div>
                        </div>
                    </div>
                )}

            <BannerFive />
          

      
            <Section pClass="pb--0" borderBottom="pb--50">
                <SectionTitle
                        title={t('best_sellers')} // Translated text
                        subtitle={t('this_month')} // Translated text
                subtitleIcon="far fa-shopping-basket"
                subColor="highlighter-secondary"
                />
                <div className="row">
                    {furnitureProduct.slice(0, 8).map((data) => (
                        <div className="col-xl-3 col-lg-4 col-sm-6" key={data.id}>
                            <ProductSeven product={data} />
                        </div>
                    ))}
                </div>
            </Section>
            <PosterOne 
             subtitleIcon="far fa-couch"
             title="ICE KAKTUZ took first place in 2022 for the BEST FLAVOR on the market"
             thumbnail="/images/product/poster/URKUNDE_Ice_Kaktuz.png"
             thumbWidth={661}
             thumbHeight={502}
            />
            <Section pClass="pb--0" borderBottom="pb--80">
                <SectionTitle
                        title={t('explore_our_products')} // Translated text
                        subtitle={t('our_products')} // Translated text
                subtitleIcon="far fa-shopping-basket"
                subColor="highlighter-secondary"
                />
                 <div className="row">
                    {furnitureProduc.slice(0,4).map((data) => (
                        <div className="col-xl-3 col-lg-4 col-sm-6" key={data.id}>
                            <ProductSeven product={data} />
                        </div>
                    ))}
                </div>
                <div className="row">
                    <div className="col-lg-12 text-center mt--20 mt_sm--0">
                        <Link href="/shop" className="axil-btn btn-bg-lighter btn-load-more">{t('viewAllProducts')}</Link>
                    </div>
                </div>
            </Section>
          
   
            <Section pClass="pb--50">
                <SectionTitle 
                        title={t('new_arrivals')} // Translated text
                        subtitle={t('this_weeks')} // Translated text
                    subtitleIcon="far fa-shopping-basket"
                />
                          <div className="row">
                    {exploreProduct.slice(0, 4 ).map((data) => (
                        <div className="col-xl-3 col-lg-4 col-sm-6" key={data.id}>
                            <ProductSeven product={data} />
                        </div>
                    ))}
                </div>
            </Section>
            <ChatWidget />
        </main>
        <FooterTwo />
        <style jsx>{`
                .popup-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background-color: rgba(0, 0, 0, 0.5);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    z-index: 999;
                }

                .popup {
                    background-color: #fff;
                    padding: 20px;
                    border-radius: 8px;
                    text-align: center;
                    width: 300px;
                }

                .popup h2 {
                    margin-bottom: 20px;
                }

                .popup-buttons button {
                    margin: 10px;
                    padding: 10px 20px;
                    font-size: 16px;
                    cursor: pointer;
                }

                .popup-buttons .btn-yes {
                    background-color: #eba800;
                    color: white;
                    border-radius: 3px;
                    width:5vw;
                }

                .popup-buttons .btn-no {
                    background-color: #eba800;
                    color: white;
                    border-radius: 3px;
                    width:5vw;


                }
            `}</style>
        
        </>
     );
}
 
export default Home;