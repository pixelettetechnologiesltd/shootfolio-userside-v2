import React, { useEffect } from "react";
import { Container, Row, Col, Button, Image } from "react-bootstrap";

import "../Css/Login.css";
import PaymentCardForm from "../Components/PaymentCardForm";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, clearMessages } from "./../../store/actions";

const Stripe = () => {
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
      setTimeout(() => navigate("/profile"), 2000);
    }
  }, [error, sessionExpireError, message]);
  return (
    <div>
      <div className="loginpagebg">
        <Container>
          {/* <Row>
            <Col md={12}>
              <p className="loginheadcenter">Payment Card</p>
            </Col>
          </Row> */}
          <Row>
            <Col md={3}></Col>
            <Col md={6}>
              <PaymentCardForm />
            </Col>
            <Col md={3}></Col>
          </Row>
          <Row>
            <Col md={3}></Col>
            <Col md={6} className="paddingformregistration">
              <div className="makebuttonsincenterregistersociallogin"></div>
            </Col>
            <Col md={3}></Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Stripe;
