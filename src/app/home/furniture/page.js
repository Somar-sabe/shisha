'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { mapInSlices, slugify } from '@/utils';
import FooterTwo from "@/components/footer/FooterTwo";
import HeaderFive from "@/components/header/HeaderFive";
import ProductsData from '@/data/Products';
import Section from '@/components/elements/Section';
import SectionTitle from '@/components/elements/SectionTitle';
import ProductSeven from '@/components/product/ProductSeven';
import WhyChoose from '@/components/why-choose/WhyChoose';
import PosterOne from '@/components/poster/PosterOne';
import BannerFive from '@/components/hero-banner/BannerFive';

const HomeFurniture = () => {
    const pathname = usePathname();
    const split = pathname.split("/");
    const pageCategory = split[split.length - 1];
    const furnitureProduct = ProductsData.filter(data => slugify(data.cate) === pageCategory);
    const transparentProduct = ProductsData.filter(data => slugify(data.cate) === pageCategory && data.thumbnailTransparent === true);
    const exploreProduct = mapInSlices(furnitureProduct, 8);
    
    return ( 
        <>
        <HeaderFive headerSlider />
        <main className="main-wrapper">
            
            <BannerFive />
          

      
            <Section pClass="pb--0" borderBottom="pb--50">
                <SectionTitle
                title="Best Sellers"
                subtitle="This Month"
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
                title="Explore our Products"
                subtitle="Our Products"
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
                <div className="row">
                    <div className="col-lg-12 text-center mt--20 mt_sm--0">
                        <Link href="/shop" className="axil-btn btn-bg-lighter btn-load-more">View All Products</Link>
                    </div>
                </div>
            </Section>
            <WhyChoose />
   
            <Section pClass="pb--50">
                <SectionTitle 
                    title="New Arrivals"
                    subtitle="This Week’s"
                    subtitleIcon="far fa-shopping-basket"
                />
                          <div className="row">
                    {furnitureProduct.slice(0, 8).map((data) => (
                        <div className="col-xl-3 col-lg-4 col-sm-6" key={data.id}>
                            <ProductSeven product={data} />
                        </div>
                    ))}
                </div>
            </Section>
           
        </main>
        <FooterTwo />
        </>
     );
}
 
export default HomeFurniture;