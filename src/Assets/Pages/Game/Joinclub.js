import React, { useEffect } from "react";
import Header from "../../Components/Header";
import { Container, Row, Col, Image, Button } from "react-bootstrap";
import { images } from "../../../Images";
import "../../Css/Game/Joinclub.css";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  GetAllClub,
  clearErrors,
  clearMessages,
} from "./../../../store/actions";
import { Puff } from "react-loader-spinner";
const Joinclub = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    club,
    errors: error,
    message,
    sessionExpireError,
    loading,
  } = useSelector((state) => state.clubReducer);

  useEffect(() => {
    if (error.length > 0) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (sessionExpireError !== "") {
      toast.error(sessionExpireError);
      dispatch(clearErrors());
      setTimeout(() => navigate("/"), 1000);
    }
    if (message !== "") {
      toast.success(message);
      dispatch(clearMessages());
    }
  }, [error, sessionExpireError, message]);

  useEffect(() => {
    dispatch(GetAllClub(1));
  }, []);
  return (
    <div>
      <Header />
      <div className="joinclubaddpadding">
        <Container>
          <Row>
            <Col md={4}></Col>
            <Col md={4}>
              <p className="joiclubheadingtop">Join Club</p>
            </Col>
            <Col md={4}></Col>
          </Row>
        </Container>
        <div className="mt-5 makescrolsecinmbl">
          <Container className="makedisplayyinblock">
            <Row>
              <Col md={12} className="makeinrowtitlesjoinleague">
                <Col md={3} xs={3}>
                  <p className="joinleaguetitles">Scarcity</p>
                </Col>
                <Col md={2} xs={2}>
                  <p className="joinleaguetitles">Paucity</p>
                </Col>
                <Col md={2} xs={2}>
                  <p className="joinleaguetitles">User Name</p>
                </Col>
                <Col md={2} xs={2}>
                  <p className="joinleaguetitles">Assets</p>
                </Col>
              </Col>
            </Row>
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
            ) : club.length > 0 ? (
              club.map((item, ind) => {
                return (
                  <Row className="mt-3" key={ind}>
                    <Col md={12} className="joinclubsinglebg">
                      <Col md={3} xs={3}>
                        <div className="scarcityimgandtext">
                          <Image
                            crossOrigin="true"
                            src={item.logo && item.logo}
                            width="15%"
                          />
                          <p className="clubname">{item.title && item.title}</p>
                        </div>
                      </Col>
                      <Col md={2} xs={2}>
                        <p className="paucityvalue">
                          {item.symbol && item.symbol}
                        </p>
                      </Col>
                      <Col md={2} xs={2}>
                        <p className="paucityvalue">Cristiano Ronaldo</p>
                      </Col>
                      <Col md={2} xs={2}>
                        <Image src={images.clubassets} width="55%" />
                      </Col>
                      <Col md={3} xs={3}>
                        <div className="makebuttonendbeat">
                          <Button
                            className="beatclubbutton"
                            onClick={() => navigate("/portfoliocreation")}
                          >
                            Join Club
                          </Button>
                        </div>
                      </Col>
                    </Col>
                  </Row>
                );
              })
            ) : (
              ""
            )}
          </Container>
        </div>
      </div>
    </div>
  );
};

export default Joinclub;
