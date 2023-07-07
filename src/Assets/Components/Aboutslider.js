import React, { Component } from "react";
import Slider from "react-slick";
import {Image} from "react-bootstrap"
import {images} from "../../Images"
// const Aboutslider = () => {
    export default class Responsive extends Component {
        render() {
          var settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 2,
            slidesToScroll: 1,
            initialSlide: 0,
            autoplay: true,
            autoplaySpeed: 2000,
            cssEase: "linear",      
            responsive: [
              {
                breakpoint: 1024,
                settings: {
                  slidesToShow: 2,
                  slidesToScroll: 1,
                  infinite: true,
                  dots: true
                }
              },
              {
                breakpoint: 600,
                settings: {
                  slidesToShow: 2,
                  slidesToScroll: 1,
                  initialSlide: 2
                }
              },
              {
                breakpoint: 480,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1
                }
              }
            ]
          };
  return (
    <div>
        <Slider {...settings}>
          <div>
            <Image src={images.awardone} width="97%"/>
          </div>
          <div>
          <Image src={images.awardtwo} width="97%"/>
          </div>
          <div>
          <Image src={images.awardthree} width="97%"/>
          </div>
          <div>
          <Image src={images.awardfour} width="97%"/>
          </div>
        </Slider>
    </div>
  )
}
    }
// export default Aboutslider