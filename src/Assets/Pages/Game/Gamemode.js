import React, { useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import "../../Css/Game/Gamemode.css";
import Header from "../../Components/Header";
import toast from "react-hot-toast";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  GetAllGameMode,
  clearErrors,
  clearMessages,
} from "./../../../store/actions";
import { Puff } from "react-loader-spinner";
const Gamemode = () => {
  const { state } = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    gameMode,
    errors: error,
    message,
    sessionExpireError,
    loading,
  } = useSelector((state) => state.gameModeReducer);

  useEffect(() => {
    if (!id) {
      navigate(-1);
    }
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
    dispatch(GetAllGameMode(1));
  }, []);
  return (
    <div>
      <Header />
      <div className="gamemodebgcolor">
        <Container>
          <Row>
            <Col md={3}></Col>
            <Col md={6}>
              <p className="selectgamemodeheading">Select a Gameplay Mode</p>
            </Col>
            <Col md={3}></Col>
          </Row>
        </Container>
        <div className="makescrolsecinmbl">
          <Container className="fullcontainerwidthswt mt-5">
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
            ) : gameMode.length > 0 ? (
              gameMode.map((item, ind) => {
                return (
                  <Row className="stripmodebg mt-3" key={ind}>
                    <Col md={7} xs={5}>
                      <p className="gamemodetitle">
                        {item.modeTitle && item.modeTitle}
                      </p>
                    </Col>
                    <Col md={1} xs={2}>
                      <p className="timetitlemode">Time</p>
                    </Col>
                    <Col md={1} xs={2}>
                      <p className="timeitselfmode">
                        {item.duration && item.duration}
                      </p>
                    </Col>
                    <Col md={3} xs={3}>
                      <div className="setmodebuttonend">
                        <Button
                          className="selectmodesubmitbutton"
                          onClick={() =>
                            navigate(`/joinclub/${item.id}`, {
                              state: {
                                leauge: id,
                                investableBudget: state.investableBudget,
                              },
                            })
                          }
                        >
                          Select
                        </Button>
                      </div>
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

export default Gamemode;
