import { authConstant, gameTypeConstant } from "./../constants";
import axios from "axios";

export const GetAllGameType = (page) => {
  return async (dispatch) => {
    dispatch({ type: gameTypeConstant.GET_GAME_TYPE_REQUEST });
    try {
      const token = localStorage.getItem("userToken");
      let result;
      if (page) {
        result = await axios.get(
          `${process.env.REACT_APP_BACKEND_BASE_URL}/v1/api/gametypes?page=${page}&limit=10`,
          {
            headers: {
              Authorization: token ? `Bearer ${token}` : "",
            },
          }
        );
      } else {
        result = await axios.get(
          `${process.env.REACT_APP_BACKEND_BASE_URL}/v1/api/gametypes`,
          {
            headers: {
              Authorization: token ? `Bearer ${token}` : "",
            },
          }
        );
      }
      const { data } = result;
      dispatch({
        type: gameTypeConstant.GET_GAME_TYPE_SUCCESS,
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
          type: gameTypeConstant.GET_GAME_TYPE_FAILURE,
          payload: { err: error.response.data.errors[0].message },
        });
      }
    }
  };
};
