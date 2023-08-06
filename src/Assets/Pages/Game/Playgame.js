import React, { useEffect } from "react";
import { Container, Row, Col, Image, Button } from "react-bootstrap";
import "../../Css/Game/Playgame.css";
import Header from "../../Components/Header";
import { BsFillPlayFill } from "react-icons/bs";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  GetAllGameType,
  GetUserGameHistory,
  clearErrors,
  clearMessages,
} from "./../../../store/actions";
import { Puff } from "react-loader-spinner";
const Playgame = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    gameType,
    errors: error,
    message,
    sessionExpireError,
    loading,
  } = useSelector((state) => state.gameTypeReducer);
  const { userGameHistory } = useSelector((state) => state.authReducer);

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
    dispatch(GetAllGameType(1));
    dispatch(GetUserGameHistory());
  }, []);

  const handlePlay = () => {
    if (userGameHistory.length > 0) {
      const result = userGameHistory.filter(
        (item) => item.status === "Play" || item.status === "Pending"
      );
      console.log("result is", result);
      if (result) {
        navigate("/profile");
      } else {
        navigate("/joinleague");
      }
    } else {
      navigate("/joinleague");
    }
  };
  return (
    <div>
      <Header />
      <div className="exploringgamesectionbg">
        <Container>
          <Row>
            <Col md={4}></Col>
            <Col md={4}>
              <p className="Exploringheading">Choose Your Game</p>
              <p className="selectgamemodedesc">
                Dive into the Action with Your Favorite Sport
              </p>
            </Col>
            <Col md={4} className="alignwalletbutright"></Col>
          </Row>
          <Row className="marg-top-100-gamemodes">
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
            ) : gameType.length > 0 ? (
              gameType.map((item, ind) => {
                return (
                  <Col md={3}>
                    <div className="maketennisrow">
                      <Image
                        className="imgsize100atmbl"
                        crossOrigin="true"
                        src={item.iconUrl && item.iconUrl}
                        width="90%"
                      ></Image>
                      <p className="gamename mt-4">
                        {item.gameTitle && item.gameTitle}
                      </p>
                      <p className="statusgame">{item.status && item.status}</p>
                      {item?.status !== "Active" ? (
                        <Button className="gamestatusbutton mt-5">
                          <span className="gameplayicn">
                            <BsFillPlayFill />
                          </span>
                          How to play?
                        </Button>
                      ) : (
                        <Button
                          className="Freetoplaybutton mt-5"
                          onClick={() => handlePlay()}
                        >
                          <span className="gameplayicngreen">
                            <BsFillPlayFill />
                          </span>
                          Play
                        </Button>
                      )}
                    </div>
                  </Col>
                );
              })
            ) : (
              ""
            )}
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Playgame;
