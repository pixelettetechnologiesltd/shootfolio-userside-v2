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
  const [portfolio, setPortfolio] = useState("");
  const [portfolioName, setPortfolioName] = useState("");
  const [portfolioPrice, setPortfolioPrice] = useState("");
  const [quantity, setQuantity] = useState(0);
  const {
    coin,
    errors: error,
    message,
    sessionExpireError,
    loading,
  } = useSelector((state) => state.clubReducer);

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
    if (coin.length <= 0) {
      dispatch(GetAllCoin());
    }
  }, []);

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
      navigate("/competeclub", {
        state: {
          leauge: state.league,
          gameMode: state.gameMode,
          challengerClub: id,
          challengerProtfolios,
        },
      });
    } else {
      toast.error("Portfolio must be equal to five");
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
    setFirstPlayerQuantity(0);
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
    setSecondPlayerQuantity(0);
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
    setThirdPlayerQuantity(0);
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
    setFourthPlayerQuantity(0);
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
    setFifthPlayerQuantity(0);
  };
  return (
    <div>
      <Header />
      <div className="portfoliocreationbg">
        <Container>
          <Row>
            <Col md={4}></Col>
            <Col md={4}>
              <p className="headingportfoliocreation">Portfolio Creation</p>
            </Col>
            <Col md={4}></Col>
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
                </button>
              </Col>
              <Col md={2} xs={12} className="playerportbackground">
                <button
                  className="popupburronbgremove"
                  onClick={() => setsecondPlayerPopup(true)}
                >
                  <p className="playernameportfolio">Player 2</p>
                  <Image src={images.playertwo} width="100%" />
                </button>
              </Col>
              <Col md={2} xs={12} className="playerportbackground">
                <button
                  className="popupburronbgremove"
                  onClick={() => setThirdPlayerPopup(true)}
                >
                  <p className="playernameportfolio">Player 3</p>
                  <Image src={images.playerthree} width="100%" />
                </button>
              </Col>
              <Col md={2} xs={12} className="playerportbackground">
                <button
                  className="popupburronbgremove"
                  onClick={() => setFourthPlayerPopup(true)}
                >
                  <p className="playernameportfolio">Player 4</p>
                  <Image src={images.playerfour} width="100%" />
                </button>
              </Col>
              <Col md={2} xs={12} className="playerportbackground">
                <button
                  className="popupburronbgremove"
                  onClick={() => setFifthPlayerPopup(true)}
                >
                  <p className="playernameportfolio">Player 5</p>
                  <Image src={images.playerfive} width="100%" />
                </button>
              </Col>
            </Col>
            <Col md={1}></Col>
          </Row>
          <Popupselect
            trigger={firstPlayerPopup}
            setTrigger={setfirstPlayerPopup}
          >
            <Form>
              <Form.Group>
                <Form.Label className="selectamountlablel mt-4">
                  Select a coin type for each football player
                </Form.Label>
                <Form.Select
                  className="selectcoinselect"
                  aria-label="Select coin"
                  value={firstPlayerCoinName}
                  onChange={(e) => handleFirstPlayerPortfolio(e)}
                >
                  {coin.length > 0 ? (
                    coin.map((item, ind) => {
                      return (
                        <option
                          key={ind}
                          value={`${item._id} ${item.name} ${item?.quote?.USD?.price}`}
                        >
                          {item.name && item.name}
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
                >
                  Select
                </Button>
              </div>
            </Form>
          </Popupselect>
          <Popupselect
            trigger={secondPlayerPopup}
            setTrigger={setsecondPlayerPopup}
          >
            <Form>
              <Form.Group>
                <Form.Label className="selectamountlablel mt-4">
                  Select a coin type for each football player
                </Form.Label>
                <Form.Select
                  className="selectcoinselect"
                  aria-label="Select coin"
                  value={secondPlayerCoinName}
                  onChange={(e) => handleSecondPlayerPortfolio(e)}
                >
                  {coin.length > 0 ? (
                    coin.map((item, ind) => {
                      return (
                        <option
                          key={ind}
                          value={`${item._id} ${item.name} ${item?.quote?.USD?.price}`}
                        >
                          {item.name && item.name}
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
            <Form>
              <Form.Group>
                <Form.Label className="selectamountlablel mt-4">
                  Select a coin type for each football player
                </Form.Label>
                <Form.Select
                  className="selectcoinselect"
                  aria-label="Select coin"
                  value={thirdPlayerCoinName}
                  onChange={(e) => handleThirdPlayerPortfolio(e)}
                >
                  {coin.length > 0 ? (
                    coin.map((item, ind) => {
                      return (
                        <option
                          key={ind}
                          value={`${item._id} ${item.name} ${item?.quote?.USD?.price}`}
                        >
                          {item.name && item.name}
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
            <Form>
              <Form.Group>
                <Form.Label className="selectamountlablel mt-4">
                  Select a coin type for each football player
                </Form.Label>
                <Form.Select
                  className="selectcoinselect"
                  aria-label="Select coin"
                  value={fourthPlayerCoinName}
                  onChange={(e) => handleFourthPlayerPortfolio(e)}
                >
                  {coin.length > 0 ? (
                    coin.map((item, ind) => {
                      return (
                        <option
                          key={ind}
                          value={`${item._id} ${item.name} ${item?.quote?.USD?.price}`}
                        >
                          {item.name && item.name}
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
            <Form>
              <Form.Group>
                <Form.Label className="selectamountlablel mt-4">
                  Select a coin type for each football player
                </Form.Label>
                <Form.Select
                  className="selectcoinselect"
                  aria-label="Select coin"
                  value={fifthPlayerCoinName}
                  onChange={(e) => handleFifthPlayerPortfolio(e)}
                >
                  {coin.length > 0 ? (
                    coin.map((item, ind) => {
                      return (
                        <option
                          key={ind}
                          value={`${item._id} ${item.name} ${item?.quote?.USD?.price}`}
                        >
                          {item.name && item.name}
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
                >
                  Select
                </Button>
              </div>
            </Form>
          </Popupselect>
          {/* <Popupselect trigger={buttonPopup} setTrigger={setButtonPopup}>
            <Form>
              <Form.Group>
                <Form.Label className="selectamountlablel mt-4">
                  Select a coin type for each football player
                </Form.Label>
                <Form.Select
                  className="selectcoinselect"
                  aria-label="Select coin"
                  value={portfolio}
                  onChange={(e) => handlePortFolioData(e)}
                >
                  {coin.length > 0 ? (
                    coin.map((item, ind) => {
                      return (
                        <option
                          key={ind}
                          value={`${item._id} ${item.name} ${item?.quote?.USD?.price}`}
                        >
                          {item.name && item.name}
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
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </FormGroup>
              <div className="makepopformbutcenter">
                <Button
                  className="selectpopupbutton"
                  onClick={() => handlePortfolioSelect()}
                >
                  Select
                </Button>
              </div>
            </Form>
          </Popupselect> */}
          <Row>
            <Col md={4}></Col>
            <Col md={4} className="makeportcreatebuttoncenter">
              <Button className="portsaveandnext" onClick={() => handleSave()}>
                Save & Next
              </Button>
            </Col>
            <Col md={4}></Col>
          </Row>
        </Container>
        {challengerProtfolios.length > 0 && (
          <table style={{ marginLeft: "40%", marginTop: "2%", color: "white" }}>
            <thead>
              <tr>
                <th>Token</th>
                <th>Quantity</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {challengerProtfoliosValue.length > 0 &&
                challengerProtfoliosValue.map((data, ind) => {
                  return (
                    <tr key={ind}>
                      <td>{data.portfolioName}</td>
                      <td style={{ paddingLeft: "4rem" }}>{data.quantity}</td>
                      <td style={{ paddingLeft: "4rem" }}>
                        {data.portfolioPrice}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Portfoliocreation;
