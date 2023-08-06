import React, { useEffect } from "react";
import { Container, Row, Col, Button, Image } from "react-bootstrap";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import "../Css/Login.css";
import Loginform from "../Components/Loginform";
import { images } from "../../Images";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Signinwithgoogle,
  SigninwithFacebook,
  clearErrors,
  clearMessages,
} from "./../../store/actions";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    errors: error,
    message,
    sessionExpireError,
  } = useSelector((state) => state.authReducer);

  useEffect(() => {
    if (error.length > 0) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (sessionExpireError !== "") {
      toast.error(sessionExpireError);
      dispatch(clearErrors());
      setTimeout(() => navigate("/signin"), 1000);
    }
    if (message !== "") {
      toast.success(message);
      dispatch(clearMessages());
      setTimeout(() => navigate("/gamehome"), 2000);
    }
  }, [error, sessionExpireError, message]);
  return (
    <div>
      <Header />
      <div className="loginpagebg">
        <Container>
          <Row>
            <Col md={12}>
              <p className="loginheadcenter">Sign in to your Shootfolio account</p>
            </Col>
          </Row>
          <Row>
            <Col md={3}></Col>
            <Col md={6}>
              <Loginform />
            </Col>
            <Col md={3}></Col>
          </Row>
          <Row>
            <Col md={3}></Col>
            <Col md={6} className="paddingformregistration">
              <div className="makehrandorinrow mt-5 mb-5">
                <hr className="registrationpagehr"></hr>
                <p className="registrationor">Or</p>
                <hr className="registrationpagehr"></hr>
              </div>
              <div className="makebuttonsincenterregistersociallogin">
                <Button
                  className="registrationthroughgoogleaddmorepadding"
                  onClick={() => dispatch(Signinwithgoogle())}
                  style={{ cursor: "pointer" }}
                >
                  <Image
                    className="setregistersocial"
                    src={images.registergoogle}
                  />
                  Continue with google
                </Button>
                <Button
                  className="registrationthroughgoogle mt-4"
                  onClick={() => dispatch(SigninwithFacebook())}
                  style={{ cursor: "pointer" }}
                >
                  <Image
                    className="setregistersocial"
                    src={images.registerfacebook}
                  />
                  Continue with facebook
                </Button>
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

export default Login;
