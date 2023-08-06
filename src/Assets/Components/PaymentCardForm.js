import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {Row, Col} from "react-bootstrap"
import "../Css/Loginform.css";
import { useFormik } from "formik";
import { addPaymentCardSchema } from "./../../Schemas";
import { useDispatch, useSelector } from "react-redux";
import { AddPaymentCard } from "./../../store/actions";
import { Puff } from "react-loader-spinner";

const PaymentCardForm = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.authReducer);
  const { values, errors, handleBlur, handleChange, touched, handleSubmit } =
    useFormik({
      initialValues: {
        name: "",
        number: "",
        exp_month: "",
        exp_year: "",
        cvc: "",
      },
      validationSchema: addPaymentCardSchema,
      onSubmit: (values, action) => {
        dispatch(dispatch(AddPaymentCard(values)));
        action.resetForm();
      },
    });

  return (
    <div>
      <Form className="mt-5" onSubmit={handleSubmit}>
        <Form.Group className="mb-3 " controlId="formBasicText">
          <Form.Control
            className="makefieldgightmore"
            type="text"
            placeholder="Name on card"
            name="name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.name && touched.name ? (
            <p className="form-error custom-form-error">{errors.name}</p>
          ) : (
            ""
          )}
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Control
            className="makefieldgightmore"
            type="text"
            placeholder="Card Number"
            name="number"
            value={values.number}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.number && touched.number ? (
            <p className="form-error custom-form-error">{errors.number}</p>
          ) : (
            ""
          )}
        </Form.Group>
        <Row>
          <Col md={6}>
          <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Control
            className="makefieldgightmore"
            type="text"
            placeholder="Expire month"
            name="exp_month"
            value={values.exp_month}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.exp_month && touched.exp_month ? (
            <p className="form-error custom-form-error">{errors.exp_month}</p>
          ) : (
            ""
          )}
        </Form.Group>
          </Col>
          <Col md={6}>
          <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Control
            className="makefieldgightmore"
            type="text"
            placeholder="Expire year"
            name="exp_year"
            value={values.exp_year}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.exp_year && touched.exp_year ? (
            <p className="form-error custom-form-error">{errors.exp_year}</p>
          ) : (
            ""
          )}
        </Form.Group>
          </Col>
        </Row>
       
       
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Control
            className="makefieldgightmore"
            type="text"
            placeholder="CVV"
            name="cvc"
            value={values.cvc}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.cvc && touched.cvc ? (
            <p className="form-error custom-form-error">{errors.cvc}</p>
          ) : (
            ""
          )}
        </Form.Group>
        <div className="makebtnsinrow">
          <div className="submitbtn">
            <Button className="formsubmitbutton" type="submit">
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
                "Save Card"
              )}
            </Button>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default PaymentCardForm;
