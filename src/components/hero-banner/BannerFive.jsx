import { FurnitureSlider } from "@/data/Slider";
import SlickSlider from "../elements/SlickSlider";
import Link from "next/link";
import Image from "next/image";
import { useTranslation } from 'react-i18next';


const BannerFive = () => {
  const { t } = useTranslation(); 
    return (
      <div className="axil-main-slider-area main-slider-style-5">
        <div className="container">
          <div className="slider-box-wrap">
            <SlickSlider class="axil-slick-dots slider-activation-two" slidesToShow={1} fade={true} arrows={false} dots={true}>
              {FurnitureSlider.map((data, index) => (
                <div key={index}>
                  <div className="single-slide">
                      <div className="main-slider-content">
                        <span className="subtitle">
                          <i className={data.subIcon} /> {data.subTitle}
                        </span>
                        <h1 className="title">{t(data.titleKey)}</h1>
                        <div className="shop-btn">
                            <Link style={{ color: 'white', backgroundColor: '#EBA800' }} href={data.href} className="axil-btn btn-bg-white"><i className="fal fa-shopping-cart" /> Shop Now</Link>
                        </div>
                      </div>
                      <div className="main-slider-thumb">
                        <Image 
                        src={data.thumbnail}
                        width={553}
                        height={460}
                        alt="Thumbnail"
                        />
                      </div>
                  </div>
                </div>
              ))}
            </SlickSlider>
          </div>
        </div>
      </div>
    );
}
 
export default BannerFive;