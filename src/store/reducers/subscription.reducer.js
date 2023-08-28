import { authConstant, subscriptionConstant } from "../constants";

const initialState = {
  subscriptionPlans: [],
  loginUserCryptoPayment: [],
  errors: [],
  loading: false,
  page: 1,
  totalPages: 1,
  message: "",
  sessionExpireError: "",
};

const subscriptionPlanReducer = (state = initialState, action) => {
  switch (action.type) {
    case subscriptionConstant.GET_ALL_SUBSCRIPTION_PLAN_REQUEST:
    case subscriptionConstant.SUBSCRIBE_PLAN_REQUEST:
    case subscriptionConstant.ADD_CRYPTO_PAYMENT_REQUEST:
    case subscriptionConstant.GET_SINGLE_CRYPTO_PAYMENT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case subscriptionConstant.GET_ALL_SUBSCRIPTION_PLAN_SUCCESS:
      return {
        ...state,
        loading: false,
        subscriptionPlans: action.payload.results,
        page: action.payload.page,
        totalPages: action.payload.totalPages,
      };
    case subscriptionConstant.SUBSCRIBE_PLAN_SUCCESS:
    case subscriptionConstant.ADD_CRYPTO_PAYMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload,
      };

    case subscriptionConstant.GET_SINGLE_CRYPTO_PAYMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        loginUserCryptoPayment: action.payload,
      };
    case subscriptionConstant.GET_ALL_SUBSCRIPTION_PLAN_FAILURE:
    case subscriptionConstant.SUBSCRIBE_PLAN_FAILURE:
    case subscriptionConstant.ADD_CRYPTO_PAYMENT_FAILURE:
    case subscriptionConstant.GET_SINGLE_CRYPTO_PAYMENT_FAILURE:
      return {
        ...state,
        loading: false,
        errors: action.payload.err,
      };
    case authConstant.SESSION_EXPIRE:
      return {
        ...state,
        loading: false,
        sessionExpireError: action.payload.err,
      };
    case authConstant.CLEAR_MESSAGES:
      return {
        ...state,
        loading: false,
        message: "",
      };
    case authConstant.CLEAR_ERRORS:
      return {
        ...state,
        loading: false,
        errors: [],
        sessionExpireError: "",
      };
    default:
      return state;
  }
};

export default subscriptionPlanReducer;
