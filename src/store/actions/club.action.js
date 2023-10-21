import { authConstant, clubConstant } from "./../constants";
import axios from "axios";

export const GetAllClub = (page, competeClub) => {
  return async (dispatch) => {
    dispatch({ type: clubConstant.GET_CLUB_REQUEST });
    let gameTypeId = "64f06541b0985e73b9ecd574";
    try {
      const token = sessionStorage.getItem("userToken");
      let result;
      if (competeClub) {
        result = await axios.get(
          `${process.env.REACT_APP_BACKEND_BASE_URL}/v1/api/gameclubs?gameTypeId=${gameTypeId}&status=true`,
          {
            headers: {
              Authorization: token ? `Bearer ${token}` : "",
            },
          }
        );
      } else {
        result = await axios.get(
          `${process.env.REACT_APP_BACKEND_BASE_URL}/v1/api/gameclubs?status=true`,
          {
            headers: {
              Authorization: token ? `Bearer ${token}` : "",
            },
          }
        );
      }
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
        sessionStorage.clear();
        dispatch({
          type: authConstant.SESSION_EXPIRE,
          payload: { err: "Session has expired" },
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

export const GetAllCompeteClub = () => {
  return async (dispatch) => {
    dispatch({ type: clubConstant.GET_CLUB_REQUEST });
    let gameTypeId = "64b06435f49c454fe0b9f83f";
    try {
      const token = sessionStorage.getItem("userToken");
      const result = await axios.get(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/v1/api/gameclubs/compete/clubs`,
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
        sessionStorage.clear();
        dispatch({
          type: authConstant.SESSION_EXPIRE,
          payload: { err: "Session has expired" },
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
      const token = sessionStorage.getItem("userToken");
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
        sessionStorage.clear();
        dispatch({
          type: authConstant.SESSION_EXPIRE,
          payload: { err: "Session has expired" },
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
      const token = sessionStorage.getItem("userToken");
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
        sessionStorage.clear();
        dispatch({
          type: authConstant.SESSION_EXPIRE,
          payload: { err: "Session has expired" },
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
      const token = sessionStorage.getItem("userToken");
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
        payload: "Game created",
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
          type: clubConstant.CREATE_GAME_FAILURE,
          payload: { err: error.response.data.errors[0].message },
        });
      }
    }
  };
};

export const GetSingleGame = (gameId, onSuccess, onError) => {
  return async (dispatch) => {
    dispatch({ type: clubConstant.GET_SINGLE_GAME_REQUEST });
    try {
      const token = sessionStorage.getItem("userToken");
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

      onSuccess && onSuccess();
    } catch (error) {
      if (error.response.data.code === 401) {
        sessionStorage.clear();
        dispatch({
          type: authConstant.SESSION_EXPIRE,
          payload: { err: "Session has expired" },
        });
      } else {
        dispatch({
          type: clubConstant.GET_SINGLE_GAME_FAILURE,
          payload: { err: error.response.data.errors[0].message },
        });
      }

      onError && onError();
    }
  };
};

export const SellCoin = (body) => {
  return async (dispatch) => {
    dispatch({ type: clubConstant.SELL_COIN_REQUEST });
    try {
      const token = sessionStorage.getItem("userToken");
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
        payload: "Coin updated",
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
      const token = sessionStorage.getItem("userToken");
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
        payload: "Asset purchased",
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
      const token = sessionStorage.getItem("userToken");
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
        payload: "Coin updated",
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
          type: clubConstant.UPDTE_COIN_FAILURE,
          payload: { err: error.response.data.errors[0].message },
        });
      }
    }
  };
};

export const CreateMultiplayerGame = (body) => {
  return async (dispatch) => {
    dispatch({ type: clubConstant.CREATE_MULTIPLAYER_GAME_REQUEST });
    try {
      const token = sessionStorage.getItem("userToken");
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
        type: clubConstant.CREATE_MULTIPLAYER_GAME_SUCCESS,
        payload: data,
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
          type: clubConstant.CREATE_MULTIPLAYER_GAME_FAILURE,
          payload: { err: error.response.data.errors[0].message },
        });
      }
    }
  };
};

export const GetGameHistory = (gameId) => {
  return async (dispatch) => {
    dispatch({ type: clubConstant.GET_GAME_HISTORY_REQUEST });
    try {
      const token = sessionStorage.getItem("userToken");
      const result = await axios.get(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/v1/api/analytics?game=${gameId}`,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );
      const { data } = result;
      dispatch({
        type: clubConstant.GET_GAME_HISTORY_SUCCESS,
        payload: data.results,
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
          type: clubConstant.GET_GAME_HISTORY_FAILURE,
          payload: { err: error.response.data.errors[0].message },
        });
      }
    }
  };
};

export const GetGameData = (body) => {
  return async (dispatch) => {
    dispatch({ type: clubConstant.GET_GAME_DATA_REQUEST });
    try {
      const token = sessionStorage.getItem("userToken");
      const result = await axios.get(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/v1/api/games/status?club=${body.club}&leauge=${body.leauge}`,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );
      const { data } = result;
      dispatch({
        type: clubConstant.GET_GAME_DATA_SUCCESS,
        payload: data,
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
          type: clubConstant.GET_GAME_DATA_FAILURE,
          payload: { err: error.response.data.errors[0].message },
        });
      }
    }
  };
};
export const BorrowAmount = (body) => {
  return async (dispatch) => {
    dispatch({ type: clubConstant.BORROW_AMOUNT_REQUEST });
    try {
      const token = sessionStorage.getItem("userToken");
      await axios.post(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/v1/api/games/borrow/money`,
        body,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );
      dispatch(GetSingleGame(body.id));
      dispatch({
        type: clubConstant.BORROW_AMOUNT_SUCCESS,
        payload: "Amount borrowed",
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
          type: clubConstant.BORROW_AMOUNT_FAILURE,
          payload: { err: error.response.data.errors[0].message },
        });
      }
    }
  };
};

export const GetBorrowAmount = (body) => {
  return async (dispatch) => {
    dispatch({ type: clubConstant.GET_BORROW_AMOUNT_REQUEST });
    try {
      // ?portfolio=${body.portfolio}
      const token = sessionStorage.getItem("userToken");
      let result;
      if (body.portfolio) {
        result = await axios.get(
          `${process.env.REACT_APP_BACKEND_BASE_URL}/v1/api/games/borrowedmoney/${body.gameId}?portfolio=${body.portfolio}&player=${body.player}`,
          {
            headers: {
              Authorization: token ? `Bearer ${token}` : "",
            },
          }
        );
      } else {
        result = await axios.get(
          `${process.env.REACT_APP_BACKEND_BASE_URL}/v1/api/games/borrowedmoney/${body.gameId}?player=${body.player}`,
          {
            headers: {
              Authorization: token ? `Bearer ${token}` : "",
            },
          }
        );
      }
      const { data } = result;
      dispatch({
        type: clubConstant.GET_BORROW_AMOUNT_SUCCESS,
        payload: data.BorrowedAmount,
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
          type: clubConstant.GET_BORROW_AMOUNT_FAILURE,
          payload: { err: error.response.data.errors[0].message },
        });
      }
    }
  };
};

export const GetRemaningAmount = (body) => {
  return async (dispatch) => {
    dispatch({ type: clubConstant.GET_REMANING_AMOUNT_REQUEST });
    try {
      // ?portfolio=${body.portfolio}
      const token = sessionStorage.getItem("userToken");
      let result;
      if (body.portfolio) {
        result = await axios.get(
          `${process.env.REACT_APP_BACKEND_BASE_URL}/v1/api/games/remainingamount/${body.gameId}?portfolio=${body.portfolio}&player=${body.player}`,
          {
            headers: {
              Authorization: token ? `Bearer ${token}` : "",
            },
          }
        );
      } else {
        result = await axios.get(
          `${process.env.REACT_APP_BACKEND_BASE_URL}/v1/api/games/remainingamount/${body.gameId}?player=${body.player}`,
          {
            headers: {
              Authorization: token ? `Bearer ${token}` : "",
            },
          }
        );
      }
      const { data } = result;
      dispatch({
        type: clubConstant.GET_REMANING_AMOUNT_SUCCESS,
        payload: data.RemainingAmount,
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
          type: clubConstant.GET_REMANING_AMOUNT_FAILURE,
          payload: { err: error.response.data.errors[0].message },
        });
      }
    }
  };
};

export const GetRandomQuiz = () => {
  return async (dispatch) => {
    dispatch({ type: clubConstant.GET_RANDOM_QUIZ_REQUEST });
    try {
      // ?portfolio=${body.portfolio}
      const token = sessionStorage.getItem("userToken");
      let result = await axios.get(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/v1/api/quiz/random`,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );
      const { data } = result;
      dispatch({
        type: clubConstant.GET_RANDOM_QUIZ_SUCCESS,
        payload: data,
      });
    } catch (error) {
      if (error.response.data.code === 401) {
        sessionStorage.clear();
        dispatch({
          type: authConstant.SESSION_EXPIRE,
          payload: { err: "Session has been expired" },
        });
      } else {
        dispatch({
          type: clubConstant.GET_RANDOM_QUIZ_FAILURE,
          payload: { err: error.response.data.errors[0].message },
        });
      }
    }
  };
};

export const AddRandomQuiz = (body) => {
  return async (dispatch) => {
    dispatch({ type: clubConstant.ADD_RANDOM_QUIZ_REQUEST });
    try {
      // ?portfolio=${body.portfolio}
      const token = sessionStorage.getItem("userToken");
      await axios.post(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/v1/api/games/quiz/answer`,
        body,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );
      dispatch({
        type: clubConstant.ADD_RANDOM_QUIZ_SUCCESS,
        payload: "Quiz has been added",
      });
    } catch (error) {
      if (error.response.data.code === 401) {
        sessionStorage.clear();
        dispatch({
          type: authConstant.SESSION_EXPIRE,
          payload: { err: "Session has been expired" },
        });
      } else {
        dispatch({
          type: clubConstant.ADD_RANDOM_QUIZ_FAILURE,
          payload: { err: error.response.data.errors[0].message },
        });
      }
    }
  };
};
