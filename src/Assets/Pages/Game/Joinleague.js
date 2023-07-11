import React, { useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import "../../Css/Game/Joinleague.css";
import Header from "../../Components/Header";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  GetAllGameLeague,
  clearErrors,
  clearMessages,
} from "./../../../store/actions";
import { Puff } from "react-loader-spinner";
const Joinleague = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    gameLeague,
    errors: error,
    message,
    sessionExpireError,
    loading,
  } = useSelector((state) => state.gameLeagueReducer);

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
    dispatch(GetAllGameLeague(1));
  }, []);
  return (
    <div>
      <Header />
      <div className="setjoinleaguepadding">
        <Container>
          <Row>
            <Col md={3}></Col>
            <Col md={6} className="makeradiocenter">
              <p className="joinleagueheading">Join the Exciting League</p>
              <p className="joinleaguedescriptionhead">
                Compete with the Best in the Crypto World
              </p>
            </Col>
            <Col md={3}></Col>
          </Row>
          <Row className="mt-4">
            <Col md={1}></Col>
            <Col md={10} className="makeleaguescenterincolten">
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
              ) : gameLeague.length > 0 ? (
                gameLeague.map((item, ind) => {
                  return (
                    <Col md={4} key={ind}>
                      <div className="leaguebg">
                        <p className="leaguetitle">
                          {item.leagueTitle && item.leagueTitle}
                        </p>
                        <div className="leaguecategory mt-3">
                          <p className="categorytitleleague">Category</p>
                          <p className="leaguecategoryitself">
                            {item.gameModeId?.gameType?.gameTitle &&
                              item.gameModeId.gameType.gameTitle}
                          </p>
                        </div>
                        <div className="leaguecategory mt-3">
                          <p className="categorytitleleague">Funds</p>
                          <p className="leaguecategoryitself">
                            $ {item.investableBudget && item.investableBudget}
                          </p>
                        </div>
                        <Button
                          className="selectleaguebutton mt-2"
                          onClick={() => navigate("/gamemode")}
                        >
                          Select
                        </Button>
                      </div>
                    </Col>
                  );
                })
              ) : (
                ""
              )}
              {/* <Col md={4}>
                <div className="leaguebg">
                  <p className="leaguetitle">
                    Crypto Amateur Learners<br></br> League
                  </p>
                  <div className="leaguecategory mt-3">
                    <p className="categorytitleleague">Category</p>
                    <p className="leaguecategoryitself">Amateur</p>
                  </div>
                  <div className="leaguecategory mt-3">
                    <p className="categorytitleleague">Funds</p>
                    <p className="leaguecategoryitself">$10,000</p>
                  </div>
                  <Button
                    className="selectleaguebutton mt-2"
                    href="/portfoliocreation"
                  >
                    Select
                  </Button>
                </div>
              </Col> */}
            </Col>
            <Col md={1}></Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Joinleague;
