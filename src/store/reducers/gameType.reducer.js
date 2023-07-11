import { authConstant, gameTypeConstant } from "../constants";

const initialState = {
  gameType: [],
  errors: [],
  loading: false,
  message: "",
  sessionExpireError: "",
  page: 1,
  totalPages: 1,
};

const gameTypeReducer = (state = initialState, action) => {
  switch (action.type) {
    case gameTypeConstant.GET_GAME_TYPE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case gameTypeConstant.GET_GAME_TYPE_SUCCESS:
      return {
        ...state,
        loading: false,
        gameType: action.payload.results,
        page: action.payload.page,
        totalPages: action.payload.totalPages,
      };
    case gameTypeConstant.GET_GAME_TYPE_FAILURE:
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

export default gameTypeReducer;
