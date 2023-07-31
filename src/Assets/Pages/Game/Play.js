import { React, useState, useEffect } from "react";
import { Row, Container, Col, Button, Image } from "react-bootstrap";
import { images } from "../../../Images";
import Playpopup from "../../Components/Playpopup";
import Form from "react-bootstrap/Form";
import "../../Css/Game/Play.css";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  GetSingleGame,
  clearErrors,
  clearMessages,
} from "./../../../store/actions";

const Play = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const {
    singleGameData,
    errors: error,
    message,
    sessionExpireError,
  } = useSelector((state) => state.clubReducer);
  const [buttonPopup, setButtonPopup] = useState(false);
  const [buttonPopupEx, setButtonPopupEx] = useState(false);

  console.log("singleGameData is", singleGameData);
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
    dispatch(GetSingleGame(id));
  }, []);
  return (
    <div className="playbackgroundimag">
      <Container>
        <Row>
          <Col md={2}>
            {singleGameData?.rivalProtfolios &&
              singleGameData.rivalProtfolios.map((data, ind) => {
                return (
                  <div className="leftplaybutton" key={ind}>
                    <Image
                      crossOrigin="true"
                      height={"30%"}
                      width={"30%"}
                      src={
                        data?.portfolio?.coin?.photoPath &&
                        data.portfolio.coin.photoPath
                      }
                    />
                    <p className="playrank">
                      ${" "}
                      {data?.portfolio?.coin?.quote?.USD?.price &&
                        parseFloat(
                          data.portfolio.coin.quote.USD.price *
                            data?.portfolio?.quantity
                        ).toFixed(2)}
                      %
                    </p>
                  </div>
                );
              })}
            {/* <div className="leftplaybutton mt-3">
              <Image src={images.playbttwo} />
              <p className="playrank">+0.01%</p>
            </div>
            <div className="leftplaybutton mt-3">
              <Image src={images.playbtthree} />
              <p className="playrankred">-3.32%</p>
            </div>
            <div className="leftplaybutton mt-3">
              <Image src={images.playbtfour} />
              <p className="playrankred">-16.38%</p>
            </div>
            <div className="leftplaybutton mt-3">
              <Image src={images.playbtone} />
              <p className="playrank">+26.00%</p>
            </div> */}
          </Col>
          <Col md={3}></Col>
          <Col md={2}>
            <div className="maketimeinrowplayground">
              <div className="tmplayground">
                <p className="timetextplayground">
                  {singleGameData?.rivalProtfolios &&
                    singleGameData.rivalProtfolios[0]?.portfolio?.coin?.symbol}
                </p>
              </div>
              <div className="zhplayground">
                <p className="timetextplayground">
                  {singleGameData?.challengerProtfolios &&
                    singleGameData.challengerProtfolios[0]?.portfolio?.coin
                      ?.symbol}
                </p>
              </div>
            </div>
            <div className="maketimeinrowplayground">
              <div className="timehour">
                <p className="hourplayground">
                  {singleGameData?.rivalGoals && singleGameData.rivalGoals}
                </p>
              </div>
              <div className="timehour">
                <p className="hourplayground">
                  {singleGameData?.challengerGoals &&
                    singleGameData.challengerGoals}
                </p>
              </div>
            </div>
          </Col>
          <Col md={3}></Col>
          <Col md={2}>
            {singleGameData?.challengerProtfolios &&
              singleGameData.challengerProtfolios.map((data, ind) => {
                return (
                  <Button
                    className="leftplaybuttonhover"
                    onClick={() => setButtonPopupEx(true)}
                    key={ind}
                  >
                    <p className="playrankwhite">
                      $
                      {data?.portfolio?.coin?.quote?.USD?.price &&
                        parseFloat(
                          data.portfolio.coin.quote.USD.price *
                            data?.portfolio?.quantity
                        ).toFixed(2)}
                    </p>
                    <Image
                      crossOrigin="true"
                      height={"30%"}
                      width={"30%"}
                      src={
                        data?.portfolio?.coin?.photoPath &&
                        data.portfolio.coin.photoPath
                      }
                    />
                  </Button>
                );
              })}
            {/* <Button
              className="leftplaybuttonhover mt-3"
              onClick={() => setButtonPopupEx(true)}
            >
              <p className="playrankwhite">$7,836.00</p>
              <Image src={images.playbttwo} />
            </Button> */}
            {/* <Button
              className="leftplaybuttonhover mt-3"
              onClick={() => setButtonPopupEx(true)}
            >
              <p className="playrankwhite">$336,1.00</p>
              <Image src={images.playbtthree} />
            </Button> */}
            {/* <Button
              className="leftplaybuttonhover mt-3"
              onClick={() => setButtonPopupEx(true)}
            >
              <p className="playrankwhite">$7,836.00</p>
              <Image src={images.playbtfour} />
            </Button> */}
            {/* <Button
              className="leftplaybuttonhover mt-3"
              onClick={() => setButtonPopupEx(true)}
            >
              <p className="playrankwhite">$336,1.00</p>
              <Image src={images.playbtone} />
            </Button> */}
          </Col>
        </Row>
        <Playpopup trigger={buttonPopupEx} setTrigger={setButtonPopupEx}>
          <Form>
            <Form.Group>
              <Form.Label className="selectamountlablel mt-4">
                Selected Coin
              </Form.Label>
              <Form.Control
                className="exchangepopuptextfield"
                type="text"
                placeholder="Enter Amount"
              />
            </Form.Group>
            <div className="setbuttonpositionforplaypopup">
              <Button className="exchangepopbuy mt-3">Buy</Button>
              <Button className="exchangepopsell mt-3">Sell</Button>
            </div>
          </Form>
        </Playpopup>
        <Row className="paddsettopplay mt-5">
          <Col md={4}></Col>
          <Col md={1}>
            <Button
              className="playerclickpopupbutton"
              onClick={() => setButtonPopup(true)}
            >
              <div className="playerimagedivplay">
                <Image src={images.playerfive} width="50%" />
              </div>
              <div className="maketheminrowatbottomfield">
                <Image
                  crossOrigin="true"
                  height={"20%"}
                  width={"20%"}
                  src={
                    singleGameData?.challengerProtfolios &&
                    singleGameData.challengerProtfolios[0].portfolio?.coin
                      ?.photoPath
                  }
                />
                <p className="playrank m-1">
                  {" "}
                  +
                  {singleGameData?.challengerProtfolios &&
                    parseFloat(
                      singleGameData.challengerProtfolios[0].portfolio?.coin
                        ?.quote?.USD?.price *
                        singleGameData.challengerProtfolios[0].portfolio
                          ?.quantity
                    ).toFixed(2)}
                  %
                </p>
              </div>
            </Button>
          </Col>
          <Col md={2}></Col>
          <Col md={1}>
            <Button
              className="playerclickpopupbutton"
              onClick={() => setButtonPopup(true)}
            >
              <div className="playerimagedivplay">
                <Image src={images.playerfour} width="55%" />
              </div>
              <div className="maketheminrowatbottomfield">
                <Image
                  crossOrigin="true"
                  height={"20%"}
                  width={"20%"}
                  src={
                    singleGameData?.challengerProtfolios &&
                    singleGameData.challengerProtfolios[1].portfolio?.coin
                      ?.photoPath
                  }
                />
                <p className="playrankred m-1">
                  {" "}
                  -
                  {singleGameData?.challengerProtfolios &&
                    parseFloat(
                      singleGameData.challengerProtfolios[1].portfolio?.coin
                        ?.quote?.USD?.price *
                        singleGameData.challengerProtfolios[1].portfolio
                          ?.quantity
                    ).toFixed(2)}
                  %
                </p>
              </div>
            </Button>
          </Col>
          <Col md={2}></Col>
          <Col md={1}>
            <Button
              className="playerclickpopupbutton"
              onClick={() => setButtonPopup(true)}
            >
              <div className="playerimagedivplay">
                <Image src={images.playerone} width="50%" />
              </div>
              <div className="maketheminrowatbottomfield">
                <Image
                  crossOrigin="true"
                  height={"20%"}
                  width={"20%"}
                  src={
                    singleGameData?.challengerProtfolios &&
                    singleGameData.challengerProtfolios[2].portfolio?.coin
                      ?.photoPath
                  }
                />
                <p className="playrankred m-1">
                  {" "}
                  -
                  {singleGameData?.challengerProtfolios &&
                    parseFloat(
                      singleGameData.challengerProtfolios[2].portfolio?.coin
                        ?.quote?.USD?.price *
                        singleGameData.challengerProtfolios[2].portfolio
                          ?.quantity
                    ).toFixed(2)}
                  %
                </p>
              </div>
            </Button>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col md={6}></Col>
          <Col md={1}>
            <Button
              className="playerclickpopupbutton"
              onClick={() => setButtonPopup(true)}
            >
              <div className="playerimagedivplay">
                <Image src={images.playerthree} width="50%" />
              </div>
              <div className="maketheminrowatbottomfield">
                <Image
                  crossOrigin="true"
                  height={"20%"}
                  width={"20%"}
                  src={
                    singleGameData?.challengerProtfolios &&
                    singleGameData.challengerProtfolios[3].portfolio?.coin
                      ?.photoPath
                  }
                />
                <p className="playrankred m-1">
                  {" "}
                  -
                  {singleGameData?.challengerProtfolios &&
                    parseFloat(
                      singleGameData.challengerProtfolios[3].portfolio?.coin
                        ?.quote?.USD?.price *
                        singleGameData.challengerProtfolios[3].portfolio
                          ?.quantity
                    ).toFixed(2)}
                  %
                </p>
              </div>
            </Button>
          </Col>
          <Col md={2}></Col>
          <Col md={1}>
            <Button
              className="playerclickpopupbutton"
              onClick={() => setButtonPopup(true)}
            >
              <div className="playerimagedivplay">
                <Image src={images.playertwo} width="50%" />
              </div>
              <div className="maketheminrowatbottomfield">
                <Image
                  crossOrigin="true"
                  height={"20%"}
                  width={"20%"}
                  src={
                    singleGameData?.challengerProtfolios &&
                    singleGameData.challengerProtfolios[4].portfolio?.coin
                      ?.photoPath
                  }
                />
                <p className="playrank m-1">
                  {" "}
                  +
                  {singleGameData?.challengerProtfolios &&
                    parseFloat(
                      singleGameData.challengerProtfolios[4].portfolio?.coin
                        ?.quote?.USD?.price *
                        singleGameData.challengerProtfolios[4].portfolio
                          ?.quantity
                    ).toFixed(2)}
                  %
                </p>
              </div>
            </Button>
          </Col>
        </Row>
        <Playpopup trigger={buttonPopup} setTrigger={setButtonPopup}>
          <Form>
            <Form.Group>
              <Form.Label className="selectamountlablel mt-4">
                Select a coin type for each football player
              </Form.Label>
              <Form.Select
                className="selectcoinselect"
                aria-label="Select coin"
              >
                <option>SHIB</option>
                <option value="1">ACA</option>
                <option value="2">WAVES</option>
                <option value="3">GLMR</option>
                <option value="4">SFUND</option>
                <option value="5">ROCO</option>
                <option value="6">DOGE</option>
                <option value="7">SHIB</option>
              </Form.Select>
            </Form.Group>
            <div className="setbuttonpositionforplaypopup">
              <Button className="selecttokentoexchangeformbytton mt-3">
                Select
              </Button>
            </div>
          </Form>
        </Playpopup>
      </Container>
    </div>
  );
};

export default Play;
