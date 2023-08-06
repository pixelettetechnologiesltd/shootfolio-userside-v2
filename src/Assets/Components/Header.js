import React, { useEffect } from "react";
import { Row, Col, Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import "../Css/Header.css";
import Form from "react-bootstrap/Form";
import { BsSearch } from "react-icons/bs";
import Dropdown from "../Components/Dropdown";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, clearMessages } from "./../../store/actions";

function CollapsibleExample() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    errors: error,
    message,
    sessionExpireError,
  } = useSelector((state) => state.authReducer);

  useEffect(() => {
    if (error.length > 0) {
      // toast.error(error);
      dispatch(clearErrors());
    }
    if (sessionExpireError !== "") {
      toast.error(sessionExpireError);
      dispatch(clearErrors());
      setTimeout(() => navigate("/signin"), 1000);
    }
    if (message !== "") {
      // toast.success(message);
      dispatch(clearMessages());
      setTimeout(() => navigate("/signin"), 2000);
    }
  }, [error, message, sessionExpireError]);
  return (
    <div className="navbg">
      <Container>
        <Row className="justify">
          <Col md={3} xs={3}>
            <Link className="removelinefromlogo" to="/">
              <p className="logohead">Shootfolio</p>
            </Link>
          </Col>
          <Col md={5} xs={4} className="p-0">
            {/* <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-success">
                <span className="iconheaderform">
                  <BsSearch />
                </span>
              </Button>
            </Form> */}
          </Col>
          <Col md={3} xs={4} className="vertalign">
            <Dropdown />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default CollapsibleExample;
