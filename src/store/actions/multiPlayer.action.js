import axios from "axios";
import { authConstant, multiPlayerConstant } from "../constants";
import { GetSingleGame } from "./club.action";

export const postShootBall = (
  body = {
    gameId: "",
    player: "",
  }
) => {
  return async (dispatch) => {
    dispatch({
      type: multiPlayerConstant.POST_SHOOT_BALL_REQUEST,
    });
    try {
      const token = sessionStorage.getItem("userToken");
      const result = await axios.post(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/v1/api/games/shoot/opponent`,
        body,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );
      const { data } = result;
      dispatch({
        type: multiPlayerConstant.POST_SHOOT_BALL_SUCCESS,
        payload: data?.message ?? "Shooted the ball",
      });

      dispatch(GetSingleGame(body?.gameId));
    } catch (error) {
      if (error.response.data.code === 401) {
        sessionStorage.clear();
        dispatch({
          type: authConstant.SESSION_EXPIRE,
          payload: { err: "Session has been expired" },
        });
      } else {
        dispatch({
          type: multiPlayerConstant.POST_SHOOT_BALL_FAILURE,
          payload: { err: error.response.data.errors[0].message },
        });
      }
    }
  };
};

export const postPassBall = (
  body = {
    gameId: "",
    portfolio: "",
    player: "",
  }
) => {
  return async (dispatch) => {
    dispatch({
      type: multiPlayerConstant.POST_PASS_BALL_REQUEST,
    });
    try {
      const token = sessionStorage.getItem("userToken");
      const result = await axios.post(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/v1/api/games/pass/ball`,
        body,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );
      const { data } = result;
      dispatch({
        type: multiPlayerConstant.POST_PASS_BALL_SUCCESS,
        payload: data?.message ?? "Passed the ball",
      });

      dispatch(GetSingleGame(body?.gameId));
    } catch (error) {
      if (error.response.data.code === 401) {
        sessionStorage.clear();
        dispatch({
          type: authConstant.SESSION_EXPIRE,
          payload: { err: "Session has been expired" },
        });
      } else {
        dispatch({
          type: multiPlayerConstant.POST_PASS_BALL_FAILURE,
          payload: { err: error.response.data.errors[0].message },
        });
      }
    }
  };
};

export const postTackleBall = (
  body = {
    gameId: "",
    player: "",
  }
) => {
  return async (dispatch) => {
    dispatch({
      type: multiPlayerConstant.POST_TACKLE_BALL_REQUEST,
    });
    try {
      const token = sessionStorage.getItem("userToken");
      const result = await axios.post(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/v1/api/games/shoot/opponent`,
        body,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );
      const { data } = result;
      dispatch({
        type: multiPlayerConstant.POST_TACKLE_BALL_SUCCESS,
        payload: data?.message ?? "Tackled the ball",
      });

      dispatch(GetSingleGame(body?.gameId));
    } catch (error) {
      if (error.response.data.code === 401) {
        sessionStorage.clear();
        dispatch({
          type: authConstant.SESSION_EXPIRE,
          payload: { err: "Session has been expired" },
        });
      } else {
        dispatch({
          type: multiPlayerConstant.POST_TACKLE_BALL_FAILURE,
          payload: { err: error.response.data.errors[0].message },
        });
      }
    }
  };
};
