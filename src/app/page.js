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
const Home = () => {
    const { t } = useTranslation(); 
    const pathname = usePathname();
    const split = pathname.split("/");
    const pageCategory = split[split.length - 1];
    const furnitureProduct = ProductsData.slice(0, 4);
    const exploreProduct = ProductsData.filter(data => data.pCate === "Shisha Accssesores");

    return ( 
        <>
        <HeaderFive headerSlider />
        <main className="main-wrapper">
            
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
             thumbnail="/images/product/poster/Group 6 Copy 4 (1).png"
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
                    {furnitureProduct.slice(0,8).map((data) => (
                        <div className="col-xl-3 col-lg-4 col-sm-6" key={data.id}>
                            <ProductSeven product={data} />
                        </div>
                    ))}
                </div>
                <div className="row">
                    <div className="col-lg-12 text-center mt--20 mt_sm--0">
                        <Link href="/shop" className="axil-btn btn-bg-lighter btn-load-more">View All Products</Link>
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
        
        </>
     );
}
 
export default Home;