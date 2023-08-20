import React, { useEffect } from "react";
import { Container, Row, Col, Image, Button } from "react-bootstrap";
import "../Css/Game/PortfolioHistory.css";
import { images } from "../../Images";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { GetUserGameHistory, clearErrors } from "./../../store/actions";
import { Puff } from "react-loader-spinner";

const PortfolioHistory = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    userGameHistory,
    errors: error,
    sessionExpireError,
    loading,
  } = useSelector((state) => state.authReducer);

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
  }, [error, sessionExpireError]);

  useEffect(() => {
    dispatch(GetUserGameHistory());
  }, []);

  const handleStatus = (data) => {
    if (data.status === "Play") {
      if (
        data?.gameMode?.modeTitle ===
        "Multiplayer Realtime (5 Player vs 5 Player)"
      ) {
        navigate(`/multiPlayer/${data.id}`);
      } else if (data?.gameMode?.modeTitle === "Idle (Player vs Player)") {
        navigate(`/playvsPlay/${data.id}`);
      } else {
        navigate(`/play/${data.id}`);
      }
    }
  };
  return (
    <div>
      <Container className="mb-5">
        <Row className="mt-5">
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
          ) : userGameHistory.length > 0 ? (
            userGameHistory.map((data, ind) => {
              return (
                <Col md={12} key={ind}>
                  <div className="rowhistorybackground">
                    <Col md={3}>
                      <div className="makeimageshistoryinrow">
                        <div className="maketextimagealigncentplayer">
                          <Image
                            crossOrigin="true"
                            height={"30%"}
                            width={"30%"}
                            src={
                              data?.challengerClub?.logo &&
                              data.challengerClub.logo
                            }
                          />
                          <p className="historyclubname">
                            {data?.challengerClub?.symbol &&
                              data.challengerClub.symbol}
                          </p>
                        </div>
                        <p className="colonfonthistory">:</p>
                        <div className="maketextimagealigncentplayer">
                          <Image
                            height={"30%"}
                            width={"30%"}
                            crossOrigin="true"
                            src={data?.rivalClub?.logo && data.rivalClub.logo}
                          />
                          <p className="historyclubname">
                            {data?.rivalClub?.symbol && data.rivalClub.symbol}
                          </p>
                        </div>
                      </div>
                    </Col>
                    <Col md={1}></Col>
                    <Col md={3}>
                      <div>
                        <p className="gametypeheadhistory">Game Type</p>
                        <p className="gametypehistory">
                          {data?.gameMode?.modeTitle && data.gameMode.modeTitle}
                        </p>
                      </div>
                    </Col>
                    {/* <Col md={3}>
                      <p className="gametypeheadhistory">Portfolio Tokens</p>
                      <Image src={images.clubassets} />
                    </Col> */}
                    <Col
                      md={2}
                      className="putstathistorybuttonatend"
                      onClick={() => navigate(`/gameState/${data.id}`)}
                    >
                      <Button className="viewstatshistory">
                        View Game Statics
                      </Button>
                    </Col>
                    <Col
                      md={2}
                      className="putstathistorybuttonatend"
                      onClick={() => handleStatus(data)}
                    >
                      <Button className="viewstatshistory">
                        {data?.status && data.status}
                      </Button>
                    </Col>
                  </div>
                </Col>
              );
            })
          ) : (
            <h1>No history found</h1>
          )}
        </Row>
      </Container>
    </div>
  );
};

export default PortfolioHistory;
