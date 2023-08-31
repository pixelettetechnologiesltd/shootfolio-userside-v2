import { authConstant, gameModeConstant } from "./../constants";
import axios from "axios";

export const GetAllGameMode = (page) => {
  return async (dispatch) => {
    dispatch({ type: gameModeConstant.GET_GAME_MODE_REQUEST });
    let gameType = "64f06541b0985e73b9ecd574";
    try {
      const token = sessionStorage.getItem("userToken");
      let result;
      if (page) {
        result = await axios.get(
          `${process.env.REACT_APP_BACKEND_BASE_URL}/v1/api/gamemodes?gameType=${gameType}`,
          {
            headers: {
              Authorization: token ? `Bearer ${token}` : "",
            },
          }
        );
      } else {
        result = await axios.get(
          `${process.env.REACT_APP_BACKEND_BASE_URL}/v1/api/gamemodes`,
          {
            headers: {
              Authorization: token ? `Bearer ${token}` : "",
            },
          }
        );
      }
      const { data } = result;
      dispatch({
        type: gameModeConstant.GET_GAME_MODE_SUCCESS,
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
          payload: { err: "Session has been expired" },
        });
      } else {
        dispatch({
          type: gameModeConstant.GET_GAME_MODE_FAILURE,
          payload: { err: error.response.data.errors[0].message },
        });
      }
    }
  };
};
