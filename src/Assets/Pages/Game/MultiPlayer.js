import { React, useEffect, useState } from "react";
import { Row, Container, Col, Button, Image } from "react-bootstrap";
import { images } from "../../../Images";
import Playpopup from "../../Components/Playpopup";
import Menupopup from "../../Components/Menupopup";
import Form from "react-bootstrap/Form";
import "../../Css/Game/MultiPlayer.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { GetSingleGame } from "../../../store/actions";

const Play = () => {
  const [buttonPopup, setButtonPopup] = useState(false);
  const [buttonPopupEx, setButtonPopupEx] = useState(false);
  const [buttonPopupMen, setButtonPopupMen] = useState(false);
  const { id } = useParams();
  const dispatch = useDispatch();
  const { singleGameData, loading } = useSelector((s) => s.clubReducer);
  const navigate = useNavigate();

  console.log("singleGameData is", singleGameData);
  const handlePopup = () => {
    setButtonPopupEx(true);
  };

  // GetSingleGame
  useEffect(() => {
    if (id) {
      dispatch(
        GetSingleGame(id, null, () => {
          navigate("/profile", { replace: true });
        })
      );
    } else {
      navigate("/profile", { replace: true });
    }
  }, [dispatch, id, navigate]);

  const handlePercentageDiv = () => {
    setButtonPopup(true);
  };

  return loading ? (
    <p sty>loading...</p>
  ) : (
    <div className="playbackgroundimag">
      <Container>
        <Row>
          <Col md={1}>
            <Button
              className="hamburgontopgame"
              onClick={() => setButtonPopupMen(true)}
            >
              <GiHamburgerMenu />
            </Button>
            <Menupopup trigger={buttonPopupMen} setTrigger={setButtonPopupMen}>
              <p className="menuheadpop">MENU</p>
              <div className="makemenuitemsinrow">
                <Link className="menuitempopup">Resume Game</Link>
                <Link className="menuitempopup">General Settings</Link>
                <Link className="menuitempopup">Exit Game</Link>
              </div>
            </Menupopup>
          </Col>
        </Row>
        <Row>
          {singleGameData?.rivalProtfolios.length > 0 &&
            singleGameData.rivalProtfolios.map((data, ind) => {
              return (
                <Col md={2} key={ind}>
                  <div
                    className="leftplaybutton"
                    style={{ marginBottom: "0.5rem" }}
                  >
                    <Image
                      crossOrigin="true"
                      height={"25%"}
                      width={"25%"}
                      src={
                        data?.portfolio?.coin?.photoPath &&
                        data.portfolio.coin.photoPath
                      }
                    />
                    <p className="playrank">
                      {data?.portfolio?.coin?.quote?.USD?.price &&
                        parseFloat(data.portfolio.coin.quote.USD.price).toFixed(
                          2
                        )}{" "}
                      %
                    </p>
                  </div>
                </Col>
              );
            })}
          <Col md={3}></Col>
          <Col md={2}>
            <div className="maketimeinrowplayground">
              <div className="tmplayground">
                <p className="timetextplayground">TUT</p>
              </div>
              <div className="zhplayground">
                <p className="timetextplayground">DDF</p>
              </div>
            </div>
            <div className="maketimeinrowplayground">
              <div className="timehour">
                <p className="hourplayground">00</p>
              </div>
              <div className="timehour">
                <p className="hourplayground">01</p>
              </div>
            </div>
          </Col>
          <Col md={3}></Col>
          {singleGameData?.challengerProtfolios.length > 0 &&
            singleGameData.challengerProtfolios.map((data, ind) => {
              return (
                <Col md={2} key={ind}>
                  <Button
                    className="leftplaybuttonhover"
                    onClick={() => handlePopup()}
                    style={{ marginBottom: "0.5rem" }}
                  >
                    <p className="playrankwhite">
                      $
                      {data?.portfolio?.coin?.quote?.USD?.price &&
                        parseFloat(
                          data.portfolio.coin.quote.USD.price * data?.quantity
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
                </Col>
              );
            })}
        </Row>
        <Playpopup trigger={buttonPopupEx} setTrigger={setButtonPopupEx}>
          <Form>
            <Form.Group>
              <p className="selectamountlablel mt-4">
                Balance is <span style={{ color: "green" }}>$ 2000</span>
              </p>
              <p className="selectamountlablel mt-4">
                Coin Price is <span style={{ color: "green" }}>100</span>
              </p>
              <p className="selectamountlablel mt-4">
                Amount is <span style={{ color: "red" }}>300</span>
              </p>

              <Form.Label className="selectamountlablel">
                Selected Coin is{" "}
                <img
                  width={"20%"}
                  height={"20%"}
                  src={images.playbtthree}
                  alt="selectedCoin"
                />
              </Form.Label>
              <Form.Control
                className="exchangepopuptextfield"
                type="number"
                placeholder="Enter Amount"
                value="1"
              />
            </Form.Group>
            <div className="setbuttonpositionforplaypopup">
              <Button className="exchangepopbuy mt-3">Buy</Button>
              <Button className="exchangepopsell mt-3">Sell</Button>
            </div>
          </Form>
        </Playpopup>
        <Row className="margsettomakeinline">
          <Col md={1} className="removepaddfrombtn margletbtnsetplayinrow">
            <Button
              className="playerclickpopupbutton"
              onClick={() => handlePercentageDiv()}
            >
              <div className="playerimagedivplay">
                <Image src={images.playertwo} width="55%" />
              </div>
              <div className="maketheminrowatbottomfield">
                <Image
                  crossOrigin="true"
                  height={"30%"}
                  width={"30%"}
                  src={images.playbttwo}
                />
                <p className="playrank m-1"> 1.1 %</p>
              </div>
              <div className="maketheminrowatbottomfieldsecond margtopicobgplay">
                <Image
                  crossOrigin="true"
                  height={"30%"}
                  width={"30%"}
                  src={images.iunder}
                />
                <p className="iunderhead">GK</p>
              </div>
            </Button>
          </Col>
          <Col md={1} className="removepaddfrombtn marginsetforbuttontwoinrow">
            <Button className="playerclickpopupbutton">
              <div className="playerimagedivplay">
                <Image src={images.playerfive} width="55%" />
              </div>
              <div className="maketheminrowatbottomfield">
                <Image
                  crossOrigin="true"
                  height={"30%"}
                  width={"30%"}
                  src={images.playbtthree}
                />
                <p className="playrankred m-1"> 0.3 %</p>
              </div>
              <div className="maketheminrowatbottomfieldsecond margtopicobgplay">
                <Image
                  crossOrigin="true"
                  height={"30%"}
                  width={"30%"}
                  src={images.iunder}
                />
                <p className="iunderhead">DF</p>
              </div>
            </Button>
          </Col>
          <Col md={2}></Col>
          <Col md={1} className="removepaddfrombtn margsetforthirdinrow">
            <Button className="playerclickpopupbutton">
              <div className="playerimagedivplay">
                <Image src={images.playerthree} width="55%" />
              </div>
              <div className="maketheminrowatbottomfield">
                <Image
                  crossOrigin="true"
                  height={"30%"}
                  width={"30%"}
                  src={images.playbtfour}
                />
                <p className="playrankred m-1"> 1.00 %</p>
              </div>
              <div className="maketheminrowatbottomfieldsecond margtopicobgplay">
                <Image
                  crossOrigin="true"
                  height={"30%"}
                  width={"30%"}
                  src={images.iunder}
                />
                <p className="iunderhead">GK</p>
              </div>
            </Button>
          </Col>
          <Col md={2}></Col>
          <Col md={1} className="removepaddfrombtn marginsetforfourthbutinrow">
            <Button
              className="playerclickpopupbutton"
              onClick={() => setButtonPopup(true)}
            >
              <div className="playerimagedivplay">
                <Image src={images.playerfive} width="55%" />
              </div>
              <div className="maketheminrowatbottomfield">
                <Image
                  crossOrigin="true"
                  height={"30%"}
                  width={"30%"}
                  src={images.playbtone}
                />
                <p className="playrank m-1">
                  {" "}
                  {/* {singleGameData?.challengerProtfolios &&
                    parseFloat(
                      singleGameData.challengerProtfolios[1].portfolio?.coin
                        ?.quote?.USD?.percent_change_24h
                    ).toFixed(2)} */}
                  %
                </p>
              </div>
              <div className="maketheminrowatbottomfieldsecond margtopicobgplay">
                <Image
                  crossOrigin="true"
                  height={"30%"}
                  width={"30%"}
                  src={images.iunder}
                />
                <p className="iunderhead">DF</p>
              </div>
            </Button>
          </Col>
          <Col md={2}></Col>
          <Col md={1} className="removepaddfrombtn marginsetforfifthhbutinrow">
            <Button
              className="playerclickpopupbutton"
              onClick={() => setButtonPopup(true)}
            >
              <div className="playerimagedivplay">
                <Image src={images.playerfive} width="55%" />
              </div>
              <div className="maketheminrowatbottomfield">
                <Image
                  crossOrigin="true"
                  height={"30%"}
                  width={"30%"}
                  src={images.playbtone}
                />
                <p className="playrank m-1"> 11.00 %</p>
              </div>
              <div className="maketheminrowatbottomfieldsecond margtopicobgplay">
                <Image
                  crossOrigin="true"
                  height={"30%"}
                  width={"30%"}
                  src={images.iunder}
                />
                <p className="iunderhead">DF</p>
              </div>
            </Button>
          </Col>

          <Col md={1} className="removepaddfrombtn margsetforsixthinrow">
            <Button
              className="playerclickpopupbutton"
              onClick={() => setButtonPopup(true)}
            >
              <div className="playerimagedivplay">
                <Image src={images.playertwo} width="55%" />
              </div>
              <div className="maketheminrowatbottomfield">
                <Image
                  crossOrigin="true"
                  height={"30%"}
                  width={"30%"}
                  src={images.playbtfour}
                />
                <p className="playrankred m-1"> 20 %</p>
              </div>
              <div className="maketheminrowatbottomfieldsecond margtopicobgplay">
                <Image
                  crossOrigin="true"
                  height={"30%"}
                  width={"30%"}
                  src={images.iunder}
                />
                <p className="iunderhead">GK</p>
              </div>
            </Button>
          </Col>
        </Row>

        <Row className="mt-0">
          <Col md={1}></Col>
          {/* <Col md={1} className="removepaddfrombtn margsetforsevinrowtwo">
            <Button
              className="playerclickpopupbutton"
              onClick={() => handlePercentageDiv()}
            >
              <div className="playerimagedivplay">
                <Image src={images.playerfive} width="55%" />
              </div>
              <div className="maketheminrowatbottomfield">
                <Image
                  crossOrigin="true"
                  height={"30%"}
                  width={"30%"}
                  src={images.playbtone}
                />
                <p className="playrank m-1"> 13.00 %</p>
              </div>
              <div className="maketheminrowatbottomfieldsecond margtopicobgplay">
                <Image
                  crossOrigin="true"
                  height={"30%"}
                  width={"30%"}
                  src={images.iunder}
                />
                <p className="iunderhead">DF</p>
              </div>
            </Button>
          </Col> */}
          <Col md={2}></Col>
          {/* <Col md={1} className="removepaddfrombtn margsetforeighthinrowtwo">
            <Button
              className="playerclickpopupbutton"
              onClick={() => handlePercentageDiv()}
            >
              <div className="playerimagedivplay">
                <Image src={images.playerfive} width="55%" />
              </div>
              <div className="maketheminrowatbottomfield">
                <Image
                  crossOrigin="true"
                  height={"30%"}
                  width={"30%"}
                  src={images.playbtone}
                />
                <p className="playrank m-1"> 13.00 %</p>
              </div>
              <div className="maketheminrowatbottomfieldsecond margtopicobgplay">
                <Image
                  crossOrigin="true"
                  height={"30%"}
                  width={"30%"}
                  src={images.iunder}
                />
                <p className="iunderhead">DF</p>
              </div>
            </Button>
          </Col> */}
          <Col md={3}></Col>
          {/* <Col md={1} className="removepaddfrombtn margsetforninthinrowtwo">
            <Button
              className="playerclickpopupbutton"
              onClick={() => setButtonPopup(true)}
            >
              <div className="playerimagedivplay">
                <Image src={images.playertwo} width="55%" />
              </div>
              <div className="maketheminrowatbottomfield">
                <Image
                  crossOrigin="true"
                  height={"30%"}
                  width={"30%"}
                  src={images.playbtone}
                />
                <p className="playrankred m-1"> 13.00 %</p>
              </div>
              <div className="maketheminrowatbottomfieldsecond margtopicobgplay">
                <Image
                  crossOrigin="true"
                  height={"30%"}
                  width={"30%"}
                  src={images.iunder}
                />
                <p className="iunderhead">GK</p>
              </div>
            </Button>
          </Col> */}
          <Col md={2}></Col>
          <Col md={1} className="removepaddfrombtn margsetforlastoneinrow">
            <Button
              className="playerclickpopupbutton"
              onClick={() => setButtonPopup(true)}
            >
              <div className="playerimagedivplay">
                <Image src={images.playerfive} width="55%" />
              </div>
              <div className="maketheminrowatbottomfield">
                <Image
                  crossOrigin="true"
                  height={"30%"}
                  width={"30%"}
                  src={
                    singleGameData?.rivalProtfolios &&
                    singleGameData.rivalProtfolios[0]?.portfolio?.coin
                      ?.photoPath
                  }
                />
                <p className="playrank m-1">
                  {singleGameData?.challengerProtfolios &&
                    parseFloat(
                      singleGameData.rivalProtfolios[0]?.portfolio?.coin?.quote
                        ?.USD?.percent_change_24h
                    ).toFixed(2)}
                  %
                </p>
              </div>
              <div className="maketheminrowatbottomfieldsecond margtopicobgplay">
                <Image
                  crossOrigin="true"
                  height={"30%"}
                  width={"30%"}
                  src={images.iunder}
                />
                <p className="iunderhead">DF</p>
              </div>
            </Button>
          </Col>
        </Row>

        <Playpopup trigger={buttonPopup} setTrigger={setButtonPopup}>
          <Form>
            <p className="selectamountlablel mt-4">
              Balance is <span style={{ color: "green" }}>$ 2000</span>
            </p>
            <p className="selectamountlablel mt-4">
              Coin Price is <span style={{ color: "green" }}>$100</span>
            </p>
            <p className="selectamountlablel mt-4">
              Select Coin Price is <span style={{ color: "green" }}>$ 99</span>
            </p>

            <p className="selectamountlablel mt-4">
              Select Coin Price is according to Quantity{" "}
              <span style={{ color: "red" }}>
                {parseFloat(99).toFixed(2) * 2}
              </span>
            </p>
            <Form.Group>
              <Form.Label className="selectamountlablel mt-4">
                Select a coin type for each football player
              </Form.Label>
              <Form.Select
                className="selectcoinselect"
                aria-label="Select coin"
              >
                <option>Bitcoin</option>
              </Form.Select>
              <Form.Control
                className="exchangepopuptextfield"
                type="number"
                placeholder="Enter Quantity"
                value="1"
              />
            </Form.Group>
            <div className="setbuttonpositionforplaypopup">
              <Button className="selecttokentoexchangeformbytton mt-3">
                Update
              </Button>
            </div>
          </Form>
        </Playpopup>
      </Container>
    </div>
  );
};

export default Play;
