import { authConstant, clubConstant } from "../constants";

const initialState = {
  club: [],
  coin: [],
  errors: [],
  loading: false,
  message: "",
  sessionExpireError: "",
  page: 1,
  totalPages: 1,
};

const clubReducer = (state = initialState, action) => {
  switch (action.type) {
    case clubConstant.GET_CLUB_REQUEST:
    case clubConstant.GET_COIN_REQUEST:
    case clubConstant.CREATE_GAME_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case clubConstant.GET_CLUB_SUCCESS:
      return {
        ...state,
        loading: false,
        club: action.payload.results,
        page: action.payload.page,
        totalPages: action.payload.totalPages,
      };
    case clubConstant.GET_COIN_SUCCESS:
      return {
        ...state,
        loading: false,
        coin: action.payload.results,
      };
    case clubConstant.CREATE_GAME_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload,
      };
    case clubConstant.GET_CLUB_FAILURE:
    case clubConstant.GET_COIN_FAILURE:
    case clubConstant.CREATE_GAME_FAILURE:
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

export default clubReducer;
