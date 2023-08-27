import React, { useEffect } from "react";
import { images } from "../../Images";
import {
  Container,
  Row,
  Col,
  Image,
  Button,
  FormGroup,
  FormLabel,
  FormControl,
} from "react-bootstrap";
import "../Css/Game/CryptoPaymentTab.css";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  GetAllSubscriptionPlan,
  AddCryptoPayment,
} from "./../../store/actions";
import { useFormik } from "formik";
import { addCryptoPaymentSchema } from "./../../Schemas";
import { Puff } from "react-loader-spinner";

const CryptoPaymentTab = () => {
  const dispatch = useDispatch();
  const { subscriptionPlans, loading, message } = useSelector(
    (state) => state.subscriptionReducer
  );

  const {
    values,
    errors,
    handleBlur,
    handleChange,
    touched,
    handleSubmit,
    resetForm,
  } = useFormik({
    initialValues: {
      subscription: "",
      paymentMethod: "",
      transactionHash: "",
    },
    validationSchema: addCryptoPaymentSchema,
    onSubmit: (values, action) => {
      dispatch(dispatch(AddCryptoPayment(values)));
      action.resetForm();
    },
  });

  useEffect(() => {
    if (message !== "") {
      resetForm();
    }
  }, [message]);

  useEffect(() => {
    dispatch(GetAllSubscriptionPlan(1));
  }, []);
  return (
    <div>
      <Container>
        <Row className="mt-5 mb-5">
          <Col md={6} className="makeqrimagealigncent">
            <Image src={images.qr} />
            <p className="scanqrhead">Scan QR</p>
          </Col>
          <Col md={6} className="makepaddingintoformdivpayment">
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <FormLabel className="cryptoformhead">
                  Select Subscription <span style={{ color: "red" }}>*</span>
                </FormLabel>
              </FormGroup>
              {subscriptionPlans.length > 0 &&
                subscriptionPlans.map((data, ind) => {
                  return (
                    <label class="radio-button" key={ind}>
                      <input
                        type="radio"
                        value={data?._id}
                        name="subscription"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <span class="radio"></span>
                      {data?.name && data.name}
                    </label>
                  );
                })}
              {errors.subscription && touched.subscription ? (
                <p className="form-error custom-form-error">
                  {errors.subscription}
                </p>
              ) : (
                ""
              )}
              <FormGroup className="mt-4">
                <Form.Label className="cryptoformhead mb-4">
                  Payment Method <span style={{ color: "red" }}>*</span>
                </Form.Label>
                <Form.Select
                  defaultValue="Choose..."
                  className="cryptopaymentselect"
                  name="paymentMethod"
                  value={values.paymentMethod}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  <option>Select Payment Method</option>
                  <option>Stripe</option>
                  <option>Bank Account</option>
                  <option>Metamsak</option>
                </Form.Select>
                {errors.paymentMethod && touched.paymentMethod ? (
                  <p className="form-error custom-form-error">
                    {errors.paymentMethod}
                  </p>
                ) : (
                  ""
                )}
              </FormGroup>
              <FormGroup className="mt-4">
                <Form.Label className="cryptoformhead mb-4">
                  Transaction Hash <span style={{ color: "red" }}>*</span>
                </Form.Label>
                <FormControl
                  className="cryptopaymentselect"
                  type="text"
                  placeholder="cbxn...xoncnc"
                  name="transactionHash"
                  value={values.transactionHash}
                  onChange={handleChange}
                  onBlur={handleBlur}
                ></FormControl>
                {errors.transactionHash && touched.transactionHash ? (
                  <p className="form-error custom-form-error">
                    {errors.transactionHash}
                  </p>
                ) : (
                  ""
                )}
              </FormGroup>
              <div className="makecryptopayformbuttonend">
                <Button
                  className="cryptopayformbutton"
                  type="submit"
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
                    "Submit"
                  )}
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default CryptoPaymentTab;
