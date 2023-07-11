import { authConstant, gameModeConstant } from "../constants";

const initialState = {
  gameMode: [],
  errors: [],
  loading: false,
  message: "",
  sessionExpireError: "",
  page: 1,
  totalPages: 1,
};

const gameModeReducer = (state = initialState, action) => {
  switch (action.type) {
    case gameModeConstant.GET_GAME_MODE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case gameModeConstant.GET_GAME_MODE_SUCCESS:
      return {
        ...state,
        loading: false,
        gameMode: action.payload.results,
        page: action.payload.page,
        totalPages: action.payload.totalPages,
      };
    case gameModeConstant.GET_GAME_MODE_FAILURE:
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

export default gameModeReducer;
