import React, { useEffect } from "react";
import Header from "../../Components/Header";
import { Container, Row, Col, Image, Button } from "react-bootstrap";
import "../../Css/Game/Joinclub.css";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  GetAllClub,
  GetGameForMultiPlayer,
  clearErrors,
  clearMessages,
} from "./../../../store/actions";
import { Puff } from "react-loader-spinner";
const Joinclub = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    club,
    errors: error,
    message,
    sessionExpireError,
    loading,
  } = useSelector((state) => state.clubReducer);
  const { gameForMultiPlayer } = useSelector(
    (state) => state.gameLeagueReducer
  );

  useEffect(() => {
    if (!id || !state) {
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
    if (state?.multiPlayer === "Multiplayer Realtime (5 Player vs 5 Player)") {
      let result = { leauge: state.leauge, gameMode: id };
      dispatch(GetGameForMultiPlayer(result));
    }
    dispatch(GetAllClub(1));
  }, []);

  const handleJoinClub = (item) => {
    if (state?.multiPlayer === "Multiplayer Realtime (5 Player vs 5 Player)") {
      navigate(`/multiPlayerPortfolio/${item.id}`, {
        state: {
          league: state.leauge,
          gameMode: id,
          investableBudget: state.investableBudget,
          gameForMultiPlayer: gameForMultiPlayer,
        },
      });
    } else {
      navigate(`/portfoliocreation/${item.id}`, {
        state: {
          league: state.leauge,
          gameMode: id,
          investableBudget: state.investableBudget,
        },
      });
    }
  };

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
                <Col md={4} xs={4}>
                  <p className="joinleaguetitles">Club Name</p>
                </Col>
                <Col md={4} xs={4}>
                  <p className="joinleaguetitles">Symbol</p>
                </Col>
                <Col md={4} xs={4}></Col>
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
                      <Col md={4} xs={4}>
                        <div className="scarcityimgandtext">
                          <Image
                            crossOrigin="true"
                            src={item.logo && item.logo}
                            width="15%"
                          />
                          <p className="clubname">{item.title && item.title}</p>
                        </div>
                      </Col>
                      <Col md={4} xs={4}>
                        <p className="paucityvalue">
                          {item.symbol && item.symbol}
                        </p>
                      </Col>

                      <Col md={4} xs={4}>
                        <div className="makebuttonendbeat">
                          <Button
                            className="beatclubbutton"
                            onClick={() => handleJoinClub(item)}
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
