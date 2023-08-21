import React from "react";
import { Container, Row, Col, Button, Image } from "react-bootstrap";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { useNavigate } from "react-router-dom";
import { images } from "../../Images";

const Verification = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Header />
      <div className="loginpagebg">
        <Container>
          <Row>
            <Col md={5}></Col>
            <Col md={2}>
              <Image style={{ maxWidth: "100%" }} src={images.success} />
            </Col>
            <Col md={5}></Col>
          </Row>
          <Row>
            <Col md={12}>
              <p className="loginheadcenter" style={{ fontSize: "24px" }}>
                Congratulations! Your email verification is successful. You can
                now log in to your account.
                <br />
                <Button
                  className="rightheaderbutton mt-2"
                  onClick={() => navigate("/signin")}
                >
                  Login
                </Button>
              </p>
            </Col>
          </Row>
          <Row>
            <Col md={3}></Col>
            <Col md={6}></Col>
            <Col md={3}></Col>
          </Row>
        </Container>
      </div>
      <Footer />
    </div>
  );
};

export default Verification;
