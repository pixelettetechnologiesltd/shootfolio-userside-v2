import React from "react";
import { Container, Row, Col, Button, Image } from "react-bootstrap";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { images } from "../../Images"
import Signupform from "../Components/Signupform";
const Signup = () => {
  return (
    <div>
      <Header />
      <div className="loginpagebg">
        <Container>
          <Row>
            <Col md={12}>
              <p className="loginheadcenter">Sign Up</p>
            </Col>
          </Row>
          <Row>
            <Col md={3}></Col>
            <Col md={6}>
              <Signupform />
            </Col>
            <Col md={3}></Col>
          </Row>
          <Row>
            <Col md={3}></Col>
            <Col md={6} className='paddingformregistration'>
              <div className='makehrandorinrow mt-5 mb-5'>
                <hr className='registrationpagehr'></hr>
                <p className='registrationor'>Or</p>
                <hr className='registrationpagehr'></hr>
              </div>
              <div className='makebuttonsincenterregistersociallogin'>
                <Button className='registrationthroughgoogleaddmorepadding'><Image className='setregistersocial' src={images.registergoogle} />Continue with google</Button>
                <Button className='registrationthroughgoogle mt-4'><Image className='setregistersocial' src={images.registerfacebook} />Continue with facebook</Button>
              </div>
            </Col>
            <Col md={3}></Col>
          </Row>
        </Container>
      </div>
      <Footer />
    </div>
  );
};

export default Signup;
