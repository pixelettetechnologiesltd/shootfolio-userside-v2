import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "../../Css/Game/Profile.css";
import Header from "../../Components/Header";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Settingtab from "../../Components/Settingtab";
import Plantab from "../../Components/Plantab";
import Stripe from "../Stripe";
import PortfolioHistory from "../../Components/PortfolioHistory";
import { useNavigate } from "react-router-dom";
const Profile = () => {
  const user = sessionStorage.getItem("user");
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/signin");
    }
  }, [user]);

  return (
    <div>
      <Header />
      <Container className="setpaddingprofile">
        {/* <Row>
          <Col md={6}>
            <p className="profilemainhead">My Account</p>
          </Col>
        </Row> */}
      </Container>
      <Container>
        <Row>
          <Col md={12}>
            <Tabs
              defaultActiveKey="history"
              id="uncontrolled-tab-example"
              className="mb-3 tabstitle"
              variant="underline"
            >
              <Tab className="tabstabtypo" eventKey="history" title="Portfolio">
                <PortfolioHistory />
              </Tab>
              <Tab className="tabstabtypo" eventKey="settings" title="Settings">
                <Settingtab />
              </Tab>
              <Tab
                className="tabstabtypo"
                eventKey="plans"
                title="Choose a Subscription plan"
              >
                <Plantab />
              </Tab>
              <Tab
                className="tabstabtypo"
                eventKey="payment"
                title="Manage Payment"
              >
                <Stripe />
              </Tab>
            </Tabs>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Profile;
