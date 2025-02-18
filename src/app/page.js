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
import HeaderBrand from "@/components/header/elements/HeaderBrand";
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

                    <div class="modal popup-years">
            <div class="modal__wrapper">
                <div class="modal__bg js-modal-close"></div>
                <div class="modal__container">
               
                    <div class="modal__scroll"><div class="popup-years__block">
                    <HeaderBrand />
 <div class="popup-years__block-content">
 <h1 class="title">Are you 18 years of age or older?</h1>
<p class="subtext">You must be at least 18 to enter this site</p>
 </div>
 <div class="popup-years__block-button">
 <button onClick={handleYes}  class="enter">Yes</button>
 <a class="exit"  onClick={handleNo} >No</a>
 </div>
 </div> </div>
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
.modal, .modal__wrapper {
    width: 100%;
    height: 100vh;
}

.modal {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    animation: overlay-show .4sease-in-out;
}
    .modal__wrapper {
    display: flex
;
    align-items: center;
    justify-content: center;
}

.modal, .modal__wrapper {
    width: 100%;
    height: 100vh;
}
    .modal.popup-years .modal__container {
    width: 430px;
    border-radius: 8px;
    padding: 50px 10px;
    overflow: hidden;
}
@media (min-width: 568px) {
    .modal__container {
        width: 90%;
    }
}
    .modal__container {
    position: relative;
    width: 100%;
    max-width: 1170px;
    max-height: 100vh;
    background: #fff;
    padding: 40px 20px;
    overflow-x: hidden;
    overflow-y: auto;
    animation: overlay__container-show .8sease-in-out;
}
    @media (min-width: 1024px) {
    .modal__scroll {
        padding-top: 0;
        padding-bottom: 0;
    }
}
.modal__scroll {
    padding-top: 40px;
    padding-bottom: 80px;
}
    .modal .popup-years__block {
    display: flex
;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 25px;
}
    .modal .popup-years__block-content .title {
    margin: 0;
    font-size: 30px;
    font-weight: 400;
    line-height: 33px;
    color: #1b1b1b;
    text-align: center;
}
    .modal .popup-years__block-content .subtext {
    margin: 0;
    font-size: 16px;
    line-height: 24px;
    color: #5e5e5e;
    text-align: center;
}
    .enter{
    display: flex
;
    align-items: center;
    border: none;
    cursor: pointer;
    color: #fff;
    height: 48px;
    font-size: 16px;
    line-height: 24;
    padding: 12px 16px;
    border-radius: 8px;
    background-color: #e30613;
    transition: .3sease;}
.exit{
display: flex
;
    align-items: center;
    border: none;
    cursor: pointer;
    color: #fff;
    height: 48px;
    font-size: 16px;
    line-height: 24;
    padding: 12px 16px;
    border-radius: 8px;
    background-color: #eba800;
    transition: .3sease;}
               
            `}</style>
        
        </>
     );
}
 
export default Home;