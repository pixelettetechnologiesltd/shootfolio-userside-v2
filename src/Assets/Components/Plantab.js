import React, { useEffect } from "react";
import "../Css/Game/Plantab.css";
import { images } from "../../Images";
import { Container, Row, Col, Image, Button } from "react-bootstrap";
import { BiCheck } from "react-icons/bi";
import { BsArrowRight } from "react-icons/bs";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  GetAllSubscriptionPlan,
  SubscribedPlan,
  clearErrors,
  clearMessages,
} from "./../../store/actions";
import { Puff } from "react-loader-spinner";

const Plantab = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    subscriptionPlans,
    errors: error,
    sessionExpireError,
    message,
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
    if (message !== "") {
      toast.success(message);
      dispatch(clearMessages());
    }
  }, [error, sessionExpireError, message]);

  useEffect(() => {
    dispatch(GetAllSubscriptionPlan(1));
  }, []);

  return (
    <div>
      <Container>
        <Row className="margtopsetduemargneg">
          {loading ? (
            <Puff
              height="60"
              width="60"
              radius="6"
              color="white"
              ariaLabel="loading"
              wrapperStyle
              wrapperClass
            />
          ) : subscriptionPlans.length > 0 ? (
            subscriptionPlans.map((data, ind) => {
              return (
                <Col md={4} key={ind}>
                  <div className="plancardbg">
                    <div className="makeplanimgtexinrow">
                      <div>
                        <Image src={images.plan} width="70px" />
                      </div>
                      <div className="makebothlinetextincolumnplan">
                        <p className="planname">{data?.name && data.name}</p>
                        <p className="planprice">
                          $ {data?.amount && data.amount} per month
                        </p>
                      </div>
                    </div>
                    {data.leagues &&
                      data.leagues.map((item, ind) => {
                        return (
                          <div className="mt-5" key={ind}>
                            <p className="planadvantage">
                              <span className="planadvantagearrow">
                                <BiCheck />
                              </span>
                              {item.leagueTitle}
                            </p>
                          </div>
                        );
                      })}
                    <div className="makebuttonfullwidthplan">
                      <Button
                        className="mt-4 chooseplanbtn"
                        onClick={() => dispatch(SubscribedPlan(data._id))}
                      >
                        Choose Plan{" "}
                        <span className="margsetrightarrow">
                          <BsArrowRight />
                        </span>
                      </Button>
                    </div>
                  </div>
                </Col>
              );
            })
          ) : (
            <h1>No record found...</h1>
          )}

          {/* <Col md={4}>
            <div className="plancardbgblack">
              <div className="makeplanimgtexinrow">
                <div>
                  <Image src={images.plan} width="70px" />
                </div>
                <div className="makebothlinetextincolumnplan">
                  <p className="planname">Golden plan</p>
                  <p className="planprice">$100 pr month</p>
                </div>
              </div>
              <div className="mt-5">
                <p className="planadvantage">
                  <span className="planadvantagearrow">
                    <BiCheck />
                  </span>
                  50 Positions
                </p>
              </div>
              <div className="mt-4">
                <p className="planadvantage">
                  <span className="planadvantagearrow">
                    <BiCheck />
                  </span>
                  Max 10 selected coins
                </p>
              </div>
              <div className="mt-4">
                <p className="planadvantage">
                  <span className="planadvantagearrow">
                    <BiCheck />
                  </span>
                  Exchange arbitrage
                </p>
              </div>
              <div className="mt-4">
                <p className="planadvantage">
                  <span className="planadvantagearrow">
                    <BiCheck />
                  </span>
                  TA with 10 min interval
                </p>
              </div>
              <div className="mt-4">
                <p className="planadvantage">
                  <span className="planadvantagearrow">
                    <BiCheck />
                  </span>
                  Paper trading
                </p>
              </div>
              <div className="makebuttonfullwidthplan">
                <Button className="mt-4 chooseplanbtn">
                  Choose Plan{" "}
                  <span className="margsetrightarrow">
                    <BsArrowRight />
                  </span>
                </Button>
              </div>
            </div>
          </Col> */}

          {/* <Col md={4}>
            <div className="plancardbg">
              <div className="makeplanimgtexinrow">
                <div>
                  <Image src={images.plan} width="70px" />
                </div>
                <div className="makebothlinetextincolumnplan">
                  <p className="planname">Platinum plan</p>
                  <p className="planprice">$200 pr month</p>
                </div>
              </div>
              <div className="mt-5">
                <p className="planadvantage">
                  <span className="planadvantagearrow">
                    <BiCheck />
                  </span>
                  1000 Positions
                </p>
              </div>
              <div className="mt-4">
                <p className="planadvantage">
                  <span className="planadvantagearrow">
                    <BiCheck />
                  </span>
                  Max 15 selected coins
                </p>
              </div>
              <div className="mt-4">
                <p className="planadvantage">
                  <span className="planadvantagearrow">
                    <BiCheck />
                  </span>
                  All access to game features
                </p>
              </div>
              <div className="makebuttonfullwidthplan">
                <Button className="mt-4 chooseplanbtn">
                  Choose Plan{" "}
                  <span className="margsetrightarrow">
                    <BsArrowRight />
                  </span>
                </Button>
              </div>
            </div>
          </Col> */}
        </Row>
      </Container>
    </div>
  );
};

export default Plantab;
