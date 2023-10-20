import { authConstant } from "./../constants";
import {
  auth,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "./../../firebase";
import { signInWithPopup } from "firebase/auth";
import axios from "axios";

export const SaveSocialLoginDataIntoDb = (body) => {
  return async (dispatch) => {
    dispatch({ type: authConstant.USER_LOGIN_REQUEST });
    try {
      const token = sessionStorage.getItem("userToken");
      const result = await axios.post(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/v1/api/auth/social`,
        body,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );
      const { data } = result;
      sessionStorage.setItem("userToken", data.tokens.access.token);
      sessionStorage.setItem("userRefreshToken", data.tokens.refresh.token);
      sessionStorage.setItem("user", JSON.stringify(data.user));
      dispatch({
        type: authConstant.USER_LOGIN_SUCCESS,
        payload: "Login Successful",
      });
    } catch (error) {
      if (error.response.data.errors[0].code === 401) {
        sessionStorage.clear();
        dispatch({
          type: authConstant.SESSION_EXPIRE,
          payload: { err: "Session has expired" },
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

export const Signinwithgoogle = () => {
  return async (dispatch) => {
    dispatch({ type: authConstant.SIGNIN_WITH_GOOGLE_REQUEST });
    try {
      const result = await signInWithPopup(auth, GoogleAuthProvider);
      const { user } = result;
      const { displayName: fullName, email } = user;
      let userData = { userName: fullName, email, name: fullName };
      dispatch(SaveSocialLoginDataIntoDb(userData));
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
      let userData = { userName: fullName, email, name: fullName };
      dispatch(SaveSocialLoginDataIntoDb(userData));
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
      const token = sessionStorage.getItem("userToken");
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
      sessionStorage.setItem("userToken", data.tokens.access.token);
      sessionStorage.setItem("userRefreshToken", data.tokens.refresh.token);
      sessionStorage.setItem("user", JSON.stringify(data.user));
      dispatch({
        type: authConstant.USER_LOGIN_SUCCESS,
        payload: "Login Successfully",
      });
    } catch (error) {
      if (error.response.data.errors[0].code === 401) {
        sessionStorage.clear();
        dispatch({
          type: authConstant.SESSION_EXPIRE,
          payload: { err: "Session has expired" },
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
      const token = sessionStorage.getItem("userToken");
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
      // sessionStorage.setItem("userToken", data.tokens.access.token);
      // sessionStorage.setItem("userRefreshToken", data.tokens.refresh.token);
      // sessionStorage.setItem("user", JSON.stringify(data.user));
      dispatch({
        type: authConstant.USER_REGISTER_SUCCESS,
        payload: "Account created",
      });
    } catch (error) {
      if (error.response.data.errors[0].code === 401) {
        sessionStorage.clear();
        dispatch({
          type: authConstant.SESSION_EXPIRE,
          payload: { err: "Session has expired" },
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

export const AddPaymentCard = (body) => {
  return async (dispatch) => {
    dispatch({ type: authConstant.ADD_PAYMENT_CARD_REQUEST });
    try {
      const token = sessionStorage.getItem("userToken");
      await axios.post(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/v1/api/card`,
        body,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );
      dispatch({
        type: authConstant.ADD_PAYMENT_CARD_SUCCESS,
        payload: "Card created",
      });
    } catch (error) {
      if (error.response.data.errors[0].code === 401) {
        sessionStorage.clear();
        dispatch({
          type: authConstant.SESSION_EXPIRE,
          payload: { err: "Session has expired" },
        });
      } else {
        dispatch({
          type: authConstant.ADD_PAYMENT_CARD_FAILURE,
          payload: { err: error.response.data.errors[0].message },
        });
      }
    }
  };
};

export const GetUserGameHistory = () => {
  return async (dispatch) => {
    dispatch({ type: authConstant.GET_USER_GAME_HISTORY_REQUEST });
    try {
      const token = sessionStorage.getItem("userToken");
      const result = await axios.get(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/v1/api/games/user/history`,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );
      const { data } = result;
      dispatch({
        type: authConstant.GET_USER_GAME_HISTORY_SUCCESS,
        payload: data.results,
      });
    } catch (error) {
      if (error.response.data.errors[0].code === 401) {
        sessionStorage.clear();
        dispatch({
          type: authConstant.SESSION_EXPIRE,
          payload: { err: "Session has expired" },
        });
      } else {
        dispatch({
          type: authConstant.GET_USER_GAME_HISTORY_FAILURE,
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
      sessionStorage.clear();
      dispatch({
        type: authConstant.USER_LOGOUT_SUCCESS,
        payload: "Logout Successfully",
      });
    } catch (error) {
      if (error.response.data.code === 401) {
        sessionStorage.clear();
        dispatch({
          type: authConstant.SESSION_EXPIRE,
          payload: { err: "Session has expired" },
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

export const UpdteUser = (body, userId) => {
  return async (dispatch) => {
    dispatch({ type: authConstant.UPDATE_USER_REQUEST });
    try {
      const token = sessionStorage.getItem("userToken");
      const result = await axios.patch(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/v1/api/auth/${userId}`,
        body,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );
      const { data } = result;
      const user = JSON.parse(sessionStorage.getItem("user"));
      if (data.photoPath) {
        user.photoPath = data.photoPath;
      }
      if (data.name) {
        user.name = data.name;
      }
      sessionStorage.setItem("user", JSON.stringify(user));
      dispatch({
        type: authConstant.UPDATE_USER_SUCCESS,
        payload: "Profile updated",
      });
    } catch (error) {
      if (error.response.data.errors[0].code === 401) {
        sessionStorage.clear();
        dispatch({
          type: authConstant.SESSION_EXPIRE,
          payload: { err: "Session has expired" },
        });
      } else {
        dispatch({
          type: authConstant.UPDATE_USER_FAILURE,
          payload: { err: error.response.data.errors[0].message },
        });
      }
    }
  };
};

export const UpdtePassword = (body) => {
  return async (dispatch) => {
    dispatch({ type: authConstant.UPDATE_PASSWORD_REQUEST });
    try {
      const token = sessionStorage.getItem("userToken");
      await axios.post(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/v1/api/auth/change/password`,
        body,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );
      dispatch({
        type: authConstant.UPDATE_PASSWORD_SUCCESS,
        payload: "Password updated",
      });
    } catch (error) {
      if (error.response.data.errors[0].code === 401) {
        sessionStorage.clear();
        dispatch({
          type: authConstant.SESSION_EXPIRE,
          payload: { err: "Session has expired" },
        });
      } else {
        dispatch({
          type: authConstant.UPDATE_PASSWORD_FAILURE,
          payload: { err: error.response.data.errors[0].message },
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
