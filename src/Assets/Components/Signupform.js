import React from "react";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import "../Css/Loginform.css";
import { useFormik } from "formik";
import { signupSchema } from "./../../Schemas";
import { useDispatch, useSelector } from "react-redux";
import { Signup } from "./../../store/actions";
import { Puff } from "react-loader-spinner";
const Signupform = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.authReducer);
  const { values, errors, handleBlur, handleChange, touched, handleSubmit } =
    useFormik({
      initialValues: {
        userName: "",
        name: "",
        email: "",
        password: "",
      },
      validationSchema: signupSchema,
      onSubmit: (values, action) => {
        dispatch(dispatch(Signup(values)));
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
            placeholder="Your complete name"
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
        <Form.Group className="mb-3 " controlId="formBasicText">
          <Form.Control
            className="makefieldgightmore"
            type="text"
            placeholder="Your unique username"
            name="userName"
            value={values.userName}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.userName && touched.userName ? (
            <p className="form-error custom-form-error">{errors.userName}</p>
          ) : (
            ""
          )}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Control
            className="makefieldgightmore"
            type="email"
            placeholder="Your email address"
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
            placeholder="Your password (8 characters minimum)"
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

        <div className="makesignupbtncenter">
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
              "Submit"
            )}
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default Signupform;
