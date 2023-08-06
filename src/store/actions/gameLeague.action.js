import { authConstant, gameLeagueConstant } from "./../constants";
import axios from "axios";

export const GetAllGameLeague = (page) => {
  return async (dispatch) => {
    dispatch({ type: gameLeagueConstant.GET_GAME_LEAGUE_REQUEST });
    try {
      const token = localStorage.getItem("userToken");
      const result = await axios.get(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/v1/api/gameleagues?page=${page}&limit=10`,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );
      const { data } = result;
      dispatch({
        type: gameLeagueConstant.GET_GAME_LEAGUE_SUCCESS,
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
          type: gameLeagueConstant.GET_GAME_LEAGUE_FAILURE,
          payload: { err: error.response.data.errors[0].message },
        });
      }
    }
  };
};

export const GetGameForMultiPlayer = (body) => {
  return async (dispatch) => {
    dispatch({ type: gameLeagueConstant.GET_GAME_FOR_MULTIPLAYER_REQUEST });
    try {
      const token = localStorage.getItem("userToken");
      const result = await axios.get(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/v1/api/games?leauge=${body.leauge}&status=Pending&gameMode=${body.gameMode}`,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );
      const { data } = result;
      dispatch({
        type: gameLeagueConstant.GET_GAME_FOR_MULTIPLAYER_SUCCESS,
        payload: data.results,
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
          type: gameLeagueConstant.GET_GAME_FOR_MULTIPLAYER_FAILURE,
          payload: { err: error.response.data.errors[0].message },
        });
      }
    }
  };
};
