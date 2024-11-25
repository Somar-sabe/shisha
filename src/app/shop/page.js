import Breadcrumb from "@/components/breadcrumb/Breadcrumb";
import FooterTwo from "@/components/footer/FooterTwo";
import HeaderFive from "@/components/header/HeaderFive";
import ServiceTwo from "@/components/services/ServiceTwo";
import ShopWithSidebar from "./ShopWithSidebar";


const Shop = () => {
    return ( 
        <>
        <HeaderFive headerCampaign />
        <Breadcrumb activeItem="Shop" title="Explore All Products" />
        <main className="main-wrapper">
        <ShopWithSidebar />
           
            <ServiceTwo />
        </main>
        <FooterTwo />
        </>
    );
}
 
export default Shop;