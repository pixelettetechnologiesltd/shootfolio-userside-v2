import { React, useState } from "react";
import { Container, Row, Col, Image, Button, FormGroup } from "react-bootstrap";
import "../../Css/Game/Portfoliocreation.css";
import Header from "../../Components/Header";
import { images } from "../../../Images";
import Popupselect from "../../Components/Popupselect";
import Form from "react-bootstrap/Form";
import "../../Css/Game/Payment.css";
import { useNavigate } from "react-router-dom";
const Portfoliocreation = () => {
  const navigate = useNavigate();
  const [buttonPopup, setButtonPopup] = useState(false);
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
                />
              </FormGroup>
              <div className="makepopformbutcenter">
                <Button className="selectpopupbutton">Select</Button>
              </div>
            </Form>
          </Popupselect>
          <Row>
            <Col md={4}></Col>
            <Col md={4} className="makeportcreatebuttoncenter">
              <Button
                className="portsaveandnext"
                onClick={() => navigate("/competeclub")}
              >
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
