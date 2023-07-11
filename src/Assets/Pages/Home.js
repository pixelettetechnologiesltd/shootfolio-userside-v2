import React from "react";
import Header from "../Components/Header";
import Testimonials from "../Components/Testimonials";
import Getintouch from "../Components/Getintouch";
import Footer from "../Components/Footer";
import "../Css/Home.css";
import { images } from "../../Images";
import { Container, Row, Col, Image, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <div>
      <Header />
      <div className="herobg">
        <Container>
          <Row>
            <Col md={3}></Col>
            <Col md={3} className="justifycontcentsocial">
              <Image className="setsocialsizeandspace" src={images.skype} />
              <Image className="setsocialsizeandspace" src={images.whats} />
              <Image className="setsocialsizeandspace" src={images.dribble} />
              <Image className="setsocialsizeandspace" src={images.chat} />
              <Image className="setsocialsizeandspace" src={images.tiktok} />
            </Col>
            <Col md={3} className="justifycontcentsocialsecond">
              <Image
                className="setsocialsizeandspace removemargleft"
                src={images.slack}
              />
              <Image className="setsocialsizeandspace" src={images.message} />
              <Image
                className="setsocialsizeandspaceinsta"
                src={images.insta}
              />
              <Image className="setsocialsizeandspace" src={images.google} />
            </Col>
            <Col md={3}></Col>
          </Row>
          <Row>
            <Col md={1}></Col>
            <Col md={10}>
              <h1 className="heroheadcenthomemain mt-3">
                Discover the World of Digital Assets with Shootfolio - Your
                Ultimate Learning and Investment Platform
              </h1>
            </Col>
            <Col md={1}></Col>
          </Row>
          <Row>
            <Col md={2}></Col>
            <Col md={8}>
              <p className="herodesc mt-2">
                Welcome to Shootfolio, the all-in-one platform for learning
                about and managing digital assets. With our comprehensive
                educational resources and advanced portfolio management tools,
                you can easily grow your knowledge and wealth.<br></br>Get
                started today by signing up for our platform and taking control
                of your financial future.
              </p>
            </Col>
            <Col md={2}></Col>
          </Row>
          <Row className="mt-3">
            <Col md={4}></Col>
            <Col md={4} className="justifybutheadcent">
              {!user && (
                <Button
                  className="leftheader"
                  onClick={() => navigate("/signup")}
                >
                  Sign up
                </Button>
              )}
              {!user && (
                <Button
                  className="rightheaderbutton"
                  onClick={() => navigate("/signin")}
                >
                  Login
                </Button>
              )}
            </Col>
            <Col md={4}></Col>
          </Row>
        </Container>
      </div>
      <div className="homesecodbg">
        <Container>
          <Row>
            <Col md={4}>
              <div>
                <Image
                  className="makehomeportborderradius"
                  src={images.secone}
                  width="100%"
                ></Image>
                <p className="sectwohead mt-3">
                  Comprehensive <br></br>Portfolio Tracking
                </p>
                <p className="sectwodesc">
                  Easily track all of your cryptocurrency investments in one
                  place with our comprehensive portfolio tracking feature. Stay
                  up-to-date on your portfolio's performance and make informed
                  decisions based on advanced analytics and performance metrics.
                </p>
                <button className="sectworeadmore">Learn more</button>
              </div>
            </Col>
            <Col md={4} className="margtopmb">
              <div>
                <Image
                  className="makehomeportborderradius"
                  src={images.sectwo}
                  width="100%"
                ></Image>
                <p className="sectwohead mt-3">
                  Education and <br></br>Learning Resources
                </p>
                <p className="sectwodesc">
                  Shootfolio provides a wealth of educational and learning
                  resources to help you enhance your knowledge of digital
                  assets. From beginner to advanced topics, our platform offers
                  a range of resources to help you become a more informed
                  investor.
                </p>
                <button className="sectworeadmore">Learn more</button>
              </div>
            </Col>
            <Col md={4} className="margtopmb">
              <div>
                <Image
                  className="makehomeportborderradius"
                  src={images.secthree}
                  width="100%"
                ></Image>
                <p className="sectwohead mt-3">
                  Real-time Market <br></br>Data and Insights
                </p>
                <p className="sectwodesc">
                  Stay ahead with real-time market data and insights on the
                  latest cryptocurrency trends. Our advanced analytics and tools
                  provide valuable insights into market movements and allow you
                  to make informed decisions about your investments.
                </p>
                <button className="sectworeadmore">Learn more</button>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <Testimonials />
      <Getintouch />
      <Footer />
    </div>
  );
};

export default Home;
