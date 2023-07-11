import React from "react";
import { Container, Row, Col, Image, Button } from "react-bootstrap";
import "../../Css/Game/Gamehome.css";
import Header from "../../Components/Header";
import { images } from "../../../Images";
import { useNavigate } from "react-router-dom";
const Gamehome = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Header />
      <div className="herobggamehome">
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
            <Col md={2}></Col>
            <Col md={8}>
              <h1 className="heroheadcent mt-3">Welcome to Shootfolio</h1>
            </Col>
            <Col md={2}></Col>
          </Row>
          <Row>
            <Col md={3}></Col>
            <Col md={6}>
              <p className="herodesc mt-2">
                Join us on an exhilarating journey into the world of digital
                assets. Shootfolio is your gateway to explore, learn, and invest
                in cryptocurrencies. Gain valuable insights, track market
                trends, and make informed investment decisions with our
                comprehensive platform. Start your adventure today and unlock
                the potential of digital assets. Welcome to Shootfolio, where
                opportunity awaits.
              </p>
            </Col>
            <Col md={3}></Col>
          </Row>
          <Row className="mt-3">
            <Col md={4}></Col>
            <Col md={4} className="justifybutheadcent">
              <Button
                className="leftheader"
                onClick={() => navigate("/playgame")}
              >
                <Image
                  className="chromemargright"
                  src={images.chrome}
                  width="20px"
                />
                Open Shootfolio
              </Button>
              <Button className="rightheaderbutton">Learn More</Button>
            </Col>
            <Col md={4}></Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Gamehome;
