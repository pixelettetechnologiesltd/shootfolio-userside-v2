import { authConstant, multiPlayerConstant } from "../constants";

const initialState = {
  errors: [],
  loading1: false,
  loading2: false,
  loading3: false,
  gameAfterShoot: {},
  message: "",
  sessionExpireError: "",
};

const clubReducer = (state = initialState, action) => {
  switch (action.type) {
    case multiPlayerConstant.POST_PASS_BALL_REQUEST:
      return {
        ...state,
        loading1: true,
      };

    case multiPlayerConstant.POST_PASS_BALL_SUCCESS:
      return {
        ...state,
        loading1: false,
        message: action.payload,
      };
    case multiPlayerConstant.ADD_GAME_AFTER_QUIZ_SUCCESS:
      return {
        ...state,
        loading1: false,
        gameAfterShoot: action.payload,
      };
    case multiPlayerConstant.POST_PASS_BALL_FAILURE:
      return {
        ...state,
        loading1: false,
        errors: action.payload.err,
      };

    case multiPlayerConstant.POST_SHOOT_BALL_REQUEST:
      return {
        ...state,
        loading2: true,
      };

    case multiPlayerConstant.POST_SHOOT_BALL_SUCCESS:
      return {
        ...state,
        loading2: false,
        message: action.payload,
      };
    case multiPlayerConstant.POST_SHOOT_BALL_FAILURE:
      return {
        ...state,
        loading2: false,
        errors: action.payload.err,
      };

    case multiPlayerConstant.POST_TACKLE_BALL_REQUEST:
      return {
        ...state,
        loading3: true,
      };

    case multiPlayerConstant.POST_TACKLE_BALL_SUCCESS:
      return {
        ...state,
        loading3: false,
        message: action.payload,
      };

    case multiPlayerConstant.POST_TACKLE_BALL_FAILURE:
      return {
        ...state,
        loading3: false,
        errors: action.payload.err,
      };

    case authConstant.SESSION_EXPIRE:
      return {
        ...state,
        loading1: false,
        loading2: false,
        loading3: false,
        sessionExpireError: action.payload.err,
      };
    case authConstant.CLEAR_MESSAGES:
      return {
        ...state,
        loading1: false,
        loading2: false,
        loading3: false,
        message: "",
      };
    case authConstant.CLEAR_ERRORS:
      return {
        ...state,
        loading1: false,
        loading2: false,
        loading3: false,
        errors: [],
        sessionExpireError: "",
      };
    default:
      return state;
  }
};

export default clubReducer;
