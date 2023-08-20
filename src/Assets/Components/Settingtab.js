import React, { useRef, useEffect } from "react";
import { useState } from "react";
import "../Css/Game/Settingtab.css";
import { images } from "../../Images";
import InputGroup from "react-bootstrap/InputGroup";
import { Container, Row, Col, Image, Button } from "react-bootstrap";
import { BiEdit } from "react-icons/bi";
import Form from "react-bootstrap/Form";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { UpdteUser, clearErrors, clearMessages } from "./../../store/actions";
import { Puff } from "react-loader-spinner";

const Settingtab = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    errors: error,
    message,
    sessionExpireError,
    loading,
  } = useSelector((state) => state.authReducer);
  const [validated, setValidated] = useState(false);
  const [image, setImage] = useState();
  const user = JSON.parse(sessionStorage.getItem("user"));
  const [userUpdatedImage, setUserUpdatedImage] = useState("");
  const [userUpdatedName, setUserUpdatedName] = useState(
    user?.name && user?.name
  );
  const imageRef = useRef();

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setUserUpdatedImage(event.target.files[0]);
      setImage(URL.createObjectURL(img));
    }
  };

  const handleUpdate = () => {
    const result = new FormData();
    if (userUpdatedImage) {
      result.append("photoPath", userUpdatedImage);
    }
    if (userUpdatedName) {
      result.append("name", userUpdatedName);
    }
    result.append("email", user?.email);
    dispatch(UpdteUser(result, user?.id));
  };
  return (
    <div>
      <Container className="mt-5 mb-5">
        <Row>
          <Col md={3}>
            <div className="makeprofilepicandtextcent">
              {image ? (
                <Image src={image} width="100px" />
              ) : (
                <Image crossOrigin="true" src={user?.photoPath} width="100px" />
              )}
              <div className="setmargin-left">
                <p className="profilename mt-4">{user?.name && user?.name}</p>
                <p className="changeimagevuttonpro">
                  change image{" "}
                  <span
                    className="editiconprofile"
                    style={{ cursor: "pointer" }}
                  >
                    <BiEdit onClick={() => imageRef.current.click()} />
                  </span>
                </p>
                <div style={{ display: "none" }}>
                  <input
                    type="file"
                    name="myImage"
                    ref={imageRef}
                    accept="image/jpeg, image/jpg,image/png"
                    onChange={onImageChange}
                  />
                </div>
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
                  value={userUpdatedName}
                  onChange={(e) => setUserUpdatedName(e.target.value)}
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
                  Current Password
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
            <Button
              className="savechangesprofiletab"
              type="submit"
              onClick={() => handleUpdate()}
              disabled={loading ? true : false}
            >
              {loading ? (
                <Puff
                  height="20"
                  width="30"
                  radius="6"
                  color="white"
                  ariaLabel="loading"
                  wrapperStyle
                  wrapperClass
                />
              ) : (
                "Save Changes"
              )}
            </Button>
          </Form>
        </Row>
      </Container>
    </div>
  );
};

export default Settingtab;
