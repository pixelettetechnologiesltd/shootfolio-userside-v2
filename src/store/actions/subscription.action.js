import { authConstant, subscriptionConstant } from "./../constants";
import axios from "axios";

export const GetAllSubscriptionPlan = (page) => {
  return async (dispatch) => {
    dispatch({
      type: subscriptionConstant.GET_ALL_SUBSCRIPTION_PLAN_REQUEST,
    });
    try {
      const token = sessionStorage.getItem("userToken");
      const result = await axios.get(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/v1/api/subscription?page=${page}&limit=10`,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );
      const { data } = result;
      dispatch({
        type: subscriptionConstant.GET_ALL_SUBSCRIPTION_PLAN_SUCCESS,
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
          type: subscriptionConstant.GET_ALL_SUBSCRIPTION_PLAN_FAILURE,
          payload: { err: error.response.data.errors[0].message },
        });
      }
    }
  };
};

export const SubscribedPlan = (subscriptionId) => {
  return async (dispatch) => {
    let result = { subscriptionId: subscriptionId };
    dispatch({
      type: subscriptionConstant.SUBSCRIBE_PLAN_REQUEST,
    });
    try {
      const token = sessionStorage.getItem("userToken");
      await axios.post(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/v1/api/subscription/subscribe`,
        result,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );

      dispatch({
        type: subscriptionConstant.SUBSCRIBE_PLAN_SUCCESS,
        payload: "Plan has been subscribed",
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
          type: subscriptionConstant.SUBSCRIBE_PLAN_FAILURE,
          payload: { err: error.response.data.errors[0].message },
        });
      }
    }
  };
};
