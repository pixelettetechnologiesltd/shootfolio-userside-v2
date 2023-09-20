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
  BorrowAmount,
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
  } = useSelector((state) => state.clubReducer);
  const [buttonPopup, setButtonPopup] = useState(false);
  const [buttonPopupEx, setButtonPopupEx] = useState(false);
  const [borrowAmount, setBorrowAmount] = useState(0);
  const [borrowPortfolio, setBorrowPortfolio] = useState("");
  const [isChallengerClub, setIsChallengerClub] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  console.log("singleGame is", singleGameData);

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
    }
  }, [error, sessionExpireError, message, singleGameData]);

  const user = JSON.parse(sessionStorage.getItem("user"));

  useEffect(() => {
    if (singleGameData?.challengerProtfolios?.length > 0) {
      const result = singleGameData?.challengerProtfolios?.filter(
        (item) => item?.portfolio?.user?.email === user?.email
      );

      if (result.length <= 0) {
        setIsChallengerClub(false);
      }
    }
  }, []);

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
        player:
          singleGameData?.challenger?.email === user?.email
            ? "challenger"
            : "rival",
      };
      console.log("Portfolio", borrowPortfolio);
      console.log(singleGameData?.challenger?.email);
      console.log(
        singleGameData?.challenger?.email === user?.email
          ? "challenger"
          : "rival"
      );

      dispatch(BorrowAmount(result));
      setBorrowAmount("");
      setBorrowPortfolio("");
    }
  };
  let [isChallenger, setIsChallenger] = useState(false);
  useEffect(() => {
    if (
      singleGameData?.challengerProtfolios &&
      singleGameData?.rivalProtfolios
    ) {
      if (singleGameData?.challenger?.email === user?.email) {
        setIsChallenger(true);
      }
    }

    if (
      singleGameData?.challengerProtfolios &&
      singleGameData?.rivalProtfolios
    ) {
      if (
        singleGameData?.challengerProtfolios?.length > 0 &&
        singleGameData?.challenger?.email === user?.email
      ) {
        setBorrowPortfolio(
          singleGameData?.challengerProtfolios[0]?.portfolio?.id
        );
      } else {
        setBorrowPortfolio(singleGameData?.rivalProtfolios[0]?.portfolio?.id);
      }
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
    setTimeout(() => {
      if (
        singleGameData?.challenger === null ||
        !singleGameData?.rival === null
      ) {
        navigate("/profile");
      }
    }, 2000);
  }, [singleGameData]);
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
      <div className="playbackgroundimagforsinglepage">
        <Container>
          <Row className="addspaceforplayfirstrow">
            <Col md={1}>
              <Button
                className="hamburgontopgame"
                onClick={() => setButtonPopupMen(true)}
              >
                <GiHamburgerMenu />
              </Button>
              <Menupopup
                trigger={buttonPopupMen}
                setTrigger={setButtonPopupMen}
              >
                <p className="menuheadpop">MENU</p>
                <div className="makemenuitemsinrow">
                  <Link
                    className="menuitempopup"
                    onClick={() => setButtonPopupMen(false)}
                  >
                    Resume Game
                  </Link>
                  <Link className="menuitempopup" to="/profile">
                    {" "}
                    General Settings
                  </Link>
                  <Link className="menuitempopup" to="/gamehome">
                    Exit Game
                  </Link>
                </div>
              </Menupopup>
            </Col>
            <Col md={9}></Col>
            <Col md={2}>
              <p className="upperheadingstopright">Total Portfolio</p>
              <p className="upperheadingstopright">Change: <span className="upperheadtoprightvalue">(+2.5% or -3.8%)</span></p>
              <p className="upperheadingstopright">Current Balance: <span className="upperheadtoprightvalue">$5000</span></p>
              <p className="upperheadingstopright">Borrowing Rate: <span className="upperheadtoprightvalue"> 5%</span></p>
              <p className="upperheadingstopright">Borrowing Interest: <span className="upperheadtoprightvalue">-$100</span></p>
              <Button
                className="rightsideborrowbtn"
                onClick={() => setButtonPopupBor(true)}
              >
                Borrow
              </Button>
              <p className="upperheadingstopright mt-3">Manage Assets</p>
              <p className="manageassetsdesc">Click to buy or sell this asset</p>
              {/* <Menupopup trigger={buttonPopupBor} setTrigger={setButtonPopupBor}>
              <p className="menuheadpop">Borrow Amount</p>
              <p className="alreadyborrow mt-3">
                Already Borrowed : <span className="borrowvalue">$300</span>
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
                <Form.Group>
                  <Form.Label className="selectamountlablel mt-4">
                    Select Coin
                  </Form.Label>
                  <Form.Select
                    className="selectcoinselect"
                    aria-label="Select coin"
                    onChange={(e) => setBorrowPortfolio(e.target.value)}
                  >
                    {singleGameData?.challengerProtfolios?.length > 0 &&
                    // singleGameData?.challenger?.email === user?.email
                    isChallenger
                      ? singleGameData?.challengerProtfolios?.map(
                          (data, ind) => {
                            return (
                              <option
                                value={data?.portfolio?.coin?._id}
                                key={ind}
                              >
                                {data?.portfolio?.coin?.name &&
                                  data.portfolio.coin.name}
                              </option>
                            );
                          }
                        )
                      : singleGameData?.rivalProtfolios?.map((data, ind) => {
                          return (
                            <option
                              value={data?.portfolio?.coin?._id}
                              key={ind}
                            >
                              {data?.portfolio?.coin?.name &&
                                data.portfolio.coin.name}
                            </option>
                          );
                        })}
                  </Form.Select>
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
            </Menupopup> */}
            </Col>
          </Row>
          <Row>
            <Col md={2}>
              {singleGameData?.rivalProtfolios?.length > 0 &&
                // singleGameData.rivalProtfolios.filter(
                //   (item) => item?.portfolio?.user?.email === user?.email
                // )
                // singleGameData?.rival?.email === user?.email
                isChallenger
                ? singleGameData.rivalProtfolios?.map((data, ind) => {
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
                        className={`${singleGameData?.challengerProtfolios?.length > 0 &&
                            parseFloat(
                              data?.portfolio?.coin?.quote?.USD
                                ?.percent_change_24h
                            ).toFixed(2) < 0
                            ? "playrankred"
                            : "playrank"
                          } m-1`}
                      >
                        {singleGameData?.challengerProtfolios?.length > 0 &&
                          parseFloat(
                            data?.portfolio?.coin?.quote?.USD
                              ?.percent_change_24h
                          ).toFixed(2)}
                        %
                      </p>
                    </div>
                  );
                })
                : singleGameData.challengerProtfolios?.map((data, ind) => {
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
                        className={`${singleGameData?.challengerProtfolios?.length > 0 &&
                            parseFloat(
                              data?.portfolio?.coin?.quote?.USD
                                ?.percent_change_24h
                            ).toFixed(2) < 0
                            ? "playrankred"
                            : "playrank"
                          } m-1`}
                      >
                        {singleGameData?.challengerProtfolios?.length > 0 &&
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
                    <li>Goals are awarded based on your portfolio's performance compared to your opponent's portfolio.</li>
                    <li>Whenever you change your digital assets (buy/sell) the game checks both players' portfolio performance, and whoever perform better get a goal</li>
                    <li>Additionally, after 24 hours for idle game modes, the game evaluates both players' portfolio performance again, and the one with better performance scores a goal.</li>
                    <li>Strive for better portato performance to increase your chances of scoring more goals and outperforming your opponent!</li>
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
              {/* {singleGameData?.challengerProtfolios?.length > 0 &&
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
              })} */}
              {singleGameData?.challengerProtfolios?.length > 0 &&
                // singleGameData.challengerProtfolios.filter(
                //   (item) => item?.portfolio?.user?.email === user?.email
                // )
                singleGameData?.challenger?.email === user?.email
                ? singleGameData.challengerProtfolios?.map((data, ind) => {
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
                            data.portfolio.coin.quote.USD.price *
                            data?.quantity
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
                })
                : singleGameData.rivalProtfolios?.map((data, ind) => {
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
                            data.portfolio.coin.quote.USD.price *
                            data?.quantity
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
                  {isChallenger ? (
                    <Image
                      crossOrigin="true"
                      height={"20%"}
                      width={"20%"}
                      src={
                        singleGameData?.challengerProtfolios?.length > 0 &&
                        singleGameData.challengerProtfolios[0]?.portfolio?.coin
                          ?.photoPath
                      }
                    />
                  ) : (
                    <Image
                      crossOrigin="true"
                      height={"20%"}
                      width={"20%"}
                      src={
                        singleGameData?.rivalProtfolios?.length > 0 &&
                        singleGameData.rivalProtfolios[0]?.portfolio?.coin
                          ?.photoPath
                      }
                    />
                  )}
                  {isChallenger ? (
                    <p
                      className={`${hasMinusSignInFirstPercentage
                          ? "playrankred"
                          : "playrank"
                        } m-1`}
                    >
                      {" "}
                      {singleGameData?.challengerProtfolios?.length > 0 &&
                        parseFloat(
                          singleGameData.challengerProtfolios[0]?.portfolio
                            ?.coin?.quote?.USD?.percent_change_24h
                        ).toFixed(2)}
                      %
                    </p>
                  ) : (
                    <p
                      className={`${hasMinusSignInFirstPercentage
                          ? "playrankred"
                          : "playrank"
                        } m-1`}
                    >
                      {" "}
                      {singleGameData?.rivalProtfolios?.length > 0 &&
                        parseFloat(
                          singleGameData.rivalProtfolios[0]?.portfolio?.coin
                            ?.quote?.USD?.percent_change_24h
                        ).toFixed(2)}
                      %
                    </p>
                  )}
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
                  {isChallenger ? (
                    <Image
                      crossOrigin="true"
                      height={"20%"}
                      width={"20%"}
                      src={
                        singleGameData?.challengerProtfolios?.length > 0 &&
                        singleGameData.challengerProtfolios[1]?.portfolio?.coin
                          ?.photoPath
                      }
                    />
                  ) : (
                    <Image
                      crossOrigin="true"
                      height={"20%"}
                      width={"20%"}
                      src={
                        singleGameData?.rivalProtfolios?.length > 0 &&
                        singleGameData.rivalProtfolios[1]?.portfolio?.coin
                          ?.photoPath
                      }
                    />
                  )}
                  {isChallenger ? (
                    <p
                      className={`${hasMinusSignInSecondPercentage
                          ? "playrankred"
                          : "playrank"
                        } m-1`}
                    >
                      {" "}
                      {singleGameData?.challengerProtfolios?.length > 0 &&
                        parseFloat(
                          singleGameData.challengerProtfolios[1]?.portfolio
                            ?.coin?.quote?.USD?.percent_change_24h
                        ).toFixed(2)}
                      %
                    </p>
                  ) : (
                    <p
                      className={`${hasMinusSignInSecondPercentage
                          ? "playrankred"
                          : "playrank"
                        } m-1`}
                    >
                      {" "}
                      {singleGameData?.rivalProtfolios?.length > 0 &&
                        parseFloat(
                          singleGameData.rivalProtfolios[1]?.portfolio?.coin
                            ?.quote?.USD?.percent_change_24h
                        ).toFixed(2)}
                      %
                    </p>
                  )}
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
                  {isChallenger ? (
                    <Image
                      crossOrigin="true"
                      height={"20%"}
                      width={"20%"}
                      src={
                        singleGameData?.challengerProtfolios?.length > 0 &&
                        singleGameData.challengerProtfolios[2]?.portfolio?.coin
                          ?.photoPath
                      }
                    />
                  ) : (
                    <Image
                      crossOrigin="true"
                      height={"20%"}
                      width={"20%"}
                      src={
                        singleGameData?.rivalProtfolios?.length > 0 &&
                        singleGameData.rivalProtfolios[2]?.portfolio?.coin
                          ?.photoPath
                      }
                    />
                  )}
                  {isChallenger ? (
                    <p
                      className={`${hasMinusSignInThirdPercentage
                          ? "playrankred"
                          : "playrank"
                        } m-1`}
                    >
                      {" "}
                      {singleGameData?.challengerProtfolios?.length > 0 &&
                        parseFloat(
                          singleGameData.challengerProtfolios[2]?.portfolio
                            ?.coin?.quote?.USD?.percent_change_24h
                        ).toFixed(2)}
                      {/* percent_change_24h */}%
                    </p>
                  ) : (
                    <p
                      className={`${hasMinusSignInThirdPercentage
                          ? "playrankred"
                          : "playrank"
                        } m-1`}
                    >
                      {" "}
                      {singleGameData?.rivalProtfolios?.length > 0 &&
                        parseFloat(
                          singleGameData.rivalProtfolios[2]?.portfolio?.coin
                            ?.quote?.USD?.percent_change_24h
                        ).toFixed(2)}
                      {/* percent_change_24h */}%
                    </p>
                  )}
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
                  {isChallenger ? (
                    <Image
                      crossOrigin="true"
                      height={"20%"}
                      width={"20%"}
                      src={
                        singleGameData?.challengerProtfolios?.length > 0 &&
                        singleGameData.challengerProtfolios[3]?.portfolio?.coin
                          ?.photoPath
                      }
                    />
                  ) : (
                    <Image
                      crossOrigin="true"
                      height={"20%"}
                      width={"20%"}
                      src={
                        singleGameData?.rivalProtfolios?.length > 0 &&
                        singleGameData.rivalProtfolios[3]?.portfolio?.coin
                          ?.photoPath
                      }
                    />
                  )}
                  {isChallenger ? (
                    <p
                      className={`${hasMinusSignInFourthPercentage
                          ? "playrankred"
                          : "playrank"
                        } m-1`}
                    >
                      {" "}
                      {singleGameData?.challengerProtfolios?.length > 0 &&
                        parseFloat(
                          singleGameData.challengerProtfolios[3]?.portfolio
                            ?.coin?.quote?.USD?.percent_change_24h
                        ).toFixed(2)}
                      %
                    </p>
                  ) : (
                    <p
                      className={`${hasMinusSignInFourthPercentage
                          ? "playrankred"
                          : "playrank"
                        } m-1`}
                    >
                      {" "}
                      {singleGameData?.rivalProtfolios?.length > 0 &&
                        parseFloat(
                          singleGameData.rivalProtfolios[3]?.portfolio?.coin
                            ?.quote?.USD?.percent_change_24h
                        ).toFixed(2)}
                      %
                    </p>
                  )}
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
                  {isChallenger ? (
                    <Image
                      crossOrigin="true"
                      height={"20%"}
                      width={"20%"}
                      src={
                        singleGameData?.challengerProtfolios?.length > 0 &&
                        singleGameData.challengerProtfolios[4]?.portfolio?.coin
                          ?.photoPath
                      }
                    />
                  ) : (
                    <Image
                      crossOrigin="true"
                      height={"20%"}
                      width={"20%"}
                      src={
                        singleGameData?.rivalProtfolios?.length > 0 &&
                        singleGameData.rivalProtfolios[4]?.portfolio?.coin
                          ?.photoPath
                      }
                    />
                  )}
                  {isChallenger ? (
                    <p
                      className={`${hasMinusSignInFifthPercentage
                          ? "playrankred"
                          : "playrank"
                        } m-1`}
                    >
                      {" "}
                      {singleGameData?.challengerProtfolios?.length > 0 &&
                        parseFloat(
                          singleGameData.challengerProtfolios[4]?.portfolio
                            ?.coin?.quote?.USD?.percent_change_24h
                        ).toFixed(2)}
                      %
                    </p>
                  ) : (
                    <p
                      className={`${hasMinusSignInFifthPercentage
                          ? "playrankred"
                          : "playrank"
                        } m-1`}
                    >
                      {" "}
                      {singleGameData?.rivalProtfolios?.length > 0 &&
                        parseFloat(
                          singleGameData.rivalProtfolios[4]?.portfolio?.coin
                            ?.quote?.USD?.percent_change_24h
                        ).toFixed(2)}
                      %
                    </p>
                  )}
                </div>
              </Button>
            </Col>
          </Row>

          <Playpopup trigger={buttonPopupEx} setTrigger={setButtonPopupEx}>
            <Form>
              <Form.Group>
                <p className="selectamountlablel mt-4">
                  Remaining Balance:{" "}
                  <span style={{ color: "green" }}>
                    {isChallenger
                      ? singleGameData?.challengerBalance &&
                      parseFloat(singleGameData.challengerBalance).toFixed(2)
                      : singleGameData?.rivalBalance &&
                      parseFloat(singleGameData.rivalBalance).toFixed(2)}
                  </span>
                </p>
                <p className="selectamountlablel mt-4">
                  Price:{" "}
                  <span style={{ color: "green" }}>
                    {selectedCoinAmount && selectedCoinAmount}
                  </span>
                </p>
                {displayAmountValue && (
                  <p className="selectamountlablel mt-4">
                    Total Amount:{" "}
                    <span style={{ color: "red" }}>$ {displayAmountValue}</span>
                  </p>
                )}

                <Form.Label className="selectamountlablel">
                  Selected Coin:{" "}
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

          <Playpopup trigger={buttonPopup} setTrigger={setButtonPopup}>
            <Form>
              <p className="selectamountlablel mt-4">
                Remaining Balance:{" "}
                <span style={{ color: "green" }}>
                  {isChallenger
                    ? singleGameData?.challengerBalance &&
                    parseFloat(singleGameData.challengerBalance).toFixed(2)
                    : singleGameData?.rivalBalance &&
                    parseFloat(singleGameData.rivalBalance).toFixed(2)}
                </span>
              </p>
              <p className="selectamountlablel mt-4">
                Price:{" "}
                <span style={{ color: "green" }}>
                  {portfolioPrice && parseFloat(portfolioPrice).toFixed(2)}
                </span>
              </p>
              {portfolioQuantity && (
                <p className="selectamountlablel mt-4">
                  Quantity:{" "}
                  <span style={{ color: "red" }}>{portfolioQuantity}</span>
                </p>
              )}
              {portfolioQuantity && (
                <p className="selectamountlablel mt-4">
                  Total Amount:{" "}
                  <span style={{ color: "red" }}>
                    {newCoinPrice &&
                      parseFloat(newCoinPrice).toFixed(2) * portfolioQuantity}
                  </span>
                </p>
              )}
              <Form.Group>
                <Form.Label className="selectamountlablel mt-4">
                  Select Coin
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
                          {data?.name && data.name} ( $
                          {parseFloat(data?.quote?.USD?.price).toFixed(2)} )
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

          <Playpopup trigger={buttonPopupBor} setTrigger={setButtonPopupBor}>
            <p className="menuheadpop">Borrow Amount</p>
            {/* <p className="alreadyborrow mt-3">
            Already Borrowed : <span className="borrowvalue">$300</span>
          </p> */}
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
              {/* <Form.Group>
              <Form.Label className="selectamountlablel mt-4">
                Select Coin
              </Form.Label>

              <Form.Select
                className="selectcoinselect"
                aria-label="Select coin"
                value={borrowPortfolio}
                onChange={(e) => setBorrowPortfolio(e.target.value)}
              >
                {singleGameData?.challengerProtfolios?.length > 0 &&
                singleGameData?.challenger?.email === user?.email
                  ? singleGameData?.challengerProtfolios?.map((data, ind) => {
                      return (
                        <option
                          value={data?.portfolio?.id}
                          key={ind}
                          selected={ind === 0}
                        >
                          {data?.portfolio?.coin?.name &&
                            data.portfolio.coin.name}
                        </option>
                      );
                    })
                  : singleGameData?.rivalProtfolios?.map((data, ind) => {
                      return (
                        <option
                          value={data?.portfolio?.id}
                          key={ind}
                          selected={ind === 0}
                        >
                          {data?.portfolio?.coin?.name &&
                            data.portfolio.coin.name}
                        </option>
                      );
                    })}
              </Form.Select>
            </Form.Group> */}
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
          <Menupopup trigger={buttonPopupMen} setTrigger={setButtonPopupMen}>
            <p className="menuheadpop">MENU</p>
            <div className="makemenuitemsinrow">
              <Link
                className="menuitempopup"
                onClick={() => setButtonPopupMen(false)}
              >
                Resume Game
              </Link>
              <Link className="menuitempopup" to="/profile">
                {" "}
                General Settings
              </Link>
              <Link className="menuitempopup" to="/gamehome">
                Exit Game
              </Link>
            </div>
          </Menupopup>
        </Container>
      </div>
    );
  }
};

export default Play;
