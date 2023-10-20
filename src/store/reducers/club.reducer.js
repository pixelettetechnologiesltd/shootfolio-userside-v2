import { authConstant, clubConstant } from "../constants";

const initialState = {
  club: [],
  coin: [],
  gameHistory: {},
  gameData: {},
  borrowAmount: 0,
  remaningAmount: 0,
  multiPlayerGameData: {},
  singleGameData: {},
  errors: [],
  loading: false,
  buyLoading: false,
  sellLoading: false,
  updateLoading: false,
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
    case clubConstant.CREATE_MULTIPLAYER_GAME_REQUEST:
    case clubConstant.GET_GAME_HISTORY_REQUEST:
    case clubConstant.BORROW_AMOUNT_REQUEST:
    case clubConstant.GET_GAME_DATA_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case clubConstant.BUY_COIN_REQUEST:
      return {
        ...state,
        buyLoading: true,
      };
    case clubConstant.SELL_COIN_REQUEST:
      return {
        ...state,
        sellLoading: true,
      };
    case clubConstant.UPDTE_COIN_REQUEST:
      return {
        ...state,
        updateLoading: true,
      };
    case clubConstant.GET_CLUB_SUCCESS:
      return {
        ...state,
        loading: false,
        club: action.payload.results,
        page: action.payload.page,
        totalPages: action.payload.totalPages,
      };
    case clubConstant.GET_BORROW_AMOUNT_SUCCESS:
      return {
        ...state,
        loading: false,
        borrowAmount: action.payload,
      };
    case clubConstant.GET_REMANING_AMOUNT_SUCCESS:
      return {
        ...state,
        loading: false,
        remaningAmount: action.payload,
      };
    case clubConstant.CREATE_GAME_DATA_SUCCESS:
    case clubConstant.GET_GAME_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        gameData: action.payload,
      };
    case clubConstant.GET_GAME_HISTORY_SUCCESS:
      return {
        ...state,
        loading: false,
        gameHistory: action.payload,
      };
    case clubConstant.CREATE_MULTIPLAYER_GAME_SUCCESS:
      return {
        ...state,
        loading: false,
        multiPlayerGameData: action.payload,
        message: "Game created",
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
    case clubConstant.BORROW_AMOUNT_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload,
      };
    case clubConstant.SELL_COIN_SUCCESS:
      return {
        ...state,
        sellLoading: false,
        message: action.payload,
      };
    case clubConstant.BUY_COIN_SUCCESS:
      return {
        ...state,
        buyLoading: false,
        message: action.payload,
      };
    case clubConstant.UPDTE_COIN_SUCCESS:
      return {
        ...state,
        updateLoading: false,
        message: action.payload,
      };
    case clubConstant.GET_CLUB_FAILURE:
    case clubConstant.GET_COIN_FAILURE:
    case clubConstant.CREATE_GAME_FAILURE:
    case clubConstant.GET_SINGLE_GAME_FAILURE:
    case clubConstant.CREATE_MULTIPLAYER_GAME_FAILURE:
    case clubConstant.GET_GAME_HISTORY_FAILURE:
    case clubConstant.BORROW_AMOUNT_FAILURE:
    case clubConstant.GET_GAME_DATA_FAILURE:
    case clubConstant.GET_BORROW_AMOUNT_FAILURE:
    case clubConstant.GET_REMANING_AMOUNT_FAILURE:
      return {
        ...state,
        loading: false,
        errors: action.payload.err,
      };

    case clubConstant.BUY_COIN_FAILURE:
      return {
        ...state,
        buyLoading: false,
        errors: action.payload.err,
      };

    case clubConstant.SELL_COIN_FAILURE:
      return {
        ...state,
        sellLoading: false,
        errors: action.payload.err,
      };

    case clubConstant.UPDTE_COIN_FAILURE:
      return {
        ...state,
        updateLoading: false,
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
