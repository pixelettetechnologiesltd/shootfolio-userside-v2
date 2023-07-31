import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "../../Css/Game/Profile.css";
import Header from "../../Components/Header";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Settingtab from "../../Components/Settingtab";
import Plantab from "../../Components/Plantab";
const Profile = () => {
  return (
    <div>
      <Header />
      <Container className="setpaddingprofile">
        <Row>
          <Col md={6}>
            <p className="profilemainhead">My Account</p>
          </Col>
        </Row>
      </Container>
      <Container>
        <Row>
          <Col md={12}>
            <Tabs
              defaultActiveKey="settings"
              id="uncontrolled-tab-example"
              className="mb-3 tabstitle"
              variant="underline"
            >
              <Tab className="tabstabtypo" eventKey="settings" title="Settings">
                <Settingtab />
              </Tab>
              <Tab
                className="tabstabtypo"
                eventKey="plans"
                title="Subscription plans"
              >
                <Plantab />
              </Tab>
              <Tab className="tabstabtypo" eventKey="history" title="History">
                Tab content for Profile
              </Tab>
            </Tabs>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Profile;
