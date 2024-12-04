import Breadcrumb from "@/components/breadcrumb/Breadcrumb";
import FooterTwo from "@/components/footer/FooterTwo";
import HeaderFive from "@/components/header/HeaderFive";
import ServiceTwo from "@/components/services/ServiceTwo";
import ShopWithSidebar from "./ShopWithSidebar";
import { useTranslation } from 'react-i18next'; 


const Shop = () => {
    const { t } = useTranslation(); 
    return ( 
        <>
        <HeaderFive headerCampaign />
        <Breadcrumb activeItem="Shop" title="Explore All Products" />
        <Breadcrumb 
                activeItem={t('explor')}
                title={t('explore')}
            />
        <main className="main-wrapper">
        <ShopWithSidebar />
           
            <ServiceTwo />
        </main>
        <FooterTwo />
        </>
    );
}
 
export default Shop;