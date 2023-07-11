import { authConstant } from "./../constants";
import {
  auth,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "./../../firebase";
import { signInWithPopup } from "firebase/auth";
import axios from "axios";

export const Signinwithgoogle = () => {
  return async (dispatch) => {
    dispatch({ type: authConstant.SIGNIN_WITH_GOOGLE_REQUEST });
    try {
      const result = await signInWithPopup(auth, GoogleAuthProvider);
      const { user } = result;
      const { displayName: fullName, email, photoURL, accessToken } = user;
      let userData = { userName: fullName, email, photoURL };
      localStorage.setItem("userToken", accessToken);
      localStorage.setItem("user", JSON.stringify(userData));
      dispatch({
        type: authConstant.SIGNIN_WITH_GOOGLE_SUCCESS,
        payload: "Login Successfully",
      });
    } catch (error) {
      dispatch({
        type: authConstant.SIGNIN_WITH_GOOGLE_FAILURE,
        payload: { err: "Something went wrong. Please try again!" },
      });
    }
  };
};

export const SigninwithFacebook = () => {
  return async (dispatch) => {
    dispatch({ type: authConstant.SIGNIN_WITH_FACEBOOK_REQUEST });
    try {
      const result = await signInWithPopup(auth, FacebookAuthProvider);
      const { user } = result;
      const { displayName: fullName, email, photoURL, accessToken } = user;
      let userData = { userName: fullName, email, photoURL };
      localStorage.setItem("userToken", accessToken);
      localStorage.setItem("user", JSON.stringify(userData));
      dispatch({
        type: authConstant.SIGNIN_WITH_FACEBOOK_SUCCESS,
        payload: "Login Successfully",
      });
    } catch (error) {
      dispatch({
        type: authConstant.SIGNIN_WITH_FACEBOOK_FAILURE,
        payload: { err: "Something went wrong. Please try again!" },
      });
    }
  };
};

export const Signin = (body) => {
  return async (dispatch) => {
    dispatch({ type: authConstant.USER_LOGIN_REQUEST });
    try {
      const token = localStorage.getItem("userToken");
      const result = await axios.post(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/v1/api/auth/login`,
        body,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );
      const { data } = result;
      localStorage.setItem("userToken", data.tokens.access.token);
      localStorage.setItem("userRefreshToken", data.tokens.refresh.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      dispatch({
        type: authConstant.USER_LOGIN_SUCCESS,
        payload: "Login Successfully",
      });
    } catch (error) {
      if (error.response.data.errors[0].code === 401) {
        localStorage.clear();
        dispatch({
          type: authConstant.SESSION_EXPIRE,
          payload: { err: "Session has been expired" },
        });
      } else {
        dispatch({
          type: authConstant.USER_LOGIN_FAILURE,
          payload: { err: error.response.data.errors[0].message },
        });
      }
    }
  };
};

export const Signup = (body) => {
  return async (dispatch) => {
    dispatch({ type: authConstant.USER_REGISTER_REQUEST });
    try {
      const token = localStorage.getItem("userToken");
      const result = await axios.post(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/v1/api/auth/register`,
        body,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );
      const { data } = result;
      localStorage.setItem("userToken", data.tokens.access.token);
      localStorage.setItem("userRefreshToken", data.tokens.refresh.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      dispatch({
        type: authConstant.USER_REGISTER_SUCCESS,
        payload: "Account has been created",
      });
    } catch (error) {
      if (error.response.data.errors[0].code === 401) {
        localStorage.clear();
        dispatch({
          type: authConstant.SESSION_EXPIRE,
          payload: { err: "Session has been expired" },
        });
      } else {
        dispatch({
          type: authConstant.USER_REGISTER_FAILURE,
          payload: { err: error.response.data.errors[0].message },
        });
      }
    }
  };
};

export const logOut = () => {
  return async (dispatch) => {
    dispatch({ type: authConstant.USER_LOGOUT_REQUEST });
    try {
      localStorage.clear();
      dispatch({
        type: authConstant.USER_LOGOUT_SUCCESS,
        payload: "Logout Successfully",
      });
    } catch (error) {
      if (error.response.data.code === 401) {
        localStorage.clear();
        dispatch({
          type: authConstant.SESSION_EXPIRE,
          payload: { err: "Session has been expired" },
        });
      } else {
        dispatch({
          type: authConstant.USER_LOGOUT_FAILURE,
          payload: { err: error.response.data.message },
        });
      }
    }
  };
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: authConstant.CLEAR_ERRORS });
};

// Clearing Messages
export const clearMessages = () => async (dispatch) => {
  dispatch({ type: authConstant.CLEAR_MESSAGES });
};
