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
              <p className="selectgamemodeheading">Select a Game Mode</p>
              <p className="selectgamemodedescmain">
                Choose the game mode that matches your playstyle and time
                availability. Each mode offers a unique gaming experience to
                test your skills in the crypto world.
              </p>
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
                    <Col md={3} xs={5}>
                      <p className="gamemodetitle">
                        {item.modeTitle && item.modeTitle}
                      </p>
                    </Col>
                    <Col md={4}>
                      <p className="gamemodetitle">
                        <small>
                          {item.modeTitle === "Idle (Player vs Machine)"
                            ? "Challenge: Compete against AI-controlled teams in a strategic, week-long match. Ideal for: Players seeking a longer-term, strategic gameplay experience."
                            : ""}
                          {item.modeTitle === "Idle (Player vs Player)"
                            ? "Challenge: Go head-to-head against another player in a thrilling, week-long match.Ideal for: Players looking for competitive matchups and strategic planning."
                            : ""}
                          {item.modeTitle === "Realtime (Player vs Player)"
                            ? "Challenge: Engage in real-time battles with other players for fast-paced excitement.Ideal for: Players who want immediate results and quick gameplay sessions."
                            : ""}
                          {item.modeTitle ===
                          "Multiplayer Realtime (5 Player vs 5 Player)"
                            ? "Challenge: Team up with friends in real-time 5v5 matches for an intense multiplayer experience. Ideal for: Players who love teamwork and coordinated strategies."
                            : ""}
                        </small>
                      </p>
                    </Col>
                    <Col md={2} xs={2}>
                      <p className="timetitlemode">Time Duration</p>
                    </Col>
                    <Col md={1} xs={2}>
                      <p className="timeitselfmode">
                        {item.duration && item.duration}
                      </p>
                    </Col>
                    <Col md={2} xs={3}>
                      <div className="setmodebuttonend">
                        <Button
                          className="selectmodesubmitbutton"
                          onClick={() =>
                            navigate(`/joinclub/${item.id}`, {
                              state: {
                                leauge: id,
                                investableBudget: state.investableBudget,
                                multiPlayer:
                                  item.modeTitle ===
                                  "Multiplayer Realtime (5 Player vs 5 Player)"
                                    ? "Multiplayer Realtime (5 Player vs 5 Player)"
                                    : "",
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
