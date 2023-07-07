import { Row, Col, Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import "../Css/Header.css";
import Form from "react-bootstrap/Form";
import { BsSearch } from "react-icons/bs";
import Dropdown from "../Components/Dropdown"

function CollapsibleExample() {
  return (
    <div className="navbg">
      <Container>
        <Row className="justify">
          <Col md={3} xs={3}>
            <a className="removelinefromlogo" href="/"><p className="logohead">Shootfolio</p></a>
          </Col>
          <Col md={5} xs={4} className="p-0">
            <Form className="d-flex">
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
            </Form>
          </Col>  
          <Col md={3} xs={4}  className="vertalign">
            <Dropdown/>
          </Col>
        </Row>
      </Container>

    </div>
  );
}

export default CollapsibleExample;
