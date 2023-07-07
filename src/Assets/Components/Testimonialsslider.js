import React, { Component } from "react";
import Slider from "react-slick";
import { Image } from "react-bootstrap"
import "../Css/Testimonials.css";
import { images } from "../../Images"
// const Aboutslider = () => {
export default class Responsive extends Component {
    render() {
        var settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 3,
            slidesToScroll: 1,
            initialSlide: 0,
            pauseOnHover:false,
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
                        <div className="testbg">
                            <div className="testimgborder">
                                <Image src={images.testone} width="70px" />
                            </div>
                            <div>
                                <Image className="mt-3" src={images.rating} width="50%" />
                                <p className="testdescsingle mt-3">
                                    "Shootfolio has been a game-changer for me. I used to struggle to keep track of my cryptocurrency investments, but with Shootfolio, it's so easy. The platform is intuitive, and the analytics have helped me make informed investment decisions. Highly recommended!"
                                </p>
                                <p className="testname margn-top-testone">John Doe</p>
                                <p className="testdesignation">Founder of Rubik</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="testbg">
                            <div className="testimgborder">
                                <Image src={images.testtwo} width="70px" />
                            </div>
                            <Image className="mt-3" src={images.rating} width="50%" />
                            <p className="testdescsingle mt-3">
                                "I'm so glad I found Shootfolio. It has helped me manage my diverse cryptocurrency portfolio with ease. The platform is user-friendly, and the customer support is excellent. I recommend it to anyone looking for a comprehensive platform to manage their digital assets."
                            </p>
                            <p className="testname mt-3">Jane Smith</p>
                            <p className="testdesignation">Founder of Buzzy</p>
                        </div>
                    </div>
                    <div>
                        <div className="testbg">
                            <div className="testimgborder">
                                <Image src={images.testthree} width="70px" />
                            </div>
                            <Image className="mt-3" src={images.rating} width="50%" />
                            <p className="testdescsingle mt-3">
                                "Shootfolio has exceeded my expectations. The platform has all the features I need to manage my cryptocurrency investments, including real-time data and performance analytics. The interface is clean and easy to navigate, making it a pleasure to use. I'm so happy I found this platform."
                            </p>
                            <p className="testname mt-3">Tom Johnson</p>
                            <p className="testdesignation">Founder of Techhub</p>
                        </div>
                    </div>
                    <div>
                        <div className="testbg">
                            <div className="testimgborder">
                                <Image className="setimagetestborder" src={images.testfour} width="70px" />
                            </div>
                            <Image className="mt-3" src={images.rating} width="50%" />
                            <p className="testdescsingle mt-3">
                            "I have been using Shootfolio for over a year now, and it has been a great experience. The platform is comprehensive, and the team behind it is constantly improving and adding new features. I have recommended Shootfolio to my friends and family, and they love it too."
                            </p>
                            <p className="testname mt-3">Sarah Lee</p>
                            <p className="testdesignation">Founder of Techly</p>
                        </div>
                    </div>
                </Slider>
            </div>
        )
    }
}
// export default Aboutslider