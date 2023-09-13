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
  CreateMultiplayerGame,
  clearErrors,
  clearMessages,
} from "./../../../store/actions";

const MultiPlayerPortfoliocreation = () => {
  const [portfolioTotal, setPortfolioTotal] = useState("");
  const { id } = useParams();
  const { state } = useLocation();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [role, setRole] = useState("");
  const [challengerProtfolios, setChallengerProtfolios] = useState([
    {
      portfolio: "",
      quantity: "",
    },
  ]);
  const [challengerProtfoliosValue, setChallengerProtfoliosValue] = useState([
    { portfolioName: "", portfolioPrice: "", quantity: "" },
  ]);
  const {
    coin,
    multiPlayerGameData,
    errors: error,
    message,
    sessionExpireError,
    loading,
  } = useSelector((state) => state.clubReducer);

  console.log("state is", state);
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
      setTimeout(
        () => navigate(`/multiPlayer/${multiPlayerGameData?.id}`),
        3000
      );
    }
  }, [error, sessionExpireError, message]);

  useEffect(() => {
    if (coin.length <= 0) {
      dispatch(GetAllCoin());
    }
  }, []);

  const [firstPlayerPopup, setfirstPlayerPopup] = useState(false);

  const handleFirstPlayer = () => {
    setfirstPlayerPopup(true);
  };
  const [firstPlayerId, setFirstPlayerId] = useState("");
  const [firstPlayerQuantity, setFirstPlayerQuantity] = useState(0);
  const [firstPlayerCoinName, setFirstPlayerCoinName] = useState("");
  const [firstPlayerPrice, setFirstPlayerPrice] = useState("");
  let roleArray = ["FW", "MD", "DF", "GK", "Extra"];
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

      // setPortfolioTotal(firstPlayerId.);
      console.log(firstPlayerId);
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
      console.log(firstPlayerCoinName);
    } else {
      toast.error("Wrong data");
    }
    setfirstPlayerPopup(false);
    // setFirstPlayerQuantity(0);
  };

  const handleSave = () => {
    if (!role) {
      return toast.error("Role is required");
    }
    if (!firstPlayerQuantity) {
      return toast.error("Quantity is required");
    }
    if (!firstPlayerId) {
      return toast.error("Portfolio is required");
    }
    let finalResult = {
      leauge: state?.league && state.league,
      rivalClub: null,
      challengerClub: null,
      portfolios: [
        {
          portfolio: firstPlayerId,
          quantity: Number(firstPlayerQuantity),
          role: role,
        },
      ],
      gameMode: state?.gameMode && state.gameMode,
      club: id,
      gameId:
        (state.gameForMultiPlayer[0]?.rivalClub?.id?.toString() ===
          id.toString() &&
          state.gameForMultiPlayer[0]?.gameMode?.id?.toString() ===
            state?.gameMode?.toString() &&
          state.gameForMultiPlayer[0]?.leauge?.id?.toString() ===
            state?.league?.toString() &&
          state.gameForMultiPlayer[0]?.status?.toString() === "Pending") ||
        (state.gameForMultiPlayer[0]?.challengerClub?.id?.toString() ===
          id.toString() &&
          state.gameForMultiPlayer[0]?.gameMode?.id?.toString() ===
            state?.gameMode?.toString() &&
          state.gameForMultiPlayer[0]?.leauge?.id?.toString() ===
            state?.league?.toString() &&
          state.gameForMultiPlayer[0]?.status?.toString() === "Pending")
          ? state.gameForMultiPlayer[0].id
          : null,
    };
    dispatch(CreateMultiplayerGame(finalResult));
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
            <Col md={4}></Col>
            <Col md={4}>
              <p className="totalbalancecreation">
                Total Balance: $
                {state?.investableBudget && state.investableBudget / 5}
              </p>
            </Col>
            <Col md={4}></Col>
          </Row>

          <Row>
            <Col md={4}></Col>
            <Col md={4}>
              <p className="totalbalancecreation">
                Remaining Balance: $
                {state?.investableBudget &&
                  state.investableBudget / 5 -
                    firstPlayerPrice * firstPlayerQuantity}
              </p>
            </Col>
            <Col md={4}></Col>
          </Row>

          <Row className="mt-5">
            <Col md={1}></Col>
            <Col md={10} className="makeplayersrow">
              <Col md={2} xs={12} className="playerportbackground">
                <button
                  className="popupburronbgremove pb-2"
                  onClick={() => handleFirstPlayer()}
                >
                  <p className="playernameportfolio">Player</p>
                  <Image src={images.playerone} width="100%" />
                  <div className="setforsmallp">
                    <p className="mt-1 mb-1">
                      <small>Asset: {firstPlayerCoinName}</small>
                    </p>
                    <p className="mb-1">
                      <small>Quantity: {firstPlayerQuantity}</small>
                    </p>
                    <p className="mb-1">
                      <small>Price per Unit: {firstPlayerPrice}</small>
                    </p>
                    <p className="mb-1">
                      <small>
                        Total Cost: {firstPlayerQuantity * firstPlayerPrice}
                      </small>
                    </p>
                  </div>
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
              <Form.Label className="selectamountlablel mt-4">
                Balance is{" "}
                <span style={{ color: "green" }}>
                  {state?.investableBudget && state.investableBudget}
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
                  <option>Open menu for select coin type</option>
                  {coin.length > 0 ? (
                    coin.map((item, ind) => {
                      return (
                        <option
                          key={ind}
                          value={`${item._id} ${item.name} ${item?.quote?.USD?.price}`}
                        >
                          {item.name && item.name} ($
                          {parseFloat(item?.quote?.USD?.price) > 0.01
                            ? parseFloat(item?.quote?.USD?.price).toFixed(3)
                            : parseFloat(item?.quote?.USD?.price).toFixed(
                                7
                              )}{" "}
                          )
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
              <FormGroup>
                <Form.Label
                  className="selectamountlablel mt-4"
                  htmlFor="exampleColorInput"
                >
                  Select role
                </Form.Label>
                <Form.Select
                  className="selectcoinselect"
                  aria-label="Select coin"
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option>Open menu for select role</option>
                  {roleArray.length > 0 ? (
                    roleArray.map((item, ind) => {
                      return (
                        <option key={ind} value={item}>
                          {item}
                        </option>
                      );
                    })
                  ) : (
                    <option>Loading...</option>
                  )}
                </Form.Select>
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
          <Row>
            <Col md={4}></Col>
            <Col md={4} className="makeportcreatebuttoncenter">
              <Button
                className="portsaveandnext"
                onClick={() => handleSave()}
                disabled={loading ? true : false}
              >
                {loading ? "Please wait.." : "Save & Next"}
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
                <th>Balance</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {challengerProtfoliosValue.length > 0 &&
                challengerProtfoliosValue.map((data, ind) => {
                  return (
                    <tr key={ind}>
                      <td>{data?.portfolioName && data.portfolioName}</td>
                      <td style={{ paddingLeft: "4rem" }}>
                        {data?.quantity && data.quantity}
                      </td>
                      <td style={{ paddingLeft: "4rem" }}>
                        {data?.quantity * data?.portfolioPrice}
                      </td>
                      <td style={{ paddingLeft: "4rem", color: "green" }}>
                        {state?.investableBudget && state.investableBudget}
                      </td>
                      <td>{role && role}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        )}
        {(state?.gameForMultiPlayer?.length > 0 &&
          state.gameForMultiPlayer[0]?.challengerClub?.id?.toString() ===
            id.toString()) ||
          (state?.gameForMultiPlayer?.length > 0 &&
            state.gameForMultiPlayer[0]?.rivalClub?.id?.toString() ===
              id.toString() && (
              <table
                style={{ marginLeft: "40%", marginTop: "2%", color: "white" }}
              >
                <thead>
                  <tr>
                    <th>UserName</th>
                    <th>Token</th>
                    <th>Amount</th>
                    <th>Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  {state?.gameForMultiPlayer?.length > 0 &&
                  state.gameForMultiPlayer[0]?.challengerClub?.id?.toString() ===
                    id.toString() &&
                  state.gameForMultiPlayer[0]?.gameMode?.id?.toString() ===
                    state?.gameMode?.toString() &&
                  state.gameForMultiPlayer[0]?.leauge?.id?.toString() ===
                    state?.league?.toString() &&
                  state.gameForMultiPlayer[0]?.status?.toString() === "Pending"
                    ? state?.gameForMultiPlayer.map((data, ind) => {
                        return (
                          <tr key={ind}>
                            {data?.challengerProtfolios?.length > 0 &&
                              data.challengerProtfolios.map((item, ind) => {
                                return (
                                  <tr key={ind}>
                                    <td>
                                      {item?.user?.userName &&
                                        item.user.userName}
                                    </td>
                                    <td style={{ marginRight: "2rem" }}>
                                      {item?.portfolio?.coin?.name &&
                                        item.portfolio.coin.name}
                                    </td>
                                    <td style={{ marginRight: "2rem" }}>
                                      {item?.portfolio?.coin?.quote?.USD
                                        ?.price &&
                                        parseFloat(
                                          item.portfolio.coin.quote.USD.price *
                                            item?.portfolio?.quantity
                                        ).toFixed(2)}
                                    </td>
                                    <td style={{ marginRight: "2rem" }}>
                                      {item?.portfolio?.quantity &&
                                        item.portfolio.quantity}
                                    </td>
                                  </tr>
                                );
                              })}
                          </tr>
                        );
                      })
                    : state?.gameForMultiPlayer?.length > 0 &&
                      state.gameForMultiPlayer[0]?.rivalClub?.id?.toString() ===
                        id.toString() &&
                      state.gameForMultiPlayer[0]?.gameMode?.id?.toString() ===
                        state?.gameMode?.toString() &&
                      state.gameForMultiPlayer[0]?.leauge?.id?.toString() ===
                        state?.league?.toString() &&
                      state.gameForMultiPlayer[0]?.status?.toString() ===
                        "Pending"
                    ? state?.gameForMultiPlayer.map((data, ind) => {
                        return (
                          <tr key={ind}>
                            {data?.rivalProtfolios?.length > 0 &&
                              data?.rivalProtfolios?.map((item, ind) => {
                                return (
                                  <tr key={ind}>
                                    <td>
                                      {item?.user?.userName &&
                                        item.user.userName}
                                    </td>
                                    <td style={{ marginRight: "2rem" }}>
                                      {item?.portfolio?.coin?.name &&
                                        item.portfolio.coin.name}
                                    </td>
                                    <td style={{ marginRight: "2rem" }}>
                                      {item?.portfolio?.coin?.quote?.USD
                                        ?.price &&
                                        parseFloat(
                                          item.portfolio.coin.quote.USD.price *
                                            item?.portfolio?.quantity
                                        ).toFixed(2)}
                                    </td>
                                    <td style={{ marginRight: "2rem" }}>
                                      {item?.portfolio?.quantity &&
                                        item.portfolio.quantity}
                                    </td>
                                  </tr>
                                );
                              })}
                          </tr>
                        );
                      })
                    : ""}
                </tbody>
              </table>
            ))}
        {/* {challengerProtfolios.length > 0 && (
          <table style={{ marginLeft: "40%", marginTop: "2%", color: "white" }}>
            <thead>
              <tr>
                <th>UserName</th>
                <th>Token</th>
                <th>Amount</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
              {state?.gameForMultiPlayer?.length > 0 &&
                state.gameForMultiPlayer.map((data, ind) => {
                  return (
                    <tr key={ind}>
                      {data?.rivalProtfolios?.length > 0 &&
                        data.rivalProtfolios.map((item, ind) => {
                          return (
                            <tr key={ind}>
                              <td>
                                {item?.user?.userName && item.user.userName}
                              </td>
                              <td style={{ marginRight: "2rem" }}>
                                {item?.portfolio?.coin?.name &&
                                  item.portfolio.coin.name}
                              </td>
                              <td style={{ marginRight: "2rem" }}>
                                {item?.portfolio?.coin?.quote?.USD?.price &&
                                  parseFloat(
                                    item.portfolio.coin.quote.USD.price *
                                      item?.portfolio?.quantity
                                  ).toFixed(2)}
                              </td>
                              <td style={{ marginRight: "2rem" }}>
                                {item?.portfolio?.quantity &&
                                  item.portfolio.quantity}
                              </td>
                            </tr>
                          );
                        })}
                    </tr>
                  );
                })}
            </tbody>
          </table>
        )} */}
      </div>
    </div>
  );
};

export default MultiPlayerPortfoliocreation;
