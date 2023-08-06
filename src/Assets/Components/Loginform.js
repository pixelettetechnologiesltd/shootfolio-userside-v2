import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "../Css/Loginform.css";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { signinSchema } from "./../../Schemas";
import { useDispatch, useSelector } from "react-redux";
import { Signin } from "./../../store/actions";
import { Puff } from "react-loader-spinner";

const Loginform = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.authReducer);
  const { values, errors, handleBlur, handleChange, touched, handleSubmit } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: signinSchema,
      onSubmit: (values, action) => {
        dispatch(dispatch(Signin(values)));
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
            placeholder="Username"
            name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.email && touched.email ? (
            <p className="form-error custom-form-error">{errors.email}</p>
          ) : (
            ""
          )}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Control
            className="makefieldgightmore"
            type="password"
            placeholder="Password"
            name="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.password && touched.password ? (
            <p className="form-error custom-form-error">{errors.password}</p>
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
                "Sign in"
              )}
            </Button>
          </div>
          <div className="forgetbtn">
            <Link className="forgetbtnloginform" to="/forget">
              Reset Password?
            </Link>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default Loginform;
