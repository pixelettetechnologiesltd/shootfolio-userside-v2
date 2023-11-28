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
      console.log("data is after shoot", data);
      dispatch({
        type: multiPlayerConstant.POST_SHOOT_BALL_SUCCESS,
        payload: data?.message ?? "Successful shot, and the quiz question appeared for the goalkeeper.",
      });
      dispatch({
        type: multiPlayerConstant.ADD_GAME_AFTER_QUIZ_SUCCESS,
        payload: data,
      });
      dispatch(GetSingleGame(body?.gameId));
    } catch (error) {
      if (error.response.data.code === 401) {
        sessionStorage.clear();
        dispatch({
          type: authConstant.SESSION_EXPIRE,
          payload: { err: "Session has expired" },
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
        payload: data?.message ?? "Ball passed",
      });

      dispatch(GetSingleGame(body?.gameId));
    } catch (error) {
      if (error.response.data.code === 401) {
        sessionStorage.clear();
        dispatch({
          type: authConstant.SESSION_EXPIRE,
          payload: { err: "Session has expired" },
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
        `${process.env.REACT_APP_BACKEND_BASE_URL}/v1/api/games/tackle/opponent`,
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
        payload: data?.message ?? "Ball tackled",
      });

      dispatch(GetSingleGame(body?.gameId));
    } catch (error) {
      if (error.response.data.code === 401) {
        sessionStorage.clear();
        dispatch({
          type: authConstant.SESSION_EXPIRE,
          payload: { err: "Session has expired" },
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
