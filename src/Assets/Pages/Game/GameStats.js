import React, { useEffect } from "react";
import "../../Css/Game/GameStats.css";
import { Container, Row, Col } from "react-bootstrap";
import Header from "../../Components/Header";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  GetGameHistory,
  clearErrors,
  clearMessages,
} from "./../../../store/actions";
import { Puff } from "react-loader-spinner";
import moment from "moment";

const GameStats = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const {
    errors: error,
    message,
    sessionExpireError,
    loading,
    gameHistory,
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
    dispatch(GetGameHistory(id));
  }, []);

  const formatMongoDate = (mongoDate) => {
    const createdAtDate = new Date(mongoDate);
    const monthsAbbreviated = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const day = createdAtDate.getDate();
    const month = createdAtDate.getMonth();
    const year = createdAtDate.getFullYear();

    return `${day} ${monthsAbbreviated[month]} ${year}`;
  };

  const formatMongoTime = (date) => {
    const createdAtDate = new Date(date);

    // Extracting hours and minutes
    const hours = createdAtDate.getHours();
    const minutes = createdAtDate.getMinutes();

    // Formatting the time using moment
    const formattedTime = moment(createdAtDate).format("h:mm A");
    return formattedTime;
  };
  return (
    <div>
      <Header />
      <div className="gamestatsbgcolor">
        <Container>
          <Row>
            <Col md={3}></Col>
            <Col md={6}>
              <p className="selectgamemodeheading">Game Statics</p>
            </Col>
            <Col md={3}></Col>
          </Row>
        </Container>
        <div className="makescrolsecinmbl">
          <Container className="fullcontainerwidthswt mt-5">
            <Row>
              <Col md={1}></Col>
              <Col md={10} className="makeinrowtitlesgamestats">
                <Col md={4} xs={4}>
                  <p className="joinleaguetitles">Remarks</p>
                </Col>
                <Col md={3} xs={3}>
                  <p className="joinleaguetitles">Date</p>
                </Col>
                <Col md={3} xs={3}>
                  <p className="joinleaguetitles">Time</p>
                </Col>
              </Col>
              <Col md={1}></Col>
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
            ) : gameHistory.length > 0 ? (
              gameHistory.map((data, ind) => {
                console.log("data is", data);
                return (
                  <Row key={ind}>
                    <Col md={1} xs={1}></Col>
                    <Col md={10} className="stripstatbg mt-3">
                      <Col md={4}>
                        <p className="timetitlestats">
                          {data?.text && data.text}
                        </p>
                      </Col>
                      <Col md={3} xs={3}>
                        <p className="timetitlestats">
                          {formatMongoDate(data?.createdAt && data.createdAt)}
                        </p>
                      </Col>
                      <Col md={3} xs={3}>
                        <p className="timetitlestats">
                          {formatMongoTime(data?.createdAt && data.createdAt)}
                        </p>
                      </Col>
                    </Col>
                    <Col md={1} xs={1}></Col>
                  </Row>
                );
              })
            ) : (
              <h1 style={{ color: "white" }}>No stats found</h1>
            )}
          </Container>
        </div>
      </div>
    </div>
  );
};

export default GameStats;
