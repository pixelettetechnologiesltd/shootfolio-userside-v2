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

export const addPaymentCardSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  number: Yup.string().required("Number is required"),
  exp_month: Yup.number().required("Expire month is required"),
  exp_year: Yup.number().required("Expire year is required"),
  cvc: Yup.string().required("Cvc is required"),
});

export const updatePasswordSchema = Yup.object({
  oldPassword: Yup.string()
    .required("Current Password is required")
    .min(8, "Your current password is too short."),
  newPassword: Yup.string()
    .required("New Password is required")
    .min(8, "Your new password is too short."),
  confrimPassword: Yup.string()
    .required("New Password is required")
    .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
    .min(8, "Your confrim password is too short."),
});

export const addCryptoPaymentSchema = Yup.object({
  subscription: Yup.string().required("Subscription is required"),
  paymentMethod: Yup.string().required("Payment Method is required"),
  transactionHash: Yup.string().required("Transaction Hash is required"),
});
