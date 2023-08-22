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
import {
  BuyCoin,
  GetAllCoin,
  GetSingleGame,
  SellCoin,
  UpdateCoin,
  clearErrors,
  clearMessages,
} from "../../../store/actions";
import { Puff } from "react-loader-spinner";
import { toast } from "react-hot-toast";

const Play = () => {
  const [buttonPopup, setButtonPopup] = useState(false);
  const [buttonPopupEx, setButtonPopupEx] = useState(false);
  const [buttonPopupMen, setButtonPopupMen] = useState(false);
  const { id } = useParams();
  const dispatch = useDispatch();
  const {
    singleGameData,
    loading,
    coin,
    errors: error,
    message,
    sessionExpireError,
    buyLoading,
    sellLoading,
    updateLoading,
  } = useSelector((s) => s.clubReducer);
  const navigate = useNavigate();

  const [buySellValue, setBuySellValue] = useState(1);
  const [goingtoUpdateValue, setGoingtoUpdateValue] = useState(1);
  const [goingtoUpdatePortfolioId, setGoingtoUpdatePortfolioId] = useState("");
  // console.log("singleGameData is", singleGameData);
  const userId = JSON.parse(sessionStorage.getItem("user") ?? "{}").id;

  useEffect(() => {
    if (
      singleGameData?.challengerProtfolios?.length != 5 &&
      singleGameData?.rivalProtfolios?.length
    ) {
      navigate("/profile");
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
      setButtonPopupEx(false);
      setButtonPopup(false);
    }
  }, [error, sessionExpireError, message]);

  // buy sell
  const handlePopup = (clickedUserId) => {
    if (clickedUserId !== userId) return;
    setButtonPopupEx(true);
  };

  const handleBuy = () => {
    dispatch(
      BuyCoin({
        id: id,
        portfolio: singleGameData?.rivalProtfolios?.find(
          (r) => r?.user?.id === userId
        )?._id,
        quantity: buySellValue,
      })
    );
  };
  const handleSell = () => {
    dispatch(
      SellCoin({
        id: id,
        portfolio: singleGameData?.rivalProtfolios?.find(
          (r) => r?.user?.id === userId
        )?._id,
        quantity: buySellValue,
      })
    );
  };

  useEffect(() => {
    dispatch(GetAllCoin());
  }, [dispatch]);

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

  const handlePercentageDiv = (clickedUserId) => {
    console.log(clickedUserId, userId);
    if (clickedUserId !== userId) return;
    setButtonPopup(true);
  };

  const handleUpdate = () => {
    dispatch(
      UpdateCoin({
        id: id,
        currentPortfolio: singleGameData?.rivalProtfolios?.find(
          (r) => r?.user?.id === userId
        )?._id,
        newPortfolio: goingtoUpdatePortfolioId,
        quantity: goingtoUpdateValue,
      })
    );
  };

  return loading ? (
    <div className="loader">
      <Puff
        height="60"
        width="60"
        radius="6"
        color="white"
        ariaLabel="loading"
        wrapperStyle
        wrapperClass
      />
    </div>
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
          <Col md={2}>
            {singleGameData?.rivalProtfolios?.length > 0 &&
              singleGameData.rivalProtfolios.map((data, ind) => {
                return (
                  <Button
                    className="leftplaybuttonhover"
                    onClick={() => handlePopup(data?.user?.id)}
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
                      {data?.portfolio?.coin?.quote?.USD?.price &&
                        parseFloat(data.portfolio.coin.quote.USD.price).toFixed(
                          2
                        )}{" "}
                      %
                    </p>
                  </Button>
                );
              })}
          </Col>

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
          <Col md={2}>
            {singleGameData?.challengerProtfolios?.length > 0 &&
              singleGameData.challengerProtfolios.map((data, ind) => {
                return (
                  <Button
                    className="leftplaybuttonhover"
                    onClick={() => handlePopup(data?.user?.id)}
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
        <Playpopup
          trigger={buttonPopupEx}
          setTrigger={setButtonPopupEx}
          disabled={buyLoading || sellLoading}
        >
          <Form>
            <Form.Group>
              <p className="selectamountlablel mt-4">
                Balance is
                <span style={{ color: "green" }}>
                  {" "}
                  $
                  {singleGameData?.rivalBalance
                    ? parseFloat(singleGameData.rivalBalance).toFixed(2)
                    : 0}
                </span>
              </p>
              <p className="selectamountlablel mt-4">
                Coin Price is{" "}
                <span style={{ color: "green" }}>
                  $
                  {parseFloat(
                    [
                      ...(singleGameData?.rivalProtfolios ?? []),
                      ...(singleGameData?.challengerProtfolios ?? []),
                    ].find((p) => p?.user?.id === userId)?.portfolio?.coin
                      ?.quote?.USD?.price ?? 0
                  ).toFixed(2)}
                </span>
              </p>
              <p className="selectamountlablel mt-4">
                Amount is{" "}
                <span style={{ color: "red" }}>
                  $
                  {parseFloat(
                    [
                      ...(singleGameData?.rivalProtfolios ?? []),
                      ...(singleGameData?.challengerProtfolios ?? []),
                    ].find((p) => p?.user?.id === userId)?.portfolio?.coin
                      ?.quote?.USD?.price ?? 0
                  ).toFixed(2) * buySellValue}
                </span>
              </p>

              <Form.Label className="selectamountlablel">
                Selected Coin is{" "}
                <img
                  width={"20%"}
                  height={"20%"}
                  src={
                    [
                      ...(singleGameData?.rivalProtfolios ?? []),
                      ...(singleGameData?.challengerProtfolios ?? []),
                    ].find((p) => p?.user?.id === userId)?.portfolio?.coin
                      ?.photoPath ?? ""
                  }
                  alt="selectedCoin"
                />
              </Form.Label>
              <Form.Control
                className="exchangepopuptextfield"
                type="number"
                placeholder="Enter Amount"
                value={buySellValue}
                onChange={(e) => setBuySellValue(e.target.value)}
              />
            </Form.Group>
            <div className="setbuttonpositionforplaypopup">
              <Button
                className="exchangepopbuy mt-3"
                onClick={handleBuy}
                disabled={buyLoading}
              >
                {buyLoading ? "Loading..." : "Buy"}
              </Button>
              <Button
                className="exchangepopsell mt-3"
                onClick={handleSell}
                disabled={sellLoading}
              >
                {sellLoading ? "Loading..." : "Sell"}
              </Button>
            </div>
          </Form>
        </Playpopup>
        <Row className="margsettomakeinline">
          {/* rival 0 */}
          <Col md={1} className="removepaddfrombtn margletbtnsetplayinrow">
            <Button
              className="playerclickpopupbutton"
              onClick={() =>
                handlePercentageDiv(
                  singleGameData?.rivalProtfolios?.length > 0 &&
                    singleGameData.rivalProtfolios[0]?.portfolio?.user?.id
                )
              }
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
                <p className="playrankformen m-1"> 1.1 %</p>
              </div>
              <div className="maketheminrowatbottomfieldsecond margtopicobgplay">
                <Image
                  crossOrigin="true"
                  height={"30%"}
                  width={"30%"}
                  src={
                    singleGameData?.rivalProtfolios?.length > 0 &&
                    singleGameData.rivalProtfolios[0]?.portfolio?.coin
                      ?.photoPath
                  }
                />
                <p
                  className={`iunderhead ${
                    singleGameData?.rivalProtfolios?.length > 0 &&
                    parseFloat(
                      singleGameData.rivalProtfolios[0]?.portfolio?.coin?.quote
                        ?.USD?.percent_change_24h
                    ).toFixed(2) >= 0
                      ? "green"
                      : "red"
                  }`}
                >
                  {singleGameData?.rivalProtfolios?.length > 0 &&
                    parseFloat(
                      singleGameData.rivalProtfolios[0]?.portfolio?.coin?.quote
                        ?.USD?.percent_change_24h
                    ).toFixed(2)}
                  %
                </p>
              </div>
            </Button>
          </Col>
          {/* rival 1 */}
          <Col md={1} className="removepaddfrombtn marginsetforbuttontwoinrow">
            <Button
              className="playerclickpopupbutton"
              onClick={() =>
                handlePercentageDiv(
                  singleGameData?.rivalProtfolios?.length > 0 &&
                    singleGameData.rivalProtfolios[1]?.portfolio?.user?.id
                )
              }
            >
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
                <p className="playrankredformen m-1"> 0.3 %</p>
              </div>
              <div className="maketheminrowatbottomfieldsecond margtopicobgplay">
                <Image
                  crossOrigin="true"
                  height={"30%"}
                  width={"30%"}
                  src={
                    singleGameData?.rivalProtfolios?.length > 0 &&
                    singleGameData.rivalProtfolios[1]?.portfolio?.coin
                      ?.photoPath
                  }
                />
                <p
                  className={`iunderhead ${
                    singleGameData?.rivalProtfolios?.length > 0 &&
                    parseFloat(
                      singleGameData.rivalProtfolios[1]?.portfolio?.coin?.quote
                        ?.USD?.percent_change_24h
                    ).toFixed(2) >= 0
                      ? "green"
                      : "red"
                  }`}
                >
                  {" "}
                  {singleGameData?.rivalProtfolios?.length > 0 &&
                    parseFloat(
                      singleGameData.rivalProtfolios[1]?.portfolio?.coin?.quote
                        ?.USD?.percent_change_24h
                    ).toFixed(2)}
                  %
                </p>
              </div>
            </Button>
          </Col>
          <Col md={2}></Col>
          {/* rival 3 */}
          <Col md={1} className="removepaddfrombtn margsetforthirdinrow">
            <Button
              className="playerclickpopupbutton"
              onClick={() =>
                handlePercentageDiv(
                  singleGameData?.rivalProtfolios?.length > 0 &&
                    singleGameData.rivalProtfolios[3]?.portfolio?.user?.id
                )
              }
            >
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
                <p className="playrankredformen m-1"> 1.00 %</p>
              </div>
              <div className="maketheminrowatbottomfieldsecond margtopicobgplay">
                <Image
                  crossOrigin="true"
                  height={"30%"}
                  width={"30%"}
                  src={
                    singleGameData?.rivalProtfolios?.length > 0 &&
                    singleGameData.rivalProtfolios[3]?.portfolio?.coin
                      ?.photoPath
                  }
                />
                <p
                  className={`iunderhead ${
                    singleGameData?.rivalProtfolios?.length > 0 &&
                    parseFloat(
                      singleGameData.rivalProtfolios[3]?.portfolio?.coin?.quote
                        ?.USD?.percent_change_24h
                    ).toFixed(2) >= 0
                      ? "green"
                      : "red"
                  }`}
                >
                  {" "}
                  {singleGameData?.rivalProtfolios?.length > 0 &&
                    parseFloat(
                      singleGameData.rivalProtfolios[3]?.portfolio?.coin?.quote
                        ?.USD?.percent_change_24h
                    ).toFixed(2)}
                  %
                </p>
              </div>
            </Button>
          </Col>
          <Col md={2}></Col>
          {/* challenger 3 */}
          <Col md={1} className="removepaddfrombtn marginsetforfourthbutinrow">
            <Button
              className="playerclickpopupbutton"
              onClick={() =>
                handlePercentageDiv(
                  singleGameData?.challengerProtfolios?.length > 0 &&
                    singleGameData.challengerProtfolios[3]?.portfolio?.user?.id
                )
              }
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
                <p className="playrankformen m-1">
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
                  src={
                    singleGameData?.challengerProtfolios?.length > 0 &&
                    singleGameData.challengerProtfolios[3]?.portfolio?.coin
                      ?.photoPath
                  }
                />
                <p
                  className={`iunderhead ${
                    singleGameData?.challengerProtfolios?.length > 0 &&
                    parseFloat(
                      singleGameData.challengerProtfolios[3]?.portfolio?.coin
                        ?.quote?.USD?.percent_change_24h
                    ).toFixed(2) >= 0
                      ? "green"
                      : "red"
                  }`}
                >
                  {singleGameData?.challengerProtfolios?.length > 0 &&
                    parseFloat(
                      singleGameData.challengerProtfolios[3]?.portfolio?.coin
                        ?.quote?.USD?.percent_change_24h
                    ).toFixed(2)}
                  %
                </p>
              </div>
            </Button>
          </Col>
          <Col md={2}></Col>
          {/* challenger 1 */}
          <Col md={1} className="removepaddfrombtn marginsetforfifthhbutinrow">
            <Button
              className="playerclickpopupbutton"
              onClick={() =>
                handlePercentageDiv(
                  singleGameData?.challengerProtfolios?.length > 0 &&
                    singleGameData.challengerProtfolios[1]?.portfolio?.user?.id
                )
              }
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
                <p className="playrankformen m-1"> 11.00 %</p>
              </div>
              <div className="maketheminrowatbottomfieldsecond margtopicobgplay">
                <Image
                  crossOrigin="true"
                  height={"30%"}
                  width={"30%"}
                  src={
                    singleGameData?.challengerProtfolios?.length > 0 &&
                    singleGameData.challengerProtfolios[1]?.portfolio?.coin
                      ?.photoPath
                  }
                />
                <p
                  className={`iunderhead ${
                    singleGameData?.challengerProtfolios?.length > 0 &&
                    parseFloat(
                      singleGameData.challengerProtfolios[1]?.portfolio?.coin
                        ?.quote?.USD?.percent_change_24h
                    ).toFixed(2) >= 0
                      ? "green"
                      : "red"
                  }`}
                >
                  {singleGameData?.challengerProtfolios?.length > 0 &&
                    parseFloat(
                      singleGameData.challengerProtfolios[1]?.portfolio?.coin
                        ?.quote?.USD?.percent_change_24h
                    ).toFixed(2)}
                  %
                </p>
              </div>
            </Button>
          </Col>

          {/* challenger 0 */}
          <Col md={1} className="removepaddfrombtn margsetforsixthinrow">
            <Button
              className="playerclickpopupbutton"
              onClick={() =>
                handlePercentageDiv(
                  singleGameData?.challengerProtfolios?.length > 0 &&
                    singleGameData.challengerProtfolios[0]?.portfolio?.user?.id
                )
              }
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
                <p className="playrankredformen m-1"> 20 %</p>
              </div>
              <div className="maketheminrowatbottomfieldsecond margtopicobgplay">
                <Image
                  crossOrigin="true"
                  height={"30%"}
                  width={"30%"}
                  src={
                    singleGameData?.challengerProtfolios?.length > 0 &&
                    singleGameData.challengerProtfolios[0]?.portfolio?.coin
                      ?.photoPath
                  }
                />
                <p
                  className={`iunderhead ${
                    singleGameData?.challengerProtfolios?.length > 0 &&
                    parseFloat(
                      singleGameData.challengerProtfolios[0]?.portfolio?.coin
                        ?.quote?.USD?.percent_change_24h
                    ).toFixed(2) >= 0
                      ? "green"
                      : "red"
                  }`}
                >
                  {singleGameData?.challengerProtfolios?.length > 0 &&
                    parseFloat(
                      singleGameData.challengerProtfolios[0]?.portfolio?.coin
                        ?.quote?.USD?.percent_change_24h
                    ).toFixed(2)}
                  %
                </p>
              </div>
            </Button>
          </Col>
        </Row>

        <Row className="mt-0">
          <Col md={1}></Col>
          {/* rival 2 */}
          <Col md={1} className="removepaddfrombtn margsetforsevinrowtwo">
            <Button
              className="playerclickpopupbutton"
              onClick={() =>
                handlePercentageDiv(
                  singleGameData?.rivalProtfolios?.length > 0 &&
                    singleGameData.rivalProtfolios[2]?.portfolio?.user?.id
                )
              }
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
                <p className="playrankformen m-1"> 13.00 %</p>
              </div>
              <div className="maketheminrowatbottomfieldsecond margtopicobgplay">
                <Image
                  crossOrigin="true"
                  height={"30%"}
                  width={"30%"}
                  src={
                    singleGameData?.rivalProtfolios?.length > 0 &&
                    singleGameData.rivalProtfolios[2]?.portfolio?.coin
                      ?.photoPath
                  }
                />
                <p
                  className={`iunderhead ${
                    singleGameData?.rivalProtfolios?.length > 0 &&
                    parseFloat(
                      singleGameData.rivalProtfolios[2]?.portfolio?.coin?.quote
                        ?.USD?.percent_change_24h
                    ).toFixed(2) >= 0
                      ? "green"
                      : "red"
                  }`}
                >
                  {singleGameData?.rivalProtfolios?.length > 0 &&
                    parseFloat(
                      singleGameData.rivalProtfolios[2]?.portfolio?.coin?.quote
                        ?.USD?.percent_change_24h
                    ).toFixed(2)}
                  %
                </p>
              </div>
            </Button>
          </Col>
          <Col md={2}></Col>
          {/* rival 4 */}
          <Col md={1} className="removepaddfrombtn margsetforeighthinrowtwo">
            <Button
              className="playerclickpopupbutton"
              onClick={() =>
                handlePercentageDiv(
                  singleGameData?.rivalProtfolios?.length > 0 &&
                    singleGameData.rivalProtfolios[4]?.portfolio?.user?.id
                )
              }
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
                <p className="playrankformen m-1"> 13.00 %</p>
              </div>
              <div className="maketheminrowatbottomfieldsecond margtopicobgplay">
                <Image
                  crossOrigin="true"
                  height={"30%"}
                  width={"30%"}
                  src={
                    singleGameData?.rivalProtfolios?.length > 0 &&
                    singleGameData.rivalProtfolios[4]?.portfolio?.coin
                      ?.photoPath
                  }
                />
                <p
                  className={`iunderhead ${
                    singleGameData?.rivalProtfolios?.length > 0 &&
                    parseFloat(
                      singleGameData.rivalProtfolios[4]?.portfolio?.coin?.quote
                        ?.USD?.percent_change_24h
                    ).toFixed(2) >= 0
                      ? "green"
                      : "red"
                  }`}
                >
                  {singleGameData?.rivalProtfolios?.length > 0 &&
                    parseFloat(
                      singleGameData.rivalProtfolios[4]?.portfolio?.coin?.quote
                        ?.USD?.percent_change_24h
                    ).toFixed(2)}
                  %
                </p>
              </div>
            </Button>
          </Col>
          <Col md={3}></Col>
          {/* challenger 4 */}
          <Col md={1} className="removepaddfrombtn margsetforninthinrowtwo">
            <Button
              className="playerclickpopupbutton"
              onClick={() =>
                handlePercentageDiv(
                  singleGameData?.challengerProtfolios?.length > 0 &&
                    singleGameData.challengerProtfolios[4]?.portfolio?.user?.id
                )
              }
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
                <p className="playrankredformen m-1"> 13.00 %</p>
              </div>
              <div className="maketheminrowatbottomfieldsecond margtopicobgplay">
                <Image
                  crossOrigin="true"
                  height={"30%"}
                  width={"30%"}
                  src={
                    singleGameData?.challengerProtfolios?.length > 0 &&
                    singleGameData.challengerProtfolios[4]?.portfolio?.coin
                      ?.photoPath
                  }
                />
                <p
                  className={`iunderhead ${
                    singleGameData?.challengerProtfolios?.length > 0 &&
                    parseFloat(
                      singleGameData.challengerProtfolios[4]?.portfolio?.coin
                        ?.quote?.USD?.percent_change_24h
                    ).toFixed(2) >= 0
                      ? "green"
                      : "red"
                  }`}
                >
                  {singleGameData?.challengerProtfolios?.length > 0 &&
                    parseFloat(
                      singleGameData.challengerProtfolios[4]?.portfolio?.coin
                        ?.quote?.USD?.percent_change_24h
                    ).toFixed(2)}
                  %
                </p>
              </div>
            </Button>
          </Col>
          <Col md={2}></Col>
          {/* chanllenge - 2*/}
          <Col md={1} className="removepaddfrombtn margsetforlastoneinrow">
            <Button
              className="playerclickpopupbutton"
              onClick={() =>
                handlePercentageDiv(
                  singleGameData?.challengerProtfolios?.length > 0 &&
                    singleGameData.challengerProtfolios[2]?.portfolio?.user?.id
                )
              }
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
                    singleGameData?.challengerProtfolios?.length > 0 &&
                    singleGameData.challengerProtfolios[2]?.portfolio?.coin
                      ?.photoPath
                  }
                />
                <p className="playrankformen m-1">
                  {singleGameData?.challengerProtfolios?.length > 0 &&
                    parseFloat(
                      singleGameData.challengerProtfolios[2]?.portfolio?.coin
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
                  src={
                    singleGameData?.challengerProtfolios?.length > 0 &&
                    singleGameData.challengerProtfolios[2]?.portfolio?.coin
                      ?.photoPath
                  }
                />
                <p
                  className={`iunderhead ${
                    singleGameData?.challengerProtfolios?.length > 0 &&
                    parseFloat(
                      singleGameData.challengerProtfolios[2]?.portfolio?.coin
                        ?.quote?.USD?.percent_change_24h
                    ).toFixed(2) >= 0
                      ? "green"
                      : "red"
                  }`}
                >
                  {singleGameData?.challengerProtfolios?.length > 0 &&
                    parseFloat(
                      singleGameData.challengerProtfolios[2]?.portfolio?.coin
                        ?.quote?.USD?.percent_change_24h
                    ).toFixed(2)}
                  %
                </p>
              </div>
            </Button>
          </Col>
        </Row>

        <Playpopup
          trigger={buttonPopup}
          setTrigger={setButtonPopup}
          disabled={updateLoading}
        >
          <Form onSubmit={handleUpdate}>
            <p className="selectamountlablel mt-4">
              Balance is{" "}
              <span style={{ color: "green" }}>
                $
                {singleGameData?.rivalBalance
                  ? parseFloat(singleGameData.rivalBalance).toFixed(2)
                  : 0}
              </span>
            </p>
            <p className="selectamountlablel mt-4">
              Coin Price is{" "}
              <span style={{ color: "green" }}>
                $
                {parseFloat(
                  [
                    ...(singleGameData?.rivalProtfolios ?? []),
                    ...(singleGameData?.challengerProtfolios ?? []),
                  ].find((p) => p?.user?.id === userId)?.portfolio?.coin?.quote
                    ?.USD?.price ?? 0
                ).toFixed(2)}
              </span>
            </p>
            <p className="selectamountlablel mt-4">
              Amount is{" "}
              <span style={{ color: "green" }}>
                $
                {parseFloat(
                  [
                    ...(singleGameData?.rivalProtfolios ?? []),
                    ...(singleGameData?.challengerProtfolios ?? []),
                  ].find((p) => p?.user?.id === userId)?.portfolio?.coin?.quote
                    ?.USD?.price ?? 0
                ).toFixed(2) * goingtoUpdateValue}
              </span>
            </p>

            {/* <p className="selectamountlablel mt-4">
                            Select Coin Price is according to Quantity{" "}
                            <span style={{ color: "red" }}>
                                {parseFloat(99).toFixed(2) * 2}
                            </span>
                        </p> */}
            <Form.Group>
              <Form.Label className="selectamountlablel mt-4">
                Select a coin type for each football player
              </Form.Label>
              <Form.Select
                className="selectcoinselect"
                aria-label="Select coin"
                required
                value={goingtoUpdatePortfolioId}
                onChange={(e) => setGoingtoUpdatePortfolioId(e.target.value)}
              >
                <option id="" disabled>
                  Select any coin
                </option>
                {coin.map((c, i) => (
                  <option value={c?._id} key={i}>
                    {c?.name}
                  </option>
                ))}
              </Form.Select>
              <Form.Control
                className="exchangepopuptextfield"
                type="number"
                placeholder="Enter Quantity"
                value={goingtoUpdateValue}
                onChange={(e) => setGoingtoUpdateValue(e.target.value)}
              />
            </Form.Group>
            <div className="setbuttonpositionforplaypopup">
              <Button
                className="selecttokentoexchangeformbytton mt-3"
                type="submit"
                disabled={updateLoading}
              >
                {updateLoading ? "Loading..." : "Update"}
              </Button>
            </div>
          </Form>
        </Playpopup>
      </Container>
    </div>
  );
};

export default Play;
