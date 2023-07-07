import React from "react";
import Header from "../Components/Header";
import Testimonials from "../Components/Testimonials";
import Getintouch from "../Components/Getintouch";
import Footer from "../Components/Footer";
import { Container, Row, Col, Image, Button } from "react-bootstrap";
import { images } from "../../Images";
import "../Css/About.css";
import Aboutslider from "../Components/Aboutslider"
const About = () => {
  return (
    <div>
      <Header />
      <div className="aboutherobg">
        <Container>
          <Row>
            <Col md={2}></Col>
            <Col md={8}>
              <h1 className="heroheadcent mt-3">Discover Our Story</h1>
            </Col>
            <Col md={2}></Col>
          </Row>
          <Row>
            <Col md={3}></Col>
            <Col md={6}>
              <p className="herodesc mt-2">
              At Shootfolio, everyone should have access to the knowledge and tools they need to succeed in the world of digital assets. Our platform provides comprehensive resources and tools for those looking to learn about and invest in cryptocurrencies.
              </p>
            </Col>
            <Col md={3}></Col>
          </Row>
          <Row className="mt-3">
            <Col md={4}></Col>
            <Col md={4} className="justifybutheadcent">
            <Button className="leftheader" href="/signup">Sign up</Button>
              <Button className="rightheaderbutton" href="/signin">Login</Button>
            </Col>
            <Col md={4}></Col>
          </Row>
        </Container>
      </div>
      <div className="aboutsecondbgblue">
        <Container>
          <Row>
            <Col md={6} className="makecontentaboutaligncenter">
              <p className="ourjourneysofar">Our Journey So Far</p>
              <p className="journeydesc">
              Shootfolio was founded in 2020 by a group of passionate digital asset investors who saw the need for a comprehensive platform that provides users with the tools and knowledge they need to succeed in the fast-paced world of cryptocurrencies. Since then, we have become a trusted resource for individuals and businesses looking to invest in digital assets.
              </p>
              <div className="aboutculturebuttonaligncenter">
              <button className="aboutlearnmore mt-4">Learn More</button>
              </div> 
            </Col>
            <Col md={6} className="alignaboutimageend">
              <Image className="makeimageaboutwidth100onmbl" src={images.aboutjourney} width="80%"/>
            </Col>
          </Row>
          <Row className="margabouttop100">
            <Col md={5} xs={10} className="removepad-right">
              <p className="yearabout">1990-1995</p>
              <p className="yeardescabout">
                Up maids me an ample stood given. Certainty say suffering his
                him collected intention promotion. Hill sold ham men made lose
                case. Views abode law heard jokes too. Was are delightful
                solicitude discovered collecting man day. Resolving neglected
                sir tolerably but existence conveying for. Day his put off
                unaffected literature partiality inhabiting.
              </p>
            </Col>
            <Col md={2} xs={2}>
              <div className="aboutyearborder">
                <Image src={images.border} width="38px"></Image>
              </div>
            </Col>
            <Col md={5}></Col>
          </Row>
          <Row className="mt-5">
            <Col md={5}></Col>
            <Col md={2} xs={2}>
              <div className="aboutyearborder">
                <Image
                  className="margbordright"
                  src={images.borderright}
                  width="38px"
                ></Image>
              </div>
            </Col>
            <Col md={5} xs={10} className="removepad-right">
              <p className="yearabout">1990-1995</p>
              <p className="yeardescabout">
                Up maids me an ample stood given. Certainty say suffering his
                him collected intention promotion. Hill sold ham men made lose
                case. Views abode law heard jokes too. Was are delightful
                solicitude discovered collecting man day. Resolving neglected
                sir tolerably but existence conveying for. Day his put off
                unaffected literature partiality inhabiting.
              </p>
            </Col>
          </Row>
          <Row className="mt-5">
            <Col md={5} xs={10} className="removepad-right">
              <p className="yearabout">1990-1995</p>
              <p className="yeardescabout">
                Up maids me an ample stood given. Certainty say suffering his
                him collected intention promotion. Hill sold ham men made lose
                case. Views abode law heard jokes too. Was are delightful
                solicitude discovered collecting man day. Resolving neglected
                sir tolerably but existence conveying for. Day his put off
                unaffected literature partiality inhabiting.
              </p>
            </Col>
            <Col md={2} xs={2}>
              <div className="aboutyearborder">
                <Image src={images.border} width="38px"></Image>
              </div>
            </Col>
            <Col md={5}></Col>
          </Row>
          <Row className="mt-5">
            <Col md={5}></Col>
            <Col md={2} xs={2}>
              <div className="aboutyearborder">
                <Image
                  className="margbordright"
                  src={images.borderright}
                  width="38px"
                ></Image>
              </div>
            </Col>
            <Col md={5} xs={10} className="removepad-right">
              <p className="yearabout">1990-1995</p>
              <p className="yeardescabout">
                Up maids me an ample stood given. Certainty say suffering his
                him collected intention promotion. Hill sold ham men made lose
                case. Views abode law heard jokes too. Was are delightful
                solicitude discovered collecting man day. Resolving neglected
                sir tolerably but existence conveying for. Day his put off
                unaffected literature partiality inhabiting.
              </p>
            </Col>
          </Row>
          <Row className="mt-5">
            <Col md={5} xs={10} className="removepad-right">
              <p className="yearabout">1990-1995</p>
              <p className="yeardescabout">
                Up maids me an ample stood given. Certainty say suffering his
                him collected intention promotion. Hill sold ham men made lose
                case. Views abode law heard jokes too. Was are delightful
                solicitude discovered collecting man day. Resolving neglected
                sir tolerably but existence conveying for. Day his put off
                unaffected literature partiality inhabiting.
              </p>
            </Col>
            <Col md={2} xs={2}>
              <div className="aboutyearborder">
                <Image src={images.border} width="38px"></Image>
              </div>
            </Col>
            <Col md={5}></Col>
          </Row>
          <Row className="mt-5">
            <Col md={5}></Col>
            <Col md={2} xs={2}>
              <div className="aboutyearborder">
                <Image
                  className="margbordright"
                  src={images.borderright}
                  width="38px"
                ></Image>
              </div>
            </Col>
            <Col md={5} xs={10} className="removepad-right">
              <p className="yearabout">1990-1995</p>
              <p className="yeardescabout">
                Up maids me an ample stood given. Certainty say suffering his
                him collected intention promotion. Hill sold ham men made lose
                case. Views abode law heard jokes too. Was are delightful
                solicitude discovered collecting man day. Resolving neglected
                sir tolerably but existence conveying for. Day his put off
                unaffected literature partiality inhabiting.
              </p>
            </Col>
          </Row>
        </Container>
      </div>
      <div className="teambg">
        <Container>
          <Row>
            <Col md={6}>
              <p className="ourteamhead">Meet Our Team</p>
            </Col>
            <Col md={6}>
              <p className="ourteamdesc">
              Our team comprises experienced digital asset investors, technologists, and industry experts passionate about helping our users succeed. With diverse backgrounds and skillsets, we bring a wealth of knowledge and expertise to the Shootfolio platform. Get to know our team and learn how they can help you achieve your investment goals.
              </p>
            </Col>
          </Row>
          <Row className="mt-5">
            <Col md={4}>
              <div className="teamcard">
                <div className="teamimage">
                  <Image src={images.teamone} width="100%" />
                </div>
                <div className="teamdata mt-3">
                  <div className="teamnamedesignationanddata">
                    <p className="teammembname">Liza Marko</p>
                    <p className="teammembdesignation">Managing Director</p>
                  </div>
                  <div className="teamsocial">
                    <Image src={images.footthree} width="30px" height="45%" />
                    <Image src={images.footone} width="30px" height="45%" />
                    <Image src={images.foottwo} width="30px" height="45%" />
                  </div>
                </div>
              </div>
            </Col>

            <Col md={4}>
              <div className="teamcard margtopmblteam">
                <div className="teamimage">
                  <Image src={images.teamtwo} width="100%" />
                </div>
                <div className="teamdata mt-3">
                  <div className="teamnamedesignationanddata">
                    <p className="teammembname">John Smith</p>
                    <p className="teammembdesignation">Managing Director</p>
                  </div>
                  <div className="teamsocial">
                    <Image src={images.footthree} width="30px" height="45%" />
                    <Image src={images.footone} width="30px" height="45%" />
                    <Image src={images.foottwo} width="30px" height="45%" />
                  </div>
                </div>
              </div>
            </Col>

            <Col md={4}>
              <div className="teamcard margtopmblteam">
                <div className="teamimage">
                  <Image src={images.teamthree} width="100%" />
                </div>
                <div className="teamdata mt-3">
                  <div className="teamnamedesignationanddata">
                    <p className="teammembname">Rowyan Doe</p>
                    <p className="teammembdesignation">Managing Director</p>
                  </div>
                  <div className="teamsocial">
                    <Image src={images.footthree} width="30px" height="45%" />
                    <Image src={images.footone} width="30px" height="45%" />
                    <Image src={images.foottwo} width="30px" height="45%" />
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <div className="aboutsecondbgblue">
        <Container>
          <Row>
            <Col md={6} className="makecontentaboutaligncenter">
              <p className="ourjourneysofar">A Collaborative Culture</p>
              <p className="journeydesc">
              At Shootfolio, we foster a collaborative and inclusive culture where everyone's ideas and contributions are valued. We believe in the power of teamwork and collaboration to achieve our goals, and we strive to create an environment where everyone feels heard and supported.
              </p>
              <div className="aboutculturebuttonaligncenter">
              <button className="aboutlearnmore mt-4">Learn More</button>
              </div>
            </Col>
            <Col md={6} className="alignaboutimageend">
              <Image className="makeimageaboutwidth100onmbl" src={images.aboutculture} width="80%"/>
            </Col>
          </Row>
        </Container>
      </div>
      <Testimonials />
      <div className="aboutsecondbgblue">
        <Container>
          <Row>
            <Col md={5}>
              <p className="ourjourneysofar">
                Celebrating <br></br>Our Achievements
              </p>
              <p className="journeydesc">
              At Shootfolio, we take pride in our accomplishments and the recognition we have received. We are grateful for the support and encouragement of our clients, and we strive to maintain the highest standards of excellence in everything we do.
              </p>
              <button className="aboutlearnmore mt-4">Learn More</button>
            </Col>
            <Col md={1}></Col>
            <Col md={6}>
                <Aboutslider/>
            </Col>
          </Row>
          <Row className="margabouttop100">
            <Col md={2}></Col>
            <Col md={8}>
                <p className="mediaresourcesaboutus">Media Resources</p>
                <p className="mediaresourcesaboutusdescription">Our press kit provides resources for media members to learn more about Shootfolio. You can find our latest press releases, company background information, and high-resolution images to help tell our story. For additional information or to request an interview, please contact our media relations team.</p>
            </Col>
            <Col md={2}></Col>
          </Row>
          <Row className="mt-5">
            <Col md={4}>
                <Image className="aboutblogborderradius" src={images.aboutmedone} width="100%"/>
                <p className="aboutmedhead mt-4">Dunt incididunt culpa qui officia deserunt molliest labn culpa</p>
                <p className="aboutmeddesc">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna</p>
                <p className="aboutmeddate">June 14, 2017</p>
            </Col>
            <Col md={4}>
                <Image className="aboutblogborderradius" src={images.aboutmedtwo} width="100%"/>
                <p className="aboutmedhead mt-4">Dunt incididunt culpa qui officia deserunt molliest labn culpa</p>
                <p className="aboutmeddesc">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna</p>
                <p className="aboutmeddate">June 14, 2017</p>
            </Col>
            <Col md={4}>
                <Image className="aboutblogborderradius" src={images.aboutmedthree} width="100%"/>
                <p className="aboutmedhead mt-4">Dunt incididunt culpa qui officia deserunt molliest labn culpa</p>
                <p className="aboutmeddesc">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna</p>
                <p className="aboutmeddate">June 14, 2017</p>
            </Col>
          </Row>
        </Container>
      </div>
      <Getintouch/>
      <Footer/>
    </div>
  );
};

export default About;
