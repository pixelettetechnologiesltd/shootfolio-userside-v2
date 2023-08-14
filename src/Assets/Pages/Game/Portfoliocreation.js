import { React, useState, useEffect } from "react";
import { Container, Row, Col, Image, Button, FormGroup } from "react-bootstrap";
import "../../Css/Game/Portfoliocreation.css";
import Header from "../../Components/Header";
import { images } from "../../../Images";
import Popupselect from "../../Components/Popupselect";
import Form from "react-bootstrap/Form";
import "../../Css/Game/Payment.css";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  GetAllCoin,
  CreateGame,
  GetGameHistory,
  clearErrors,
  clearMessages,
} from "./../../../store/actions";

const Portfoliocreation = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [challengerProtfolios, setChallengerProtfolios] = useState([
    {
      portfolio: "",
      quantity: "",
    },
  ]);
  const [challengerProtfoliosValue, setChallengerProtfoliosValue] = useState([
    { portfolioName: "", portfolioPrice: "", quantity: "" },
  ]);

  const [portfolioTotal, setPortfolioTotal] = useState("");

  const [portfolio, setPortfolio] = useState("");
  const [portfolioName, setPortfolioName] = useState("");
  const [portfolioPrice, setPortfolioPrice] = useState("");
  const [quantity, setQuantity] = useState(0);
  const {
    coin,
    errors: error,
    message,
    sessionExpireError,
    gameData,
    gameHistory,
    loading,
  } = useSelector((state) => state.clubReducer);

  const [player1InputValue, setplayer1InputValue] = useState("");

  const handlesetplayer1InputChange = (event) => {
    setplayer1InputValue(event.target.value);
  };

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
      setTimeout(() => navigate(`/play/${gameData.id}`), 3000);
    }
  }, [error, sessionExpireError, message]);

  useEffect(() => {
    if (coin.length <= 0) {
      dispatch(GetAllCoin());
    }
    if (state?.game?.length > 0) {
      dispatch(GetGameHistory(state.game[0].id));
    }
  }, []);

  useEffect(() => {
    // run something every time name changes
    if (challengerProtfoliosValue.length > 0) {
      let sum = 0;
      challengerProtfoliosValue.map((data, ind) => {
        if (data) {
          sum += data?.quantity * data?.portfolioPrice;
        }
      });
      setPortfolioTotal(sum);
    }
  }, [challengerProtfoliosValue]);

  const [buttonPopup, setButtonPopup] = useState(false);
  const [firstPlayerPopup, setfirstPlayerPopup] = useState(false);

  const handlePortfolioSelect = () => {
    setChallengerProtfolios([
      ...challengerProtfolios,
      { portfolio, quantity: Number(quantity) },
    ]);
    setChallengerProtfoliosValue([
      ...challengerProtfoliosValue,
      {
        portfolioName,
        quantity: Number(quantity),
        portfolioPrice: parseFloat(portfolioPrice).toFixed(2),
      },
    ]);
    setButtonPopup(false);
  };

  const handleSave = () => {
    if (challengerProtfolios.length === 5) {
      if (
        state?.gameTypeName === "Idle (Player vs Player)" ||
        state?.gameTypeName === "Realtime (Player vs Player)"
      ) {
        const unique = challengerProtfolios.filter(
          (obj, index) =>
            challengerProtfolios.findIndex(
              (item) => item.portfolio === obj.portfolio
            ) === index
        );
        if (unique.length === 5) {
          const finalResult = {
            rivalClub: state?.game.length <= 0 ? id : null,
            leauge: state?.league,
            challengerClub: state?.game.length > 0 ? id : null,
            portfolios: challengerProtfolios,
            gameMode: state?.gameMode,
            gameId: state?.game.length > 0 ? state?.game[0].id : null,
          };
          dispatch(CreateGame(finalResult));
        } else {
          toast.error("There shouldn't be a duplicate Porfolio.");
        }
      } else {
        const unique = challengerProtfolios.filter(
          (obj, index) =>
            challengerProtfolios.findIndex(
              (item) => item.portfolio === obj.portfolio
            ) === index
        );
        if (unique.length === 5) {
          navigate("/competeclub", {
            state: {
              leauge: state.league,
              gameMode: state.gameMode,
              challengerClub: id,
              challengerProtfolios,
            },
          });
        } else {
          toast.error("There shouldn't be a duplicate Porfolio.");
        }
      }
    } else {
      toast.error(
        "Please select five assets for your portfolio. Set investment amount to zero if you want to form a portfolio with less than five assets.” "
      );
    }
  };

  const handlePortFolioData = (e) => {
    let dropdownData = e.target.value.split(" ");
    let coinId = dropdownData[0] || "";
    let coinName = dropdownData[1] || "";
    let coinPrice = dropdownData[2] || "";
    setPortfolio(coinId);
    setPortfolioName(coinName);
    setPortfolioPrice(coinPrice);
  };

  const handleFirstPlayer = () => {
    setfirstPlayerPopup(true);
  };
  const [firstPlayerId, setFirstPlayerId] = useState("");
  const [firstPlayerQuantity, setFirstPlayerQuantity] = useState(0);
  const [firstPlayerCoinName, setFirstPlayerCoinName] = useState("");
  const [firstPlayerPrice, setFirstPlayerPrice] = useState("");
  const handleFirstPlayerPortfolio = (e) => {
    let dropdownData = e.target.value.split(" ");
    let coinId = dropdownData[0] || "";
    let coinName = dropdownData[1] || "";
    const coinPrice = dropdownData.slice(-1);
    setFirstPlayerId(coinId);
    setFirstPlayerCoinName(coinName);
    setFirstPlayerPrice(parseFloat(coinPrice).toFixed(2));
  };

  const handleFirstPortfolioSelect = (index) => {
    if (index >= 0 && index <= 5) {
      const newArray = [...challengerProtfolios];
      newArray[index] = {
        portfolio: firstPlayerId,
        quantity: Number(firstPlayerQuantity),
      };
      setChallengerProtfolios(newArray);
    } else {
      toast.error("Wrong data");
    }
    if (index >= 0 && index <= 5) {
      const newArray = [...challengerProtfoliosValue];
      newArray[index] = {
        portfolioName: firstPlayerCoinName,
        quantity: Number(firstPlayerQuantity),
        portfolioPrice: firstPlayerPrice,
      };
      setChallengerProtfoliosValue(newArray);
    } else {
      toast.error("Wrong data");
    }
    setfirstPlayerPopup(false);
    // setFirstPlayerQuantity(0);
  };

  const [secondPlayerPopup, setsecondPlayerPopup] = useState(false);
  const [secondPlayerId, setSecondPlayerId] = useState("");
  const [secondPlayerQuantity, setSecondPlayerQuantity] = useState(0);
  const [secondPlayerCoinName, setSecondPlayerCoinName] = useState("");
  const [secondPlayerPrice, setSecondPlayerPrice] = useState("");
  const handleSecondPlayerPortfolio = (e) => {
    let dropdownData = e.target.value.split(" ");
    let coinId = dropdownData[0] || "";
    let coinName = dropdownData[1] || "";
    const coinPrice = dropdownData.slice(-1);
    setSecondPlayerId(coinId);
    setSecondPlayerCoinName(coinName);
    setSecondPlayerPrice(parseFloat(coinPrice).toFixed(2));
  };
  const handleSecondPortfolioSelect = (index) => {
    if (index >= 0 && index <= 5) {
      const newArray = [...challengerProtfolios];
      newArray[index] = {
        portfolio: secondPlayerId,
        quantity: Number(secondPlayerQuantity),
      };
      setChallengerProtfolios(newArray);
    } else {
      toast.error("Wrong data");
    }
    if (index >= 0 && index <= 5) {
      const newArray = [...challengerProtfoliosValue];
      newArray[index] = {
        portfolioName: secondPlayerCoinName,
        quantity: Number(secondPlayerQuantity),
        portfolioPrice: secondPlayerPrice,
      };
      setChallengerProtfoliosValue(newArray);
    } else {
      toast.error("Wrong data");
    }
    setsecondPlayerPopup(false);
    // setSecondPlayerQuantity(0);
  };

  const [thirdPlayerPopup, setThirdPlayerPopup] = useState(false);
  const [thirdPlayerId, setThirdPlayerId] = useState("");
  const [thirdPlayerQuantity, setThirdPlayerQuantity] = useState(0);
  const [thirdPlayerCoinName, setThirdPlayerCoinName] = useState("");
  const [thirdPlayerPrice, setThirdPlayerPrice] = useState("");

  const handleThirdPlayerPortfolio = (e) => {
    let dropdownData = e.target.value.split(" ");
    let coinId = dropdownData[0] || "";
    let coinName = dropdownData[1] || "";
    const coinPrice = dropdownData.slice(-1);
    setThirdPlayerId(coinId);
    setThirdPlayerCoinName(coinName);
    setThirdPlayerPrice(parseFloat(coinPrice).toFixed(2));
  };
  const handleThirdPortfolioSelect = (index) => {
    if (index >= 0 && index <= 5) {
      const newArray = [...challengerProtfolios];
      newArray[index] = {
        portfolio: thirdPlayerId,
        quantity: Number(thirdPlayerQuantity),
      };
      setChallengerProtfolios(newArray);
    } else {
      toast.error("Wrong data");
    }
    if (index >= 0 && index <= 5) {
      const newArray = [...challengerProtfoliosValue];
      newArray[index] = {
        portfolioName: thirdPlayerCoinName,
        quantity: Number(thirdPlayerQuantity),
        portfolioPrice: thirdPlayerPrice,
      };
      setChallengerProtfoliosValue(newArray);
    } else {
      toast.error("Wrong data");
    }
    setThirdPlayerPopup(false);
    // setThirdPlayerQuantity(0);
  };

  const [fourthPlayerPopup, setFourthPlayerPopup] = useState(false);
  const [fourthPlayerId, setFourthPlayerId] = useState("");
  const [fourthPlayerQuantity, setFourthPlayerQuantity] = useState(0);
  const [fourthPlayerCoinName, setFourthPlayerCoinName] = useState("");
  const [fourthPlayerPrice, setFourthPlayerPrice] = useState("");

  const handleFourthPlayerPortfolio = (e) => {
    let dropdownData = e.target.value.split(" ");
    let coinId = dropdownData[0] || "";
    let coinName = dropdownData[1] || "";
    const coinPrice = dropdownData.slice(-1);
    setFourthPlayerId(coinId);
    setFourthPlayerCoinName(coinName);
    setFourthPlayerPrice(parseFloat(coinPrice).toFixed(2));
  };
  const handleFourthPortfolioSelect = (index) => {
    if (index >= 0 && index <= 5) {
      const newArray = [...challengerProtfolios];
      newArray[index] = {
        portfolio: fourthPlayerId,
        quantity: Number(fourthPlayerQuantity),
      };
      setChallengerProtfolios(newArray);
    } else {
      toast.error("Wrong data");
    }
    if (index >= 0 && index <= 5) {
      const newArray = [...challengerProtfoliosValue];
      newArray[index] = {
        portfolioName: fourthPlayerCoinName,
        quantity: Number(fourthPlayerQuantity),
        portfolioPrice: fourthPlayerPrice,
      };
      setChallengerProtfoliosValue(newArray);
    } else {
      toast.error("Wrong data");
    }
    setFourthPlayerPopup(false);
    // setFourthPlayerQuantity(0);
  };

  const [fifthPlayerPopup, setFifthPlayerPopup] = useState(false);
  const [fifthPlayerId, setFifthPlayerId] = useState("");
  const [fifthPlayerQuantity, setFifthPlayerQuantity] = useState(0);
  const [fifthPlayerCoinName, setFifthPlayerCoinName] = useState("");
  const [fifthPlayerPrice, setFifthPlayerPrice] = useState("");

  const handleFifthPlayerPortfolio = (e) => {
    let dropdownData = e.target.value.split(" ");
    let coinId = dropdownData[0] || "";
    let coinName = dropdownData[1] || "";
    const coinPrice = dropdownData.slice(-1);
    setFifthPlayerId(coinId);
    setFifthPlayerCoinName(coinName);
    setFifthPlayerPrice(parseFloat(coinPrice).toFixed(2));
  };
  const handleFifthPortfolioSelect = (index) => {
    if (index >= 0 && index <= 5) {
      const newArray = [...challengerProtfolios];
      newArray[index] = {
        portfolio: fifthPlayerId,
        quantity: Number(fifthPlayerQuantity),
      };
      setChallengerProtfolios(newArray);
    } else {
      toast.error("Wrong data");
    }
    if (index >= 0 && index <= 5) {
      const newArray = [...challengerProtfoliosValue];
      newArray[index] = {
        portfolioName: fifthPlayerCoinName,
        quantity: Number(fifthPlayerQuantity),
        portfolioPrice: fifthPlayerPrice,
      };
      setChallengerProtfoliosValue(newArray);
    } else {
      toast.error("Wrong data");
    }
    setFifthPlayerPopup(false);
    // setFifthPlayerQuantity(0);
  };
  const handleKeyDown = (event) => {
    if (event.key === "Enter" && event.shiftKey === false) {
      event.preventDefault();
    }
  };
  return (
    <div>
      <Header />
      <div className="portfoliocreationbg">
        <Container>
          <Row>
            <Col md={3}></Col>
            <Col md={6}>
              <p className="headingportfoliocreation">Portfolio Creation</p>
              <p className="creationportmaindesc">
                Build your digital asset portfolio by selecting your preferred
                assets. Allocate your funds wisely to maximize returns in the
                game.
              </p>
            </Col>
            <Col md={3}></Col>
          </Row>

          <Row>
            <Col md={5}></Col>
            <Col md={2}>
              <p className="totalbalancecreation">
                Total Balance:{" "}
                {state?.investableBudget && state.investableBudget}
              </p>
            </Col>
            <Col md={5}></Col>
          </Row>

          <Row className="mt-5">
            <Col md={1}></Col>
            <Col md={10} className="makeplayersrow">
              <Col md={2} xs={12} className="playerportbackground">
                <button
                  className="popupburronbgremove"
                  onClick={() => handleFirstPlayer()}
                >
                  <p className="playernameportfolio">Player 1</p>
                  <Image src={images.playerone} width="100%" />
                  {challengerProtfoliosValue[0]?.portfolioName ? (
                    <div className="setforsmallp">
                      <p className="mt-1 mb-1">
                        <small>
                          Asset: {challengerProtfoliosValue[0]?.portfolioName}
                        </small>
                      </p>
                      <p className="mb-1">
                        <small>
                          Quantity: {challengerProtfoliosValue[0]?.quantity}
                        </small>
                      </p>
                      <p className="mb-1">
                        <small>
                          Price per Unit:{" "}
                          {challengerProtfoliosValue[0]?.portfolioPrice}
                        </small>
                      </p>
                      <p className="mb-1">
                        <small>
                          Total Cost:{" "}
                          {challengerProtfoliosValue[0]?.portfolioPrice *
                            challengerProtfoliosValue[0]?.quantity}
                        </small>
                      </p>
                    </div>
                  ) : (
                    ""
                  )}
                </button>
              </Col>
              <Col md={2} xs={12} className="playerportbackground">
                <button
                  className="popupburronbgremove"
                  onClick={() => setsecondPlayerPopup(true)}
                >
                  <p className="playernameportfolio">Player 2</p>
                  <Image src={images.playertwo} width="100%" />
                  {challengerProtfoliosValue[1]?.portfolioName ? (
                    <div className="setforsmallp">
                      <p className="mt-1 mb-1">
                        <small>
                          Asset: {challengerProtfoliosValue[1]?.portfolioName}
                        </small>
                      </p>
                      <p className="mb-1">
                        <small>
                          Quantity: {challengerProtfoliosValue[1]?.quantity}
                        </small>
                      </p>
                      <p className="mb-1">
                        <small>
                          Price per Unit:{" "}
                          {challengerProtfoliosValue[1]?.portfolioPrice}
                        </small>
                      </p>
                      <p className="mb-1">
                        <small>
                          Total Cost:{" "}
                          {challengerProtfoliosValue[1]?.portfolioPrice *
                            challengerProtfoliosValue[1]?.quantity}
                        </small>
                      </p>
                    </div>
                  ) : (
                    ""
                  )}
                </button>
              </Col>
              <Col md={2} xs={12} className="playerportbackground">
                <button
                  className="popupburronbgremove"
                  onClick={() => setThirdPlayerPopup(true)}
                >
                  <p className="playernameportfolio">Player 3</p>
                  <Image src={images.playerthree} width="100%" />
                  {challengerProtfoliosValue[2]?.portfolioName ? (
                    <div className="setforsmallp">
                      <p className="mt-1 mb-1">
                        <small>
                          Asset: {challengerProtfoliosValue[2]?.portfolioName}
                        </small>
                      </p>
                      <p className="mb-1">
                        <small>
                          Quantity: {challengerProtfoliosValue[2]?.quantity}
                        </small>
                      </p>
                      <p className="mb-1">
                        <small>
                          Price per Unit:{" "}
                          {challengerProtfoliosValue[2]?.portfolioPrice}
                        </small>
                      </p>
                      <p className="mb-1">
                        <small>
                          Total Cost:{" "}
                          {challengerProtfoliosValue[2]?.portfolioPrice *
                            challengerProtfoliosValue[2]?.quantity}
                        </small>
                      </p>
                    </div>
                  ) : (
                    ""
                  )}
                </button>
              </Col>
              <Col md={2} xs={12} className="playerportbackground">
                <button
                  className="popupburronbgremove"
                  onClick={() => setFourthPlayerPopup(true)}
                >
                  <p className="playernameportfolio">Player 4</p>
                  <Image src={images.playerfour} width="100%" />
                  {challengerProtfoliosValue[3]?.portfolioName ? (
                    <div className="setforsmallp">
                      <p className="mt-1 mb-1">
                        <small>
                          Asset: {challengerProtfoliosValue[3]?.portfolioName}
                        </small>
                      </p>
                      <p className="mb-1">
                        <small>
                          Quantity: {challengerProtfoliosValue[3]?.quantity}
                        </small>
                      </p>
                      <p className="mb-1">
                        <small>
                          Price per Unit:{" "}
                          {challengerProtfoliosValue[3]?.portfolioPrice}
                        </small>
                      </p>
                      <p className="mb-1">
                        <small>
                          Total Cost:{" "}
                          {challengerProtfoliosValue[3]?.portfolioPrice *
                            challengerProtfoliosValue[3]?.quantity}
                        </small>
                      </p>
                    </div>
                  ) : (
                    ""
                  )}
                </button>
              </Col>
              <Col md={2} xs={12} className="playerportbackground">
                <button
                  className="popupburronbgremove"
                  onClick={() => setFifthPlayerPopup(true)}
                >
                  <p className="playernameportfolio">Player 5</p>
                  <Image src={images.playerfive} width="100%" />
                  {challengerProtfoliosValue[4]?.portfolioName ? (
                    <div className="setforsmallp">
                      <p className="mt-1 mb-1">
                        <small>
                          Asset: {challengerProtfoliosValue[4]?.portfolioName}
                        </small>
                      </p>
                      <p className="mb-1">
                        <small>
                          Quantity: {challengerProtfoliosValue[4]?.quantity}
                        </small>
                      </p>
                      <p className="mb-1">
                        <small>
                          Price per Unit:{" "}
                          {challengerProtfoliosValue[4]?.portfolioPrice}
                        </small>
                      </p>
                      <p className="mb-1">
                        <small>
                          Total Cost:{" "}
                          {challengerProtfoliosValue[4]?.portfolioPrice *
                            challengerProtfoliosValue[4]?.quantity}
                        </small>
                      </p>
                    </div>
                  ) : (
                    ""
                  )}
                </button>
              </Col>
            </Col>
            <Col md={1}></Col>
          </Row>
          <Popupselect
            trigger={firstPlayerPopup}
            setTrigger={setfirstPlayerPopup}
          >
            <Form
              onKeyDown={(e) => {
                handleKeyDown(e);
              }}
            >
              <Form.Label className="selectamountlablelforbalance mt-4">
                Remaining Balance{" "}
                <span style={{ color: "green" }}>
                  {state?.investableBudget &&
                    state.investableBudget - portfolioTotal}
                </span>
              </Form.Label>
              <Form.Group>
                <Form.Label className="selectamountlablel mt-4">
                  Select a coin type for each football player
                </Form.Label>

                <Form.Select
                  className="selectcoinselect"
                  aria-label="Select coin"
                  onChange={(e) => handleFirstPlayerPortfolio(e)}
                >
                  <option>-- Select Coin --</option>
                  {coin.length > 0 ? (
                    coin.map((item, ind) => {
                      return (
                        <option
                          key={ind}
                          value={`${item._id} ${item.name} ${item?.quote?.USD?.price}`}
                        >
                          {item.name && item.name} ($
                          {parseFloat(item?.quote?.USD?.price).toFixed(2)})
                        </option>
                      );
                    })
                  ) : (
                    <option>Loading...</option>
                  )}
                </Form.Select>
              </Form.Group>
              <FormGroup>
                <Form.Label
                  className="selectamountlablel mt-4"
                  htmlFor="exampleColorInput"
                >
                  Select amount
                </Form.Label>
                <Form.Control
                  className="numbercssmod"
                  type="number"
                  id="exampleNumberInput"
                  defaultValue="0.00"
                  min="0.00"
                  step="0.01"
                  title="Choose your Number"
                  value={firstPlayerQuantity}
                  onChange={(e) => setFirstPlayerQuantity(e.target.value)}
                />
              </FormGroup>

              <div className="makepopformbutcenter">
                <Button
                  className="selectpopupbutton"
                  onClick={() => handleFirstPortfolioSelect(0)}
                  disabled={!firstPlayerId}
                >
                  {firstPlayerId ? "Select" : "Select Coin"}
                </Button>
              </div>
            </Form>
          </Popupselect>
          <Popupselect
            trigger={secondPlayerPopup}
            setTrigger={setsecondPlayerPopup}
          >
            <Form
              onKeyDown={(e) => {
                handleKeyDown(e);
              }}
            >
              <Form.Label className="selectamountlablelforbalance mt-4">
                Remaining Balance{" "}
                <span style={{ color: "green" }}>
                  {state?.investableBudget &&
                    state.investableBudget - portfolioTotal}
                </span>
              </Form.Label>
              <Form.Group>
                <Form.Label className="selectamountlablel mt-4">
                  Select a coin type for each football player
                </Form.Label>
                <Form.Select
                  className="selectcoinselect"
                  aria-label="Select coin"
                  onChange={(e) => handleSecondPlayerPortfolio(e)}
                >
                  <option>-- Select Coin --</option>
                  {coin.length > 0 ? (
                    coin.map((item, ind) => {
                      return (
                        <option
                          key={ind}
                          value={`${item._id} ${item.name} ${item?.quote?.USD?.price}`}
                        >
                          {item.name && item.name} ($
                          {parseFloat(item?.quote?.USD?.price).toFixed(2)})
                        </option>
                      );
                    })
                  ) : (
                    <option>Loading...</option>
                  )}
                </Form.Select>
              </Form.Group>
              <FormGroup>
                <Form.Label
                  className="selectamountlablel mt-4"
                  htmlFor="exampleColorInput"
                >
                  Select amount
                </Form.Label>
                <Form.Control
                  className="numbercssmod"
                  type="number"
                  id="exampleNumberInput"
                  defaultValue="0.00"
                  min="0.00"
                  step="0.01"
                  title="Choose your Number"
                  value={secondPlayerQuantity}
                  onChange={(e) => setSecondPlayerQuantity(e.target.value)}
                />
              </FormGroup>
              <div className="makepopformbutcenter">
                <Button
                  className="selectpopupbutton"
                  onClick={() => handleSecondPortfolioSelect(1)}
                  disabled={!secondPlayerId}
                >
                  Select
                </Button>
              </div>
            </Form>
          </Popupselect>
          <Popupselect
            trigger={thirdPlayerPopup}
            setTrigger={setThirdPlayerPopup}
          >
            <Form
              onKeyDown={(e) => {
                handleKeyDown(e);
              }}
            >
              <Form.Label className="selectamountlablelforbalance mt-4">
                Remaining Balance{" "}
                <span style={{ color: "green" }}>
                  {state?.investableBudget &&
                    state.investableBudget - portfolioTotal}
                </span>
              </Form.Label>
              <Form.Group>
                <Form.Label className="selectamountlablel mt-4">
                  Select a coin type for each football player
                </Form.Label>
                <Form.Select
                  className="selectcoinselect"
                  aria-label="Select coin"
                  onChange={(e) => handleThirdPlayerPortfolio(e)}
                >
                  <option>-- Select Coin --</option>
                  {coin.length > 0 ? (
                    coin.map((item, ind) => {
                      return (
                        <option
                          key={ind}
                          value={`${item._id} ${item.name} ${item?.quote?.USD?.price}`}
                        >
                          {item.name && item.name} ($
                          {parseFloat(item?.quote?.USD?.price).toFixed(2)})
                        </option>
                      );
                    })
                  ) : (
                    <option>Loading...</option>
                  )}
                </Form.Select>
              </Form.Group>
              <FormGroup>
                <Form.Label
                  className="selectamountlablel mt-4"
                  htmlFor="exampleColorInput"
                >
                  Select amount
                </Form.Label>
                <Form.Control
                  className="numbercssmod"
                  type="number"
                  id="exampleNumberInput"
                  defaultValue="0.00"
                  min="0.00"
                  step="0.01"
                  title="Choose your Number"
                  value={thirdPlayerQuantity}
                  onChange={(e) => setThirdPlayerQuantity(e.target.value)}
                />
              </FormGroup>
              <div className="makepopformbutcenter">
                <Button
                  className="selectpopupbutton"
                  onClick={() => handleThirdPortfolioSelect(2)}
                  disabled={!thirdPlayerId}
                >
                  Select
                </Button>
              </div>
            </Form>
          </Popupselect>
          <Popupselect
            trigger={fourthPlayerPopup}
            setTrigger={setFourthPlayerPopup}
          >
            <Form
              onKeyDown={(e) => {
                handleKeyDown(e);
              }}
            >
              <Form.Label className="selectamountlablelforbalance mt-4">
                Remaining Balance{" "}
                <span style={{ color: "green" }}>
                  {state?.investableBudget &&
                    state.investableBudget - portfolioTotal}
                </span>
              </Form.Label>
              <Form.Group>
                <Form.Label className="selectamountlablel mt-4">
                  Select a coin type for each football player
                </Form.Label>
                <Form.Select
                  className="selectcoinselect"
                  aria-label="Select coin"
                  onChange={(e) => handleFourthPlayerPortfolio(e)}
                >
                  <option>-- Select Coin --</option>
                  {coin.length > 0 ? (
                    coin.map((item, ind) => {
                      return (
                        <option
                          key={ind}
                          value={`${item._id} ${item.name} ${item?.quote?.USD?.price}`}
                        >
                          {item.name && item.name} ($
                          {parseFloat(item?.quote?.USD?.price).toFixed(2)})
                        </option>
                      );
                    })
                  ) : (
                    <option>Loading...</option>
                  )}
                </Form.Select>
              </Form.Group>
              <FormGroup>
                <Form.Label
                  className="selectamountlablel mt-4"
                  htmlFor="exampleColorInput"
                >
                  Select amount
                </Form.Label>
                <Form.Control
                  className="numbercssmod"
                  type="number"
                  id="exampleNumberInput"
                  defaultValue="0.00"
                  min="0.00"
                  step="0.01"
                  title="Choose your Number"
                  value={fourthPlayerQuantity}
                  onChange={(e) => setFourthPlayerQuantity(e.target.value)}
                />
              </FormGroup>
              <div className="makepopformbutcenter">
                <Button
                  className="selectpopupbutton"
                  onClick={() => handleFourthPortfolioSelect(3)}
                >
                  Select
                </Button>
              </div>
            </Form>
          </Popupselect>
          <Popupselect
            trigger={fifthPlayerPopup}
            setTrigger={setFifthPlayerPopup}
          >
            <Form
              onKeyDown={(e) => {
                handleKeyDown(e);
              }}
            >
              <Form.Label className="selectamountlablelforbalance mt-4">
                Remaining Balance{" "}
                <span style={{ color: "green" }}>
                  {state?.investableBudget &&
                    state.investableBudget - portfolioTotal}
                </span>
              </Form.Label>
              <Form.Group>
                <Form.Label className="selectamountlablel mt-4">
                  Select a coin type for each football player
                </Form.Label>
                <Form.Select
                  className="selectcoinselect"
                  aria-label="Select coin"
                  onChange={(e) => handleFifthPlayerPortfolio(e)}
                >
                  <option>-- Select Coin --</option>
                  {coin.length > 0 ? (
                    coin.map((item, ind) => {
                      return (
                        <option
                          key={ind}
                          value={`${item._id} ${item.name} ${item?.quote?.USD?.price}`}
                        >
                          {item.name && item.name} ($
                          {parseFloat(item?.quote?.USD?.price).toFixed(2)})
                        </option>
                      );
                    })
                  ) : (
                    <option>Loading...</option>
                  )}
                </Form.Select>
              </Form.Group>
              <FormGroup>
                <Form.Label
                  className="selectamountlablel mt-4"
                  htmlFor="exampleColorInput"
                >
                  Select amount
                </Form.Label>
                <Form.Control
                  className="numbercssmod"
                  type="number"
                  id="exampleNumberInput"
                  defaultValue="0.00"
                  min="0.00"
                  step="0.01"
                  title="Choose your Number"
                  value={fifthPlayerQuantity}
                  onChange={(e) => setFifthPlayerQuantity(e.target.value)}
                />
              </FormGroup>
              <div className="makepopformbutcenter">
                <Button
                  className="selectpopupbutton"
                  onClick={() => handleFifthPortfolioSelect(4)}
                  disabled={!fifthPlayerId}
                >
                  Select
                </Button>
              </div>
            </Form>
          </Popupselect>
          <Row>
            <Col md={4}></Col>
            <Col md={4} className="makeportcreatebuttoncenter">
              <Button
                className="portsaveandnext"
                onClick={() => handleSave()}
                disabled={loading ? true : false}
              >
                {loading ? "Please wait..." : "Save & Next"}
              </Button>
            </Col>
            <Col md={4}></Col>
          </Row>
        </Container>
        {state?.gameTypeName === "Idle (Player vs Player)" ||
          (state?.gameTypeName === "Realtime (Player vs Player)" && (
            <table
              style={{ marginLeft: "40%", marginTop: "2%", color: "white" }}
            >
              <thead>
                <tr>
                  <th>Game History</th>
                  {/* <th>Quantity</th>
                  <th>Amount</th> */}
                </tr>
              </thead>
              <tbody>
                {gameHistory.length > 0 &&
                  gameHistory.map((data, ind) => {
                    return (
                      <tr key={ind}>
                        {/* <td>{data?.portfolioName && data.portfolioName}</td> */}
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          ))}
      </div>
    </div>
  );
};

export default Portfoliocreation;
