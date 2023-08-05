import { authConstant, clubConstant } from "../constants";

const initialState = {
  club: [],
  coin: [],
  gameData: {},
  singleGameData: {},
  errors: [],
  loading: false,
  buyLoading: false,
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
    case clubConstant.GET_SINGLE_GAME_REQUEST:
    case clubConstant.SELL_COIN_REQUEST:
    case clubConstant.UPDTE_COIN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case clubConstant.BUY_COIN_REQUEST:
      return {
        ...state,
        buyLoading: true,
      };
    case clubConstant.GET_CLUB_SUCCESS:
      return {
        ...state,
        loading: false,
        club: action.payload.results,
        page: action.payload.page,
        totalPages: action.payload.totalPages,
      };
    case clubConstant.CREATE_GAME_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        gameData: action.payload,
      };
    case clubConstant.GET_SINGLE_GAME_SUCCESS:
      return {
        ...state,
        loading: false,
        singleGameData: action.payload,
      };
    case clubConstant.GET_COIN_SUCCESS:
      return {
        ...state,
        loading: false,
        coin: action.payload.results,
      };
    case clubConstant.CREATE_GAME_SUCCESS:
    case clubConstant.SELL_COIN_SUCCESS:
    case clubConstant.BUY_COIN_SUCCESS:
    case clubConstant.UPDTE_COIN_SUCCESS:
      return {
        ...state,
        loading: false,
        buyLoading: false,
        message: action.payload,
      };
    case clubConstant.GET_CLUB_FAILURE:
    case clubConstant.GET_COIN_FAILURE:
    case clubConstant.CREATE_GAME_FAILURE:
    case clubConstant.GET_SINGLE_GAME_FAILURE:
    case clubConstant.SELL_COIN_FAILURE:
    case clubConstant.BUY_COIN_FAILURE:
    case clubConstant.UPDTE_COIN_FAILURE:
      return {
        ...state,
        buyLoading: false,
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
        buyLoading: false,
        message: "",
      };
    case authConstant.CLEAR_ERRORS:
      return {
        ...state,
        loading: false,
        buyLoading: false,
        errors: [],
        sessionExpireError: "",
      };
    default:
      return state;
  }
};

export default clubReducer;
