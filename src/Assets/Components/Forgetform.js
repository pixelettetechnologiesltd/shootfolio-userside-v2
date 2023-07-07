import React from "react";
import Form from "react-bootstrap/Form";
import "../Css/Loginform.css";
const Signupform = () => {
  return (
    <div>
      <Form className="mt-5">
        <Form.Group className="mb-3 " controlId="formBasicEmail">
          <Form.Control
            className="makefieldgightmore"
            type="text"
            placeholder="Enter your email"
          />
        </Form.Group>

        <div className="makesignupbtncenter">
          <button className="formsubmitbutton" type="submit">
            Submit
          </button>
        </div>
      </Form>
    </div>
  );
};

export default Signupform;
