import React from "react";
import Header from "../Components/Header";
import { Container, Row, Col } from "react-bootstrap";
import "../Css/Performance.css";
import Areachartcheck from "../Components/Areachartcheck";
import Footer from "../Components/Footer";
import Barchart from "../Components/Barchart";
import Piechart from "../Components/Piechart";
import Holdings from "../Components/Holdings";
const Performance = () => {
  return (
    <div className="pagebgcolorperblue">
      <Header />
      <div className="performanceherobg">
        <Container>
          <Row>
            <Col md={2}></Col>
            <Col md={8}>
              <p className="performanceherohead">Portfolio Performance</p>
              <p className="performancedeschero">
              Discover the true potential of your investments with Shootfolio's Portfolio Performance page. Track your returns, analyze asset allocation, and optimize your portfolio strategy for maximum growth.
              </p>
            </Col>
            <Col md={2}></Col>
          </Row>
        </Container>
      </div>
      <Container className="marg-top-portfolio100">
        <Row>
          <Col md={3}>
            <div className="perbuttincolflex"> 
              <button className="chartleftbutton">Day</button>
              <button className="chartleftbutton">Week</button>
              <button className="chartleftbutton">Month</button>
            </div>
          </Col>
          <Col md={9}>
            <p className="chartupheadportf">Summary</p>
            <p className="chartprtuphead">
              Up maids me an ample stood given. Certainty say suffering his him
              collected intention promotion. Hill sold ham men made lose case.
              Views abode law heard jokes too. Was are delightful solicitude
              discovered collecting man day. Resolving neglected sir tolerably
              but existence conveying for. Day his put off unaffected literature
              partiality inhabiting.
            </p>
            <Areachartcheck />
          </Col>
        </Row>
      </Container>
      <Container className="marg-top-portfolio100">
        <Row>
          <Col md={3}>
            <div>
              <button className="chartleftbutton">Graphical Representation</button>
              <button className="chartleftbutton">Lorem ipsum</button>
              <button className="chartleftbutton">Lorem ipsum</button>
            </div>
          </Col>
          <Col md={9}>
            <Barchart />
          </Col>
        </Row>
      </Container>
      <Container className="marg-top-portfolio100">
        <Row>
          <Col md={2}></Col>
          <Col md={8}>
            <p className="chartupheadportfcent">Portfolio Allocation</p>
            <p className="chartprtupheadcent">
              Up maids me an ample stood given. Certainty say suffering his him
              collected intention promotion. Hill sold ham men made lose case.
              Views abode law heard jokes too. Was are delightful solicitude
              discovered collecting man day. Resolving neglected sir tolerably
              but existence conveying for. Day his put off unaffected literature
              partiality inhabiting.
            </p>
            <Piechart/>
          </Col>
          <Col md={2}></Col>
        </Row>
      </Container>
      <Container className="marg-top-portfolio100">
        <Row>
          <Col md={1}></Col>
          <Col md={10}>
            <p className="chartupheadportfcent">Top Holdings</p>
            <p className="chartprtupheadcent padlrhold">
            Up maids me an ample stood given. Certainty say suffering his him collected intention promotion. Hill sold ham men made lose case. Views abode law heard jokes too. Was are delightful solicitude discovered collecting man day.
            </p>
            <Holdings/>
          </Col>
          <Col md={1}></Col>
        </Row>
      </Container>
      <Container className="marg-top-portfolio100 mb-5">
        <Row>
          <Col md={3}>
            <div className="perbuttincolflex"> 
              <button className="chartleftbutton">Best</button>
              <button className="chartleftbutton">Worst</button>
            </div>
          </Col>
          <Col md={9}>
            <p className="chartupheadportf">Summary</p>
            <p className="chartprtuphead">
              Up maids me an ample stood given. Certainty say suffering his him
              collected intention promotion. Hill sold ham men made lose case.
              Views abode law heard jokes too. Was are delightful solicitude
              discovered collecting man day. Resolving neglected sir tolerably
              but existence conveying for. Day his put off unaffected literature
              partiality inhabiting.
            </p>
            <Areachartcheck />
          </Col>
        </Row>
      </Container>
      <Footer/>
    </div>
  );
};

export default Performance;
