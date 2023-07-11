import React from "react";
import "../Css/Footer.css";
import { Container, Row, Col, Image } from "react-bootstrap";
import { images } from "../../Images";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <div className="footerbgblack">
      <Container>
        <Row>
          <Col md={6}>
            <Link className="removelinefromlogo" to="/">
              <p className="footerlogo">Shootfolio</p>
            </Link>
            <p className="footercontacthead">CONTACT</p>
            <Link className="removelinefromlogo" to="mailto:">
              <p className="footeremail">support@shootfolio.com</p>
            </Link>
          </Col>
          <Col md={2}></Col>
          <Col md={2}>
            <p className="footheadlist">Navigation</p>
            <div className="makefooteroptiocolumn">
              <Link className="footlist" to="/">
                Home
              </Link>
              <Link className="footlist" to="/about">
                About
              </Link>
              <Link className="footlist" to="/contact">
                Contact
              </Link>
            </div>
          </Col>
          <Col md={2}>
            <p className="footheadlist">Stay up to date</p>
            <p className="footlist mt-4">
              Stay Informed On How You Can Make a Difference
            </p>
            <div className="socialfootspacebetween">
              <Image
                className="mblwidthicon"
                src={images.footone}
                width="20%"
              />
              <Image
                className="mblwidthicon"
                src={images.foottwo}
                width="20%"
              />
              <Image
                className="mblwidthicon"
                src={images.footthree}
                width="20%"
              />
              <Image
                className="mblwidthicon"
                src={images.footfour}
                width="20%"
              />
            </div>
          </Col>
        </Row>
      </Container>
      <Container>
        <Row className="bodertop mt-5">
          <p className="copywrite">
            © 2023 All Rights Reserved - Pixelette Technologies
          </p>
        </Row>
      </Container>
    </div>
  );
};

export default Footer;
