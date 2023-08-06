import { React, useState, useEffect } from "react";
import { Row, Container, Col, Button, Image } from "react-bootstrap";
import { images } from "../../../Images";
import Playpopup from "../../Components/Playpopup";
import Menupopup from "../../Components/Menupopup";
import Form from "react-bootstrap/Form";
import "../../Css/Game/Play.css";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { GiHamburgerMenu} from "react-icons/gi";
import {
  GetSingleGame,
  SellCoin,
  BuyCoin,
  UpdateCoin,
  GetAllCoin,
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
    loading,
    buyLoading,
    coin,
  } = useSelector((state) => state.clubReducer);
  const [buttonPopup, setButtonPopup] = useState(false);
  const [buttonPopupEx, setButtonPopupEx] = useState(false);
  const [buttonPopupMen,setButtonPopupMen] = useState (false)

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
      setButtonPopupEx(false);
      setButtonPopup(false);
    }
  }, [error, sessionExpireError, message]);

  useEffect(() => {
    dispatch(GetSingleGame(id));
    dispatch(GetAllCoin());
  }, []);

  let firstPercentage =
    singleGameData?.challengerProtfolios &&
    parseFloat(
      singleGameData.challengerProtfolios[0].portfolio?.coin?.quote?.USD
        ?.percent_change_24h
    ).toFixed(2);
  if (firstPercentage) {
    var convertFirstPercentageIntoString = firstPercentage?.toString();
  }
  if (convertFirstPercentageIntoString) {
    var hasMinusSignInFirstPercentage =
      convertFirstPercentageIntoString.includes("-");
  }

  let seoncPercentage =
    singleGameData?.challengerProtfolios &&
    parseFloat(
      singleGameData.challengerProtfolios[1].portfolio?.coin?.quote?.USD
        ?.percent_change_24h
    ).toFixed(2);
  if (seoncPercentage) {
    var convertSecondPercentageIntoString = seoncPercentage?.toString();
  }
  if (convertSecondPercentageIntoString) {
    var hasMinusSignInSecondPercentage =
      convertSecondPercentageIntoString.includes("-");
  }

  let thirdPercentage =
    singleGameData?.challengerProtfolios &&
    parseFloat(
      singleGameData.challengerProtfolios[2].portfolio?.coin?.quote?.USD
        ?.percent_change_24h
    ).toFixed(2);
  if (thirdPercentage) {
    var convertThirdPercentageIntoString = thirdPercentage?.toString();
  }
  if (convertThirdPercentageIntoString) {
    var hasMinusSignInThirdPercentage =
      convertThirdPercentageIntoString.includes("-");
  }

  let fourthPercentage =
    singleGameData?.challengerProtfolios &&
    parseFloat(
      singleGameData.challengerProtfolios[3].portfolio?.coin?.quote?.USD
        ?.percent_change_24h
    ).toFixed(2);
  if (fourthPercentage) {
    var convertFourthPercentageIntoString = fourthPercentage?.toString();
  }
  if (convertFourthPercentageIntoString) {
    var hasMinusSignInFourthPercentage =
      convertFourthPercentageIntoString.includes("-");
  }

  let fifthPercentage =
    singleGameData?.challengerProtfolios &&
    parseFloat(
      singleGameData.challengerProtfolios[4].portfolio?.coin?.quote?.USD
        ?.percent_change_24h
    ).toFixed(2);
  if (fifthPercentage) {
    var convertFifthPercentageIntoString = fifthPercentage?.toString();
  }
  if (convertFifthPercentageIntoString) {
    var hasMinusSignInFifthPercentage =
      convertFifthPercentageIntoString.includes("-");
  }
  const [selectedCoinAmount, setSelectedCoinAmount] = useState("");
  const [selectedCoin, setSelectedCoin] = useState(null);
  const [selectData, setSelectedData] = useState();
  const handlePopup = (data) => {
    setSelectedData(data);
    setSelectedCoinAmount(
      parseFloat(
        data?.portfolio?.coin?.quote?.USD?.price * data?.quantity
      ).toFixed(2)
    );
    setSelectedCoin(data?.portfolio?.coin?.photoPath);
    setButtonPopupEx(true);
  };
  const [amountValue, setAmountValue] = useState(0);
  const [displayAmountValue, setDisplayAmountValue] = useState(0);

  const handleAmountValue = (value) => {
    setAmountValue(value);
    setDisplayAmountValue(value * selectedCoinAmount);
  };

  const handleSellCoin = () => {
    let finalResult = {
      id: singleGameData?.id,
      portfolio: selectData?.portfolio?.id,
      quantity: amountValue,
    };
    dispatch(SellCoin(finalResult));
    setAmountValue("");
    setDisplayAmountValue("");
  };

  const handleBuyCoin = () => {
    let finalResult = {
      id: singleGameData?.id,
      portfolio: selectData?.portfolio?.id,
      quantity: amountValue,
    };
    dispatch(BuyCoin(finalResult));
    setAmountValue("");
    setDisplayAmountValue("");
  };

  const [currentPortfolio, setCurrentPortfolio] = useState("");
  const [portfolioPrice, setPortfolioPrice] = useState("");
  const [newPortfolio, setNewPortfolio] = useState("");
  const [portfolioQuantity, setPortfolioQuantity] = useState("");
  const [currentGameId, setCurrentGameId] = useState("");
  const [newCoinPrice, setNewCoinPrice] = useState("");
  const handlePercentageDiv = (index) => {
    setPortfolioPrice(
      singleGameData?.challengerProtfolios[index]?.portfolio?.coin?.quote?.USD
        ?.price *
        singleGameData?.challengerProtfolios[index]?.portfolio?.quantity
    );
    setCurrentPortfolio(
      singleGameData?.challengerProtfolios[index]?.portfolio?.id
    );
    setButtonPopup(true);
    setCurrentGameId(singleGameData?.id);
  };

  const handleUpdate = () => {
    if (!portfolioQuantity) {
      toast.error("Coin quantity is required");
    } else {
      let finalresult = {
        id: currentGameId,
        currentPortfolio: currentPortfolio,
        newPortfolio: newPortfolio,
        quantity: portfolioQuantity,
      };
      dispatch(UpdateCoin(finalresult));
    }
  };

  const handleNewPortfolio = (e) => {
    let dropdownData = e.target.value.split(" ");
    let coinId = dropdownData[0] || "";
    const newCoinPrice = dropdownData.slice(-1);
    setNewPortfolio(coinId);
    setNewCoinPrice(newCoinPrice);
  };
  return (
    <div className="playbackgroundimag">
      <Container>
        <Row>
          <Col md={1}>
            <Button className="hamburgontopgame" onClick={() => setButtonPopupMen(true)}><GiHamburgerMenu/></Button>
            <Menupopup  trigger={buttonPopupMen} setTrigger={setButtonPopupMen}>
              
                <p className="menuheadpop">MENU</p>
                <div className="makemenuitemsinrow">
                <Link className="menuitempopup">Resume Game</Link>
                <Link className="menuitempopup">General Settings</Link>
                <Link className="menuitempopup" >Exit Game</Link>
              </div>
            </Menupopup>
          </Col>
        </Row>
        <Row>
          <Col md={2}>
            {singleGameData?.rivalProtfolios &&
              singleGameData.rivalProtfolios.map((data, ind) => {
                return (
                  <div
                    className="leftplaybutton"
                    key={ind}
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
                      {/* ${" "} */}
                      {data?.portfolio?.coin?.quote?.USD?.price &&
                        parseFloat(data.portfolio.coin.quote.USD.price).toFixed(
                          2
                        )}
                      %
                    </p>
                  </div>
                );
              })}
          </Col>
          <Col md={3}></Col>
          <Col md={2}>
            <div className="maketimeinrowplayground">
              <div className="tmplayground">
                <p className="timetextplayground">
                  {singleGameData?.rivalProtfolios &&
                    singleGameData.rivalProtfolios[0]?.portfolio?.club?.symbol}
                </p>
              </div>
              <div className="zhplayground">
                <p className="timetextplayground">
                  {singleGameData?.challengerProtfolios &&
                    singleGameData.challengerProtfolios[0]?.portfolio?.club
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
                    onClick={() => handlePopup(data)}
                    key={ind}
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
                );
              })}
          </Col>
        </Row>
        <Playpopup trigger={buttonPopupEx} setTrigger={setButtonPopupEx}>
          <Form>
            <Form.Group>
              <p className="selectamountlablel mt-4">
                Balance is{" "}
                <span style={{ color: "green" }}>
                  {singleGameData?.challengerBalance &&
                    parseFloat(singleGameData.challengerBalance).toFixed(2)}
                </span>
              </p>
              <p className="selectamountlablel mt-4">
                Coin Price is{" "}
                <span style={{ color: "green" }}>
                  {selectedCoinAmount && selectedCoinAmount}
                </span>
              </p>
              {displayAmountValue && (
                <p className="selectamountlablel mt-4">
                  Amount is{" "}
                  <span style={{ color: "red" }}>{displayAmountValue}</span>
                </p>
              )}

              <Form.Label className="selectamountlablel">
                Selected Coin is{" "}
                <img
                  width={"20%"}
                  height={"20%"}
                  src={selectedCoin && selectedCoin}
                  alt="selectedCoin"
                />
              </Form.Label>
              <Form.Control
                className="exchangepopuptextfield"
                type="number"
                placeholder="Enter Amount"
                value={amountValue}
                onChange={(e) => handleAmountValue(e.target.value)}
              />
            </Form.Group>
            <div className="setbuttonpositionforplaypopup">
              <Button
                className="exchangepopbuy mt-3"
                onClick={() => handleBuyCoin()}
                disabled={buyLoading ? true : false}
              >
                {buyLoading ? "Please wait..." : "Buy"}
              </Button>
              <Button
                className="exchangepopsell mt-3"
                onClick={() => handleSellCoin()}
                disabled={loading ? true : false}
              >
                {loading ? "Please wait..." : "Sell"}
              </Button>
            </div>
          </Form>
        </Playpopup>
        <Row className="margsettomakeinline">
          <Col md={1} className="removepaddfrombtn margletbtnsetplayinrow">

            <Button
              className="playerclickpopupbutton"
              onClick={() => handlePercentageDiv(0)}
            >
              <div className="playerimagedivplay">
                <Image src={images.playertwo} width="55%" />
              </div>
              <div className="maketheminrowatbottomfield">
                <Image
                  crossOrigin="true"
                  height={"30%"}
                  width={"30%"}
                  src={
                    singleGameData?.challengerProtfolios &&
                    singleGameData.challengerProtfolios[0].portfolio?.coin
                      ?.photoPath
                  }
                />
                <p
                  className={`${
                    hasMinusSignInFirstPercentage ? "playrankred" : "playrank"
                  } m-1`}
                >
                  {" "}
                  {singleGameData?.challengerProtfolios &&
                    parseFloat(
                      singleGameData.challengerProtfolios[0].portfolio?.coin
                        ?.quote?.USD?.percent_change_24h
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
                <p className="iunderhead">
                 GK
                </p>
              </div>
            </Button>
          </Col>
          <Col md={1} className="removepaddfrombtn marginsetforbuttontwoinrow">
            <Button
              className="playerclickpopupbutton"
              onClick={() => handlePercentageDiv(1)}
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
                    singleGameData?.challengerProtfolios &&
                    singleGameData.challengerProtfolios[1].portfolio?.coin
                      ?.photoPath
                  }
                />
                <p
                  className={`${
                    hasMinusSignInSecondPercentage ? "playrankred" : "playrank"
                  } m-1`}
                >
                  {" "}
                  {singleGameData?.challengerProtfolios &&
                    parseFloat(
                      singleGameData.challengerProtfolios[1].portfolio?.coin
                        ?.quote?.USD?.percent_change_24h
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
                <p className="iunderhead">
                 DF
                </p>
              </div>
            </Button>
          </Col>
          <Col md={2}></Col>
          <Col md={1} className="removepaddfrombtn margsetforthirdinrow">
            <Button
              className="playerclickpopupbutton"
              onClick={() => handlePercentageDiv(2)}
            >
              <div className="playerimagedivplay">
                <Image src={images.playerthree} width="55%" />
              </div>
              <div className="maketheminrowatbottomfield">
                <Image
                  crossOrigin="true"
                  height={"30%"}
                  width={"30%"}
                  src={
                    singleGameData?.challengerProtfolios &&
                    singleGameData.challengerProtfolios[2].portfolio?.coin
                      ?.photoPath
                  }
                />
                <p
                  className={`${
                    hasMinusSignInThirdPercentage ? "playrankred" : "playrank"
                  } m-1`}
                >
                  {" "}
                  {singleGameData?.challengerProtfolios &&
                    parseFloat(
                      singleGameData.challengerProtfolios[2].portfolio?.coin
                        ?.quote?.USD?.percent_change_24h
                    ).toFixed(2)}
                  {/* percent_change_24h */}%
                </p>
              </div>
              <div className="maketheminrowatbottomfieldsecond margtopicobgplay">
                <Image
                  crossOrigin="true"
                  height={"30%"}
                  width={"30%"}
                  src={images.iunder}
                />
                <p className="iunderhead">
                 GK
                </p>
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
                  src={
                    singleGameData?.challengerProtfolios &&
                    singleGameData.challengerProtfolios[1].portfolio?.coin
                      ?.photoPath
                  }
                />
                <p
                  className={`${
                    hasMinusSignInSecondPercentage ? "playrankred" : "playrank"
                  } m-1`}
                >
                  {" "}
                  {singleGameData?.challengerProtfolios &&
                    parseFloat(
                      singleGameData.challengerProtfolios[1].portfolio?.coin
                        ?.quote?.USD?.percent_change_24h
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
                <p className="iunderhead">
                 DF
                </p>
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
                  src={
                    singleGameData?.challengerProtfolios &&
                    singleGameData.challengerProtfolios[1].portfolio?.coin
                      ?.photoPath
                  }
                />
                <p
                  className={`${
                    hasMinusSignInSecondPercentage ? "playrankred" : "playrank"
                  } m-1`}
                >
                  {" "}
                  {singleGameData?.challengerProtfolios &&
                    parseFloat(
                      singleGameData.challengerProtfolios[1].portfolio?.coin
                        ?.quote?.USD?.percent_change_24h
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
                <p className="iunderhead">
                 DF
                </p>
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
                  src={
                    singleGameData?.challengerProtfolios &&
                    singleGameData.challengerProtfolios[0].portfolio?.coin
                      ?.photoPath
                  }
                />
                <p
                  className={`${
                    hasMinusSignInFirstPercentage ? "playrankred" : "playrank"
                  } m-1`}
                >
                  {" "}
                  {singleGameData?.challengerProtfolios &&
                    parseFloat(
                      singleGameData.challengerProtfolios[0].portfolio?.coin
                        ?.quote?.USD?.percent_change_24h
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
                <p className="iunderhead">
                 GK
                </p>
              </div>
            </Button>
          </Col>
        </Row>


        <Row className="mt-0">
          <Col md={1}></Col>
          <Col md={1} className="removepaddfrombtn margsetforsevinrowtwo">
            <Button
              className="playerclickpopupbutton"
              onClick={() => handlePercentageDiv(3)}
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
                    singleGameData?.challengerProtfolios &&
                    singleGameData.challengerProtfolios[1].portfolio?.coin
                      ?.photoPath
                  }
                />
                <p
                  className={`${
                    hasMinusSignInSecondPercentage ? "playrankred" : "playrank"
                  } m-1`}
                >
                  {" "}
                  {singleGameData?.challengerProtfolios &&
                    parseFloat(
                      singleGameData.challengerProtfolios[1].portfolio?.coin
                        ?.quote?.USD?.percent_change_24h
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
                <p className="iunderhead">
                 DF
                </p>
              </div>
            </Button>
          </Col>
          <Col md={2}></Col>
          <Col md={1} className="removepaddfrombtn margsetforeighthinrowtwo">
            <Button
              className="playerclickpopupbutton"
              onClick={() => handlePercentageDiv(4)}
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
                    singleGameData?.challengerProtfolios &&
                    singleGameData.challengerProtfolios[1].portfolio?.coin
                      ?.photoPath
                  }
                />
                <p
                  className={`${
                    hasMinusSignInSecondPercentage ? "playrankred" : "playrank"
                  } m-1`}
                >
                  {" "}
                  {singleGameData?.challengerProtfolios &&
                    parseFloat(
                      singleGameData.challengerProtfolios[1].portfolio?.coin
                        ?.quote?.USD?.percent_change_24h
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
                <p className="iunderhead">
                 DF
                </p>
              </div>
            </Button>
          </Col>
          <Col md={3}></Col>
          <Col md={1} className="removepaddfrombtn margsetforninthinrowtwo">
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
                  src={
                    singleGameData?.challengerProtfolios &&
                    singleGameData.challengerProtfolios[0].portfolio?.coin
                      ?.photoPath
                  }
                />
                <p
                  className={`${
                    hasMinusSignInFirstPercentage ? "playrankred" : "playrank"
                  } m-1`}
                >
                  {" "}
                  {singleGameData?.challengerProtfolios &&
                    parseFloat(
                      singleGameData.challengerProtfolios[0].portfolio?.coin
                        ?.quote?.USD?.percent_change_24h
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
                <p className="iunderhead">
                 GK
                </p>
              </div>
            </Button>
          </Col>
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
                    singleGameData?.challengerProtfolios &&
                    singleGameData.challengerProtfolios[1].portfolio?.coin
                      ?.photoPath
                  }
                />
                <p
                  className={`${
                    hasMinusSignInSecondPercentage ? "playrankred" : "playrank"
                  } m-1`}
                >
                  {" "}
                  {singleGameData?.challengerProtfolios &&
                    parseFloat(
                      singleGameData.challengerProtfolios[1].portfolio?.coin
                        ?.quote?.USD?.percent_change_24h
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
                <p className="iunderhead">
                 DF
                </p>
              </div>
            </Button>
          </Col>
        </Row>
        <Playpopup trigger={buttonPopup} setTrigger={setButtonPopup}>
          <Form>
            <p className="selectamountlablel mt-4">
              Balance is{" "}
              <span style={{ color: "green" }}>
                {singleGameData?.challengerBalance &&
                  parseFloat(singleGameData.challengerBalance).toFixed(2)}
              </span>
            </p>
            <p className="selectamountlablel mt-4">
              Coin Price is{" "}
              <span style={{ color: "green" }}>
                {portfolioPrice && parseFloat(portfolioPrice).toFixed(2)}
              </span>
            </p>
            {newCoinPrice && (
              <p className="selectamountlablel mt-4">
                Select Coin Price is{" "}
                <span style={{ color: "green" }}>
                  {newCoinPrice && parseFloat(newCoinPrice).toFixed(2)}
                </span>
              </p>
            )}
            {portfolioQuantity && (
              <p className="selectamountlablel mt-4">
                Select Coin Price is according to Quantity{" "}
                <span style={{ color: "red" }}>
                  {newCoinPrice &&
                    parseFloat(newCoinPrice).toFixed(2) * portfolioQuantity}
                </span>
              </p>
            )}
            <Form.Group>
              <Form.Label className="selectamountlablel mt-4">
                Select a coin type for each football player
              </Form.Label>
              <Form.Select
                className="selectcoinselect"
                aria-label="Select coin"
                onChange={(e) => handleNewPortfolio(e)}
              >
                {coin.length > 0 &&
                  coin.map((data, ind) => {
                    return (
                      <option
                        value={`${data._id} ${data?.quote?.USD?.price}`}
                        key={ind}
                      >
                        {data?.name && data.name}
                      </option>
                    );
                  })}
              </Form.Select>
              <Form.Control
                className="exchangepopuptextfield"
                type="number"
                placeholder="Enter Quantity"
                value={portfolioQuantity}
                onChange={(e) => setPortfolioQuantity(e.target.value)}
              />
            </Form.Group>
            <div className="setbuttonpositionforplaypopup">
              <Button
                className="selecttokentoexchangeformbytton mt-3"
                onClick={() => handleUpdate()}
                disabled={loading ? true : false}
              >
                {loading ? "Please wait" : "Update"}
              </Button>
            </div>
          </Form>
        </Playpopup>
      </Container>
    </div>
  );
};

export default Play;
