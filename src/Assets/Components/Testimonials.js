import React from "react";
import "../Css/Testimonials.css";
import { images } from "../../Images";
import Testimonialsslider from "../Components/Testimonialsslider"
import { Container, Row, Col, Image } from "react-bootstrap";
const Testimonials = () => {
  return (
    <div className="thirdhomebg">
      <Container>
        <Row>
          <Col md={3}></Col>
          <Col md={6}>
            <p className="thirdsechead">What Our Clients Say</p>
            <p className="thirdsecdesc">
            Here are some testimonials from our happy clients who have used Shootfolio<br></br> to manage their cryptocurrency investments.
            </p>
          </Col>
          <Col md={3}></Col>
        </Row>
        <Row className="mt-5 makethemequaltry">
          <Testimonialsslider/>
          {/* <Col md={4}>
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
          </Col>
          <Col md={4} className="marg-top-mbl-test">
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
          </Col>
          <Col md={4} className="marg-top-mbl-test">
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
          </Col> */}
        </Row>
      </Container>
    </div>
  );
};

export default Testimonials;
