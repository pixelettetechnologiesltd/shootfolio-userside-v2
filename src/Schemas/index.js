import * as Yup from "yup";

export const signinSchema = Yup.object({
  email: Yup.string().email().required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Your password is too short."),
});

export const signupSchema = Yup.object({
  userName: Yup.string().required("User Name is required"),
  name: Yup.string().required("Name is required"),
  email: Yup.string().email().required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Your password is too short."),
});
