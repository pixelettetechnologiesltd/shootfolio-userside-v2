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
  const [challengerProtfolios, setChallengerProtfolios] = useState([]);
  const [portfolio, setPortfolio] = useState("");
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

  const handlePortfolioSelect = () => {
    setChallengerProtfolios([
      ...challengerProtfolios,
      { portfolio, quantity: Number(quantity) },
    ]);
    setButtonPopup(false);
  };

  const handleSave = () => {
    if (challengerProtfolios.length <= 0) {
      toast.error("Portfolio is required");
    } else {
      navigate("/competeclub", {
        state: {
          leauge: state.league,
          gameMode: state.gameMode,
          rivalClub: id,
          challengerProtfolios,
        },
      });
    }
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
                  onClick={() => setButtonPopup(true)}
                >
                  <p className="playernameportfolio">David</p>
                  <Image src={images.playerone} width="100%" />
                </button>
              </Col>
              <Col md={2} xs={12} className="playerportbackground">
                <button
                  className="popupburronbgremove"
                  onClick={() => setButtonPopup(true)}
                >
                  <p className="playernameportfolio">john</p>
                  <Image src={images.playertwo} width="100%" />
                </button>
              </Col>
              <Col md={2} xs={12} className="playerportbackground">
                <button
                  className="popupburronbgremove"
                  onClick={() => setButtonPopup(true)}
                >
                  <p className="playernameportfolio">Marcus</p>
                  <Image src={images.playerthree} width="100%" />
                </button>
              </Col>
              <Col md={2} xs={12} className="playerportbackground">
                <button
                  className="popupburronbgremove"
                  onClick={() => setButtonPopup(true)}
                >
                  <p className="playernameportfolio">Jack</p>
                  <Image src={images.playerfour} width="100%" />
                </button>
              </Col>
              <Col md={2} xs={12} className="playerportbackground">
                <button
                  className="popupburronbgremove"
                  onClick={() => setButtonPopup(true)}
                >
                  <p className="playernameportfolio">Nick</p>
                  <Image src={images.playerfive} width="100%" />
                </button>
              </Col>
            </Col>
            <Col md={1}></Col>
          </Row>
          <Popupselect trigger={buttonPopup} setTrigger={setButtonPopup}>
            <Form>
              <Form.Group>
                <Form.Label className="selectamountlablel mt-4">
                  Select a coin type for each football player
                </Form.Label>
                <Form.Select
                  className="selectcoinselect"
                  aria-label="Select coin"
                  value={portfolio}
                  onChange={(e) => setPortfolio(e.target.value)}
                >
                  {coin.length > 0 ? (
                    coin.map((item, ind) => {
                      return (
                        <option key={ind} value={item._id}>
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
          </Popupselect>
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
      </div>
    </div>
  );
};

export default Portfoliocreation;
