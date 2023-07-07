import React from "react";
import Form from "react-bootstrap/Form";
import {Button} from "react-bootstrap"
import "../Css/Loginform.css";
const Signupform = () => {
  return (
    <div>
      <Form className="mt-5">
        <Form.Group className="mb-3 " controlId="formBasicText">
          <Form.Control
            className="makefieldgightmore"
            type="text"
            placeholder=" Name"
          />
        </Form.Group>
        <Form.Group className="mb-3 " controlId="formBasicText">
          <Form.Control
            className="makefieldgightmore"
            type="text"
            placeholder="User Name"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Control
            className="makefieldgightmore"
            type="password"
            placeholder="Password"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Control
            className="makefieldgightmore"
            type="password"
            placeholder="Confirm Password"
          />
        </Form.Group>

        <div className="makesignupbtncenter">
          <Button href="/signin" className="formsubmitbutton" type="submit">
            Submit
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default Signupform;
