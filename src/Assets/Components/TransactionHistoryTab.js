import React, { useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import "../Css/Game/TransactionHistoryTab.css";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { GetLoginUserCryptoPayment, clearErrors } from "./../../store/actions";
import { Puff } from "react-loader-spinner";

const TransactionHistoryTab = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    errors: error,
    sessionExpireError,
    loginUserCryptoPayment,
    loading,
  } = useSelector((state) => state.subscriptionReducer);

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
  }, [error, sessionExpireError]);
  const user = JSON.parse(sessionStorage.getItem("user"));

  useEffect(() => {
    dispatch(GetLoginUserCryptoPayment(user.id));
  }, []);
  return (
    <div>
      <Container className="mb-5">
        <Row className="mt-5">
          <Col md={12} className="setpaddingandinline">
            <Col md={3}>
              <p className="transhisttitle">Subscription</p>
            </Col>
            <Col md={3}>
              <p className="transhisttitle">Payment Method</p>
            </Col>
            <Col md={3}>
              <p className="transhisttitle">Transaction Hash</p>
            </Col>
            <Col md={3}>
              <p className="transhisttitle textstattitlecent">Status</p>
            </Col>
          </Col>
        </Row>
        {loading ? (
          <Puff
            height="20"
            width="30"
            radius="6"
            color="white"
            ariaLabel="loading"
            wrapperStyle
            wrapperClass
          />
        ) : loginUserCryptoPayment.length > 0 ? (
          loginUserCryptoPayment.map((data, ind) => {
            return (
              <Row className="mt-4" key={ind}>
                <Col md={12} className=" rowtranshistorybackground">
                  <Col md={3}>
                    <p className="transhisvalue">
                      {data?.subscription?.name && data.subscription.name}
                    </p>
                  </Col>
                  <Col md={3}>
                    <p className="transhisvalue">
                      {data?.paymentMethod && data.paymentMethod}
                    </p>
                  </Col>
                  <Col md={3}>
                    <p className="transhisvalue">
                      {data?.transactionHash && data.transactionHash}
                    </p>
                  </Col>
                  <Col md={3}>
                    <div className="statusgreenbgpaymenthistory">
                      <p className="transhisvalue">
                        {data?.status && data.status}
                      </p>
                    </div>
                  </Col>
                </Col>
              </Row>
            );
          })
        ) : (
          <h1>No record found</h1>
        )}
      </Container>
    </div>
  );
};

export default TransactionHistoryTab;
