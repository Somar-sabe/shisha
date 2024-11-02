'use client';
import Link from "next/link";
import SectionTitle from "../elements/SectionTitle";
import CountDown from "../elements/CountDown";
import Image from "next/image";

const PosterOne = (props) => {
    return (
      <div className="axil-poster-countdown">
        <div className="container">
          <div className="poster-countdown-wrap bg-lighter">
            <div className="row">
              <div className="col-xl-5 col-lg-6">
                <div className="poster-countdown-content">
                  <SectionTitle 
                     title={`<span style="font-weight: bold; color: #EBA800;">ICE KAKTUZ</span> took first place in 2022 for the <span style="font-weight: bold; color: #EBA800;">BEST FLAVOR</span> on the market`}
                    subtitle={props.subtitle ?? "Don’t Miss!!"}
                    subColor={props.subColor ?? "highlighter-secondary"}
                    subtitleIcon={props.subtitleIcon ?? "fal fa-headphones-alt"}
                  />       
                </div>
              </div>
              <div className="col-xl-7 col-lg-6">
                <div className="poster-countdown-thumbnail">
                    <Image 
                    src={props.thumbnail ?? "/images/product/poster/poster-03.png"}
                    alt="Poster Thumbnail"
                    width={props.thumbWidth ?? 452}
                    height={props.thumbHeight ?? 502}
                    />
                    {props.singleAnimation && 
                    <div className="music-singnal">
                      <div className="item-circle circle-1" />
                      <div className="item-circle circle-2" />
                      <div className="item-circle circle-3" />
                      <div className="item-circle circle-4" />
                      <div className="item-circle circle-5" />
                    </div>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}
 
export default PosterOne;