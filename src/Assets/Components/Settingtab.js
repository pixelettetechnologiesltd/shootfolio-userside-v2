import React from "react";
import { useState } from "react";
import "../Css/Game/Settingtab.css";
import { images } from "../../Images";
import InputGroup from "react-bootstrap/InputGroup";
import { Container, Row, Col, Image, Button } from "react-bootstrap";
import { BiEdit } from "react-icons/bi";
import Form from "react-bootstrap/Form";
const Settingtab = () => {
  const [validated, setValidated] = useState(false);
  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  const user = JSON.parse(sessionStorage.getItem("user"));
  return (
    <div>
      <Container className="mt-5 mb-5">
        <Row>
          <Col md={3}>
            <div className="makeprofilepicandtextcent">
              <Image src={images.david} width="100px" />
              <div className="setmargin-left">
                <p className="profilename mt-4">{user?.name && user?.name}</p>
                <p className="changeimagevuttonpro">
                  change image{" "}
                  <span className="editiconprofile">
                    <BiEdit />
                  </span>
                </p>
              </div>
            </div>
          </Col>
          <Col md={5}></Col>
        </Row>
        <Row>
          <Col md={12}>
            <p className="profilesubhead mt-5">General info</p>
          </Col>
        </Row>
        <Row>
          <Form>
            <Row className="mt-3">
              <Form.Group as={Col} md="4">
                <Form.Label className="tabprofilelable">
                  Your full name.
                </Form.Label>
                <Form.Control
                  className="tabprofileplaceholder"
                  required
                  type="text"
                  value={user?.name && user?.name}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} md="4">
                <Form.Label className="tabprofilelable">
                  Your email address
                </Form.Label>
                <InputGroup hasValidation>
                  <Form.Control
                    className="tabprofileplaceholder"
                    type="text"
                    value={user?.email && user.email}
                    aria-describedby="inputGroupPrepend"
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter your email.
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
            </Row>
            <Row>
              <Col md={12}>
                <p className="profilesubhead mt-5">Change Password</p>
              </Col>
            </Row>
            <Row className="mt-4">
              <Form.Group as={Col} md="4">
                <Form.Label className="tabprofilelable">
                  Your Password
                </Form.Label>
                <Form.Control
                  type="password"
                  value={user?.password && user.password}
                  className="tabprofileplaceholder"
                  disabled={true}
                />
              </Form.Group>
              {/* <Form.Group as={Col} md="4">
                <Form.Label className="tabprofilelable">User Name</Form.Label>
                <InputGroup hasValidation>
                  <Form.Control
                    className="tabprofileplaceholder"
                    type="text"
                    value={user?.userName && user.userName}
                    aria-describedby="inputGroupPrepend"
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please choose a username.
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group> */}
            </Row>
            {/* <Row className="mt-4">
              <Col md={12}>
                <p className="profilesubhead mt-5">Password</p>
              </Col>
            </Row> */}
            <Row className="mt-3">
              {/* <Form.Group as={Col} md="4">
                <Form.Label className="tabprofilelable">
                  Enter New Password
                </Form.Label>
                <Form.Control
                  type="password"
                  placeholder="*********"
                  className="tabprofileplaceholder"
                  required
                />
              </Form.Group> */}
            </Row>
            <Row className="mt-4">
              <Form.Group as={Col} md="4">
                <Form.Label className="tabprofilelable">
                  New Password
                </Form.Label>
                <Form.Control
                  type="password"
                  value={user?.password && user.password}
                  className="tabprofileplaceholder"
                  disabled={true}
                />
              </Form.Group>
              <Form.Group as={Col} md="4">
                <Form.Label className="tabprofilelable">
                  Confirm Password
                </Form.Label>
                <Form.Control
                  type="password"
                  value={user?.password && user.password}
                  className="tabprofileplaceholder"
                  disabled={true}
                />
              </Form.Group>
            </Row>
            <Button className="savechangesprofiletab" type="submit">
              Save Changes
            </Button>
          </Form>
        </Row>
      </Container>
    </div>
  );
};

export default Settingtab;
