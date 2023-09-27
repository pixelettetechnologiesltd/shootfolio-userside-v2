import { React, useState, useEffect } from "react";
import { Row, Container, Col, Button, Image } from "react-bootstrap";
import { images } from "../../../Images";
import Playpopup from "../../Components/Playpopup";
import Form from "react-bootstrap/Form";
import "../../Css/Game/Play.css";
import Menupopup from "../../Components/Menupopup";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "react-bootstrap/Spinner";
import {
  GetSingleGame,
  SellCoin,
  BuyCoin,
  UpdateCoin,
  GetAllCoin,
  LeaveGame,
  BorrowAmount,
  GetBorrowAmount,
  GetRemaningAmount,
  clearErrors,
  clearMessages,
} from "./../../../store/actions";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from "react-router-dom";

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
    borrowAmount: borrowAmounts,
    remaningAmount,
  } = useSelector((state) => state.clubReducer);
  const {
    errors: leaveGameError,
    message: leaveGameMessage,
    loading: leaveLoading,
  } = useSelector((state) => state.gameTypeReducer);
  const [buttonPopup, setButtonPopup] = useState(false);
  const [buttonPopupEx, setButtonPopupEx] = useState(false);
  const [borrowAmount, setBorrowAmount] = useState(0);
  const [borrowPortfolio, setBorrowPortfolio] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [totalAsset, setTotalAsset] = useState("");

  useEffect(() => {
    if (
      singleGameData?.challengerProtfolios?.length !== 5 &&
      singleGameData?.rivalProtfolios?.length !== 5
    ) {
      navigate("/profile");
    }
    if (error.length > 0) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (leaveGameError.length > 0) {
      toast.error(leaveGameError);
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
      setButtonPopupBor(false);
    }
    if (leaveGameMessage !== "") {
      toast.success(leaveGameMessage);
      dispatch(clearMessages());
      setTimeout(() => navigate("/gamehome"), 2000);
    }
  }, [error, sessionExpireError, leaveGameMessage, leaveGameError, message]);

  useEffect(() => {
    if (
      singleGameData?.challengerProtfolios &&
      singleGameData?.rivalProtfolios
    ) {
      if (singleGameData?.challengerProtfolios?.length > 0) {
        setBorrowPortfolio(
          singleGameData?.challengerProtfolios[0]?.portfolio?.id
        );
      }
    }
    if (singleGameData?.challengerProtfolios?.length > 0) {
      let sum = 0;

      singleGameData.challengerProtfolios.forEach((product) => {
        sum += product.portfolio.coin.quote.USD.price * product?.quantity;
      });
      setTotalAsset(sum);
    }
    setTimeout(() => {
      if (singleGameData) {
        setIsLoading(false);
      } else {
        setIsLoading(true);
      }
    }, 2000);
  }, [singleGameData]);

  useEffect(() => {
    dispatch(GetSingleGame(id));
    dispatch(GetAllCoin());
  }, []);

  let firstPercentage =
    singleGameData?.challengerProtfolios?.length > 0 &&
    parseFloat(
      singleGameData.challengerProtfolios[0]?.portfolio?.coin?.quote?.USD
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
    singleGameData?.challengerProtfolios?.length > 0 &&
    parseFloat(
      singleGameData.challengerProtfolios[1]?.portfolio?.coin?.quote?.USD
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
    singleGameData?.challengerProtfolios?.length > 0 &&
    parseFloat(
      singleGameData.challengerProtfolios[2]?.portfolio?.coin?.quote?.USD
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
    singleGameData?.challengerProtfolios?.length > 0 &&
    parseFloat(
      singleGameData.challengerProtfolios[3]?.portfolio?.coin?.quote?.USD
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
    singleGameData?.challengerProtfolios?.length > 0 &&
    parseFloat(
      singleGameData.challengerProtfolios[4]?.portfolio?.coin?.quote?.USD
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
      ).toFixed(3)
    );
    setSelectedCoin(data?.portfolio?.coin?.name);
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
  const [portfolioAmount, setPortfolioAmount] = useState("");
  const [portfolioCoinName, setPortfolioCoinName] = useState("");
  const [ownQuantity, setOwnQuantity] = useState("");
  const [newPortfolio, setNewPortfolio] = useState("");
  const [portfolioQuantity, setPortfolioQuantity] = useState("");
  const [currentGameId, setCurrentGameId] = useState("");
  const [newCoinPrice, setNewCoinPrice] = useState("");
  const [currentCoin, setCurrentCoin] = useState("");
  const handlePercentageDiv = (index) => {
    setPortfolioPrice(
      singleGameData?.challengerProtfolios[index]?.portfolio?.coin?.quote?.USD
        ?.price
    );
    setPortfolioAmount(
      singleGameData?.challengerProtfolios[index]?.portfolio?.coin?.quote?.USD
        ?.price *
        singleGameData?.challengerProtfolios[index]?.portfolio?.quantity
    );
    setCurrentPortfolio(
      singleGameData?.challengerProtfolios[index]?.portfolio?.id
    );

    setOwnQuantity(
      singleGameData?.challengerProtfolios[index]?.portfolio?.quantity
    );

    setButtonPopup(true);
    setCurrentGameId(singleGameData?.id);
    setPortfolioCoinName(
      singleGameData?.challengerProtfolios[index]?.portfolio?.coin?.name
    );
    setCurrentCoin(
      singleGameData?.challengerProtfolios[index]?.portfolio?.coin?._id +
        " " +
        singleGameData?.challengerProtfolios[index]?.portfolio?.coin?.quote?.USD
          ?.price
    );
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
  const [buttonPopupMen, setButtonPopupMen] = useState(false);
  const [buttonPopupBor, setButtonPopupBor] = useState(false);

  const handleBorrow = () => {
    if (!borrowAmount || !borrowPortfolio) {
      return toast.error("Amount and portfolio is required");
    } else {
      let result = {
        id: singleGameData?.id,
        portfolio: borrowPortfolio,
        amount: Number(borrowAmount),
        player: "challenger",
      };
      dispatch(BorrowAmount(result));
      setBorrowAmount("");
      setBorrowPortfolio("");
    }
  };

  const user = JSON.parse(sessionStorage.getItem("user"));

  const handleGameLeave = () => {
    let result = {
      gameId: singleGameData?.id,
      player:
        singleGameData?.challenger?.email === user?.email
          ? "challenger"
          : "rival",
    };
    dispatch(LeaveGame(result));
  };

  const handleOpenBorrow = () => {
    let result = {
      gameId: singleGameData?.id,
      player:
        singleGameData?.challenger?.email === user?.email
          ? "challenger"
          : "rival",
    };
    dispatch(GetBorrowAmount(result));
    dispatch(GetRemaningAmount(result));
    setButtonPopupBor(true);
  };
  if (isLoading) {
    return (
      <div className="playbackgroundimagforsinglepage">
        <Spinner animation="grow" variant="warning" />
        <Spinner
          style={{ marginLeft: "7px" }}
          animation="grow"
          variant="success"
        />
        <Spinner
          style={{ marginLeft: "7px" }}
          animation="grow"
          variant="light"
        />
      </div>
    );
  } else {
    return (
      <div className="playvbackgroundimag">
        <Container>
          <Row className="addspaceforplayfirstrow">
            <Col md={1}>
              <Button
                className="hamburgontopgame"
                onClick={() => setButtonPopupMen(true)}
              >
                <GiHamburgerMenu />
              </Button>
            </Col>
            <Col md={9}></Col>
            <Col md={2}>
              <p className="upperheadingstopright">
                Total Portfolio: $
                <span className="upperheadtoprightvalue">
                  {parseFloat(totalAsset).toFixed(2)}
                </span>
              </p>
              {/* <p className="upperheadingstopright">
                Change:{" "}
                <span className="upperheadtoprightvalue">(+2.5% or -3.8%)</span>
              </p> */}
              <p className="upperheadingstopright">
                Current Balance: $
                <span className="upperheadtoprightvalue">
                  {singleGameData?.challengerBalance &&
                    parseFloat(singleGameData.challengerBalance).toFixed(2)}
                </span>
              </p>
              <p className="upperheadingstopright">
                Borrowing Rate:{" "}
                <span className="upperheadtoprightvalue"> 5%</span>
              </p>
              <p className="upperheadingstopright">
                Borrowing Interest:{" "}
                <span className="upperheadtoprightvalue">-$100</span>
              </p>
              <Button
                className="rightsideborrowbtn"
                onClick={() => handleOpenBorrow()}
              >
                Borrow
              </Button>
              <p className="upperheadingstopright mt-3">Manage Assets</p>
              <p className="manageassetsdesc">
                Click to buy or sell this asset
              </p>
            </Col>
          </Row>

          <Row>
            <Col md={2}>
              {singleGameData?.rivalProtfolios?.length > 0 &&
                singleGameData.rivalProtfolios.map((data, ind) => {
                  return (
                    <div
                      className="leftplaybutton"
                      key={ind}
                      style={{ marginBottom: "0.5rem" }}
                    >
                      <Image
                        crossOrigin="true"
                        height={"30%"}
                        width={"30%"}
                        src={
                          data?.portfolio?.coin?.photoPath &&
                          data.portfolio.coin.photoPath
                        }
                      />
                      <p
                        className={`${
                          singleGameData?.challengerProtfolios.length > 0 &&
                          parseFloat(
                            data?.portfolio?.coin?.quote?.USD
                              ?.percent_change_24h
                          ).toFixed(2) < 0
                            ? "playrankred"
                            : "playrank"
                        } m-1`}
                      >
                        {/* ${" "} */}
                        {singleGameData?.challengerProtfolios.length > 0 &&
                          parseFloat(
                            data?.portfolio?.coin?.quote?.USD
                              ?.percent_change_24h
                          ).toFixed(2)}
                        %
                      </p>
                    </div>
                  );
                })}
            </Col>
            <Col md={3}></Col>
            <Col md={2}>
              <div className="hover-text">
                <span class="tooltip-text" id="bottom">
                  <ul>
                    <li>
                      Goals are awarded based on your portfolio's performance
                      compared to your opponent's portfolio.
                    </li>
                    <li>
                      Whenever you change your digital assets (buy/sell) the
                      game checks both players' portfolio performance, and
                      whoever perform better get a goal
                    </li>
                    <li>
                      Additionally, after 24 hours for idle game modes, the game
                      evaluates both players' portfolio performance again, and
                      the one with better performance scores a goal.
                    </li>
                    <li>
                      Strive for better portato performance to increase your
                      chances of scoring more goals and outperforming your
                      opponent!
                    </li>
                  </ul>
                </span>
                <div className="maketimeinrowplayground">
                  <div className="tmplayground">
                    <p className="timetextplayground">
                      {singleGameData?.rivalClub?.symbol &&
                        singleGameData.rivalClub?.symbol}
                    </p>
                  </div>
                  <div className="zhplayground">
                    <p className="timetextplayground">
                      {singleGameData?.challengerClub &&
                        singleGameData.challengerClub?.symbol}
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
              </div>
            </Col>
            <Col md={3}></Col>
            <Col md={2}>
              {singleGameData?.challengerProtfolios?.length > 0 &&
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

          {/* Percentage Div */}
          <Row className="paddsettopplay mt-5">
            <Col md={4}></Col>
            <Col md={1}>
              <Button
                className="playerclickpopupbutton"
                onClick={() => handlePercentageDiv(0)}
              >
                <div className="playerimagedivplay">
                  <Image src={images.playerfive} width="50%" />
                </div>
                <div className="maketheminrowatbottomfield">
                  <Image
                    crossOrigin="true"
                    height={"50%"}
                    width={"50%"}
                    src={
                      singleGameData?.challengerProtfolios?.length > 0 &&
                      singleGameData.challengerProtfolios[0]?.portfolio?.coin
                        ?.photoPath
                    }
                  />
                  <p
                    className={`${
                      hasMinusSignInFirstPercentage ? "playrankred" : "playrank"
                    } m-1`}
                  >
                    {" "}
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
            <Col md={2}></Col>
            <Col md={1}>
              <Button
                className="playerclickpopupbutton"
                onClick={() => handlePercentageDiv(1)}
              >
                <div className="playerimagedivplay">
                  <Image src={images.playerfour} width="55%" />
                </div>
                <div className="maketheminrowatbottomfield">
                  <Image
                    crossOrigin="true"
                    height={"50%"}
                    width={"50%"}
                    src={
                      singleGameData?.challengerProtfolios?.length > 0 &&
                      singleGameData.challengerProtfolios[1]?.portfolio?.coin
                        ?.photoPath
                    }
                  />
                  <p
                    className={`${
                      hasMinusSignInSecondPercentage
                        ? "playrankred"
                        : "playrank"
                    } m-1`}
                  >
                    {" "}
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
            <Col md={2}></Col>
            <Col md={1}>
              <Button
                className="playerclickpopupbutton"
                onClick={() => handlePercentageDiv(2)}
              >
                <div className="playerimagedivplay">
                  <Image src={images.playerone} width="50%" />
                </div>
                <div className="maketheminrowatbottomfield">
                  <Image
                    crossOrigin="true"
                    height={"50%"}
                    width={"50%"}
                    src={
                      singleGameData?.challengerProtfolios?.length > 0 &&
                      singleGameData.challengerProtfolios[2]?.portfolio?.coin
                        ?.photoPath
                    }
                  />
                  <p
                    className={`${
                      hasMinusSignInThirdPercentage ? "playrankred" : "playrank"
                    } m-1`}
                  >
                    {" "}
                    {singleGameData?.challengerProtfolios?.length > 0 &&
                      parseFloat(
                        singleGameData.challengerProtfolios[2]?.portfolio?.coin
                          ?.quote?.USD?.percent_change_24h
                      ).toFixed(2)}
                    {/* percent_change_24h */}%
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
                onClick={() => handlePercentageDiv(3)}
              >
                <div className="playerimagedivplay">
                  <Image src={images.playerthree} width="50%" />
                </div>
                <div className="maketheminrowatbottomfield">
                  <Image
                    crossOrigin="true"
                    height={"50%"}
                    width={"50%"}
                    src={
                      singleGameData?.challengerProtfolios?.length > 0 &&
                      singleGameData.challengerProtfolios[3]?.portfolio?.coin
                        ?.photoPath
                    }
                  />
                  <p
                    className={`${
                      hasMinusSignInFourthPercentage
                        ? "playrankred"
                        : "playrank"
                    } m-1`}
                  >
                    {" "}
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
            <Col md={1}>
              <Button
                className="playerclickpopupbutton"
                onClick={() => handlePercentageDiv(4)}
              >
                <div className="playerimagedivplay">
                  <Image src={images.playertwo} width="50%" />
                </div>
                <div className="maketheminrowatbottomfield">
                  <Image
                    crossOrigin="true"
                    height={"50%"}
                    width={"50%"}
                    src={
                      singleGameData?.challengerProtfolios?.length > 0 &&
                      singleGameData.challengerProtfolios[4]?.portfolio?.coin
                        ?.photoPath
                    }
                  />
                  <p
                    className={`${
                      hasMinusSignInFifthPercentage ? "playrankred" : "playrank"
                    } m-1`}
                  >
                    {" "}
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
          </Row>
          <Playpopup trigger={buttonPopup} setTrigger={setButtonPopup}>
            <p className="menuheadpop">Asset Swap & Stats</p>
            <Form>
              <p className="selectamountlablel mt-4">
                Coin:{" "}
                <span style={{ color: "green" }}>
                  {portfolioCoinName && portfolioCoinName}
                </span>
              </p>
              <p className="selectamountlablel mt-4">
                Quantity:{" "}
                <span style={{ color: "red" }}>
                  {ownQuantity && ownQuantity}
                </span>
              </p>
              <p className="selectamountlablel mt-4">
                Price:{" "}
                <span style={{ color: "green" }}>
                  {parseFloat(portfolioPrice) > 0.01
                    ? parseFloat(portfolioPrice).toFixed(3)
                    : parseFloat(portfolioPrice).toFixed(7)}{" "}
                </span>
              </p>
              <p className="selectamountlablel mt-4">
                Total Amount:{" "}
                <span style={{ color: "red" }}>
                  {portfolioAmount && portfolioAmount.toFixed(3)}
                </span>
              </p>

              <Form.Group>
                <Form.Label className="selectamountlablel mt-4">
                  Select Coin
                </Form.Label>
                <Form.Select
                  className="selectcoinselect"
                  aria-label="Select coin"
                  value={currentCoin}
                  onChange={(e) => handleNewPortfolio(e)}
                >
                  {coin.length > 0 &&
                    coin.map((data, ind) => {
                      return (
                        <option
                          value={`${data._id} ${data?.quote?.USD?.price}`}
                          key={ind}
                        >
                          {data?.name && data.name} ( $
                          {parseFloat(data?.quote?.USD?.price) > 0.01
                            ? parseFloat(data?.quote?.USD?.price).toFixed(3)
                            : parseFloat(data?.quote?.USD?.price).toFixed(
                                7
                              )}{" "}
                          )
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
              <Row>
                <Col md={6}>
                  <p style={{ color: "green" }}>
                    {" "}
                    Balance: $
                    <b>
                      {" "}
                      {singleGameData?.challengerBalance &&
                        parseFloat(singleGameData.challengerBalance).toFixed(2)}
                    </b>
                  </p>
                </Col>
                <Col md={6}>
                  <p style={{ color: "red", textAlign: "right" }}>
                    Amount: $
                    <b>
                      {parseFloat(newCoinPrice * portfolioQuantity) > 0.01
                        ? parseFloat(newCoinPrice * portfolioQuantity).toFixed(
                            3
                          )
                        : parseFloat(newCoinPrice * portfolioQuantity).toFixed(
                            7
                          )}{" "}
                    </b>
                  </p>
                </Col>
              </Row>
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
          <Menupopup trigger={buttonPopupMen} setTrigger={setButtonPopupMen}>
            <p className="menuheadpop">MENU</p>
            <div className="makemenuitemsinrow">
              <Link
                onClick={() => setButtonPopupMen(false)}
                className="menuitempopup"
              >
                Resume Game
              </Link>
              <Link to="/profile" className="menuitempopup">
                General Settings
              </Link>
              <Link className="menuitempopup" to="/gamehome">
                Exit Game
              </Link>
            </div>
          </Menupopup>
          <Playpopup trigger={buttonPopupEx} setTrigger={setButtonPopupEx}>
            <p className="menuheadpop">Manage Owned Assets</p>
            <Form>
              <Form.Group>
                <p className="selectamountlablel mt-4">
                  Coin:{" "}
                  <span style={{ color: "green" }}>
                    {selectedCoin && selectedCoin}
                  </span>
                </p>
                <p className="selectamountlablel mt-4">
                  Own Quantity:{" "}
                  <span style={{ color: "green" }}>
                    {selectData?.quantity && selectData?.quantity}
                  </span>
                </p>
                <p className="selectamountlablel mt-4">
                  Price:{" "}
                  <span style={{ color: "green" }}>
                    $
                    {parseFloat(
                      selectData?.portfolio?.coin?.quote?.USD?.price
                    ) > 0.01
                      ? parseFloat(
                          selectData?.portfolio?.coin?.quote?.USD?.price
                        ).toFixed(3)
                      : parseFloat(
                          selectData?.portfolio?.coin?.quote?.USD?.price
                        ).toFixed(7)}
                  </span>
                </p>
                <p className="selectamountlablel mt-4">
                  Amount:{" "}
                  <span style={{ color: "green" }}>
                    {parseFloat(selectedCoinAmount) > 0.01
                      ? parseFloat(selectedCoinAmount).toFixed(3)
                      : parseFloat(selectedCoinAmount).toFixed(7)}{" "}
                  </span>
                </p>

                <Form.Label className="selectamountlablel">
                  Enter Quantity:
                </Form.Label>
                <Form.Control
                  className="exchangepopuptextfield"
                  type="number"
                  placeholder="Enter Quantity"
                  value={amountValue}
                  onChange={(e) => handleAmountValue(e.target.value)}
                />
              </Form.Group>
              <Row>
                <Col md={6}>
                  <p style={{ color: "green" }}>
                    {" "}
                    Balance: $
                    <b>
                      {" "}
                      {singleGameData?.challengerBalance &&
                        parseFloat(singleGameData.challengerBalance).toFixed(2)}
                    </b>
                  </p>
                </Col>
                <Col md={6}>
                  <p style={{ color: "red", textAlign: "right" }}>
                    Amount: $
                    <b>
                      {parseFloat(
                        amountValue *
                          selectData?.portfolio?.coin?.quote?.USD?.price
                      ) > 0.01
                        ? parseFloat(
                            amountValue *
                              selectData?.portfolio?.coin?.quote?.USD?.price
                          ).toFixed(3)
                        : parseFloat(
                            amountValue *
                              selectData?.portfolio?.coin?.quote?.USD?.price
                          ).toFixed(7)}{" "}
                    </b>
                  </p>
                </Col>
              </Row>
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
          <Playpopup trigger={buttonPopupBor} setTrigger={setButtonPopupBor}>
            <p className="menuheadpop">Borrow Amount</p>
            <p className="alreadyborrow mt-3">
              Already Borrowed :{" "}
              <span className="borrowvalue">${borrowAmounts}</span>
            </p>
            <p className="alreadyborrow mt-3">
              Remaning Amount :{" "}
              <span className="borrowvalue">${remaningAmount}</span>
            </p>
            <Form>
              <Form.Group>
                <Form.Label className="selectamountlablel">
                  Enter amount to borrow
                </Form.Label>
                <Form.Control
                  className="exchangepopuptextfield"
                  type="number"
                  placeholder="Enter Amount"
                  value={borrowAmount}
                  onChange={(e) => setBorrowAmount(e.target.value)}
                />
              </Form.Group>
              <div className="setbuttonpositionforplaypopup">
                <Button
                  className="exchangepopbuy mt-3"
                  onClick={() => handleBorrow()}
                  disabled={loading ? true : false}
                >
                  {loading ? "Please wait..." : "Borrow"}
                </Button>
              </div>
            </Form>
          </Playpopup>
        </Container>
      </div>
    );
  }
};

export default Play;
