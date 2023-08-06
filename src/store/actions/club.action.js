import { authConstant, clubConstant } from "./../constants";
import axios from "axios";

export const GetAllClub = (page) => {
  return async (dispatch) => {
    dispatch({ type: clubConstant.GET_CLUB_REQUEST });
    try {
      const token = localStorage.getItem("userToken");
      const result = await axios.get(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/v1/api/gameclubs?page=${page}&limit=5`,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );
      const { data } = result;
      dispatch({
        type: clubConstant.GET_CLUB_SUCCESS,
        payload: {
          results: data.results,
          page: data.page,
          totalPages: data.totalPages,
        },
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
          type: clubConstant.GET_CLUB_FAILURE,
          payload: { err: error.response.data.errors[0].message },
        });
      }
    }
  };
};

export const GetAllCoin = (page) => {
  return async (dispatch) => {
    dispatch({ type: clubConstant.GET_COIN_REQUEST });
    try {
      const token = localStorage.getItem("userToken");
      let result;
      if (page) {
        result = await axios.get(
          `${process.env.REACT_APP_BACKEND_BASE_URL}/v1/api/coins?page=${page}&limit=10`,
          {
            headers: {
              Authorization: token ? `Bearer ${token}` : "",
            },
          }
        );
      } else {
        result = await axios.get(
          `${process.env.REACT_APP_BACKEND_BASE_URL}/v1/api/coins?limit=300`,
          {
            headers: {
              Authorization: token ? `Bearer ${token}` : "",
            },
          }
        );
      }
      const { data } = result;
      dispatch({
        type: clubConstant.GET_COIN_SUCCESS,
        payload: {
          results: data.results,
          page: data.page,
          totalPages: data.totalPages,
        },
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
          type: clubConstant.GET_COIN_FAILURE,
          payload: { err: error.response.data.errors[0].message },
        });
      }
    }
  };
};

export const GetCompeteClub = (clubId) => {
  return async (dispatch) => {
    dispatch({ type: clubConstant.GET_CLUB_REQUEST });
    try {
      const token = localStorage.getItem("userToken");
      const result = await axios.get(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/v1/api/gameclubs`,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );
      const { data } = result;
      dispatch({
        type: clubConstant.GET_CLUB_SUCCESS,
        payload: {
          results: data.results,
          page: data.page,
          totalPages: data.totalPages,
        },
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
          type: clubConstant.GET_CLUB_FAILURE,
          payload: { err: error.response.data.errors[0].message },
        });
      }
    }
  };
};

export const CreateGame = (body) => {
  return async (dispatch) => {
    dispatch({ type: clubConstant.CREATE_GAME_REQUEST });
    try {
      const token = localStorage.getItem("userToken");
      const result = await axios.post(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/v1/api/games`,
        body,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );
      const { data } = result;
      dispatch({
        type: clubConstant.CREATE_GAME_DATA_SUCCESS,
        payload: data,
      });
      dispatch({
        type: clubConstant.CREATE_GAME_SUCCESS,
        payload: "Game has been created",
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
          type: clubConstant.CREATE_GAME_FAILURE,
          payload: { err: error.response.data.errors[0].message },
        });
      }
    }
  };
};

export const GetSingleGame = (gameId) => {
  return async (dispatch) => {
    dispatch({ type: clubConstant.GET_SINGLE_GAME_REQUEST });
    try {
      const token = localStorage.getItem("userToken");
      const result = await axios.get(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/v1/api/games/${gameId}`,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );
      const { data } = result;
      dispatch({
        type: clubConstant.GET_SINGLE_GAME_SUCCESS,
        payload: data,
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
          type: clubConstant.GET_SINGLE_GAME_FAILURE,
          payload: { err: error.response.data.errors[0].message },
        });
      }
    }
  };
};

export const SellCoin = (body) => {
  return async (dispatch) => {
    dispatch({ type: clubConstant.SELL_COIN_REQUEST });
    try {
      const token = localStorage.getItem("userToken");
      await axios.post(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/v1/api/games/sell/`,
        body,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );
      dispatch(GetSingleGame(body.id));
      dispatch({
        type: clubConstant.SELL_COIN_SUCCESS,
        payload: "Coin has been selled",
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
          type: clubConstant.SELL_COIN_FAILURE,
          payload: { err: error.response.data.errors[0].message },
        });
      }
    }
  };
};

export const BuyCoin = (body) => {
  return async (dispatch) => {
    dispatch({ type: clubConstant.BUY_COIN_REQUEST });
    try {
      const token = localStorage.getItem("userToken");
      await axios.post(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/v1/api/games/buy`,
        body,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );
      dispatch(GetSingleGame(body.id));
      dispatch({
        type: clubConstant.BUY_COIN_SUCCESS,
        payload: "Coin has been buyed",
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
          type: clubConstant.BUY_COIN_FAILURE,
          payload: { err: error.response.data.errors[0].message },
        });
      }
    }
  };
};

export const UpdateCoin = (body) => {
  return async (dispatch) => {
    dispatch({ type: clubConstant.UPDTE_COIN_REQUEST });
    try {
      const token = localStorage.getItem("userToken");
      await axios.post(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/v1/api/games/change/coin`,
        body,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );
      dispatch(GetSingleGame(body.id));
      dispatch({
        type: clubConstant.UPDTE_COIN_SUCCESS,
        payload: "Coin has been updated",
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
          type: clubConstant.UPDTE_COIN_FAILURE,
          payload: { err: error.response.data.errors[0].message },
        });
      }
    }
  };
};
