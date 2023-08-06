import { authConstant, gameLeagueConstant } from "../constants";

const initialState = {
  gameLeague: [],
  gameForMultiPlayer: [],
  errors: [],
  loading: false,
  message: "",
  sessionExpireError: "",
  page: 1,
  totalPages: 1,
};

const gameLeagueReducer = (state = initialState, action) => {
  switch (action.type) {
    case gameLeagueConstant.GET_GAME_LEAGUE_REQUEST:
    case gameLeagueConstant.GET_GAME_FOR_MULTIPLAYER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case gameLeagueConstant.GET_GAME_LEAGUE_SUCCESS:
      return {
        ...state,
        loading: false,
        gameLeague: action.payload.results,
        page: action.payload.page,
        totalPages: action.payload.totalPages,
      };
    case gameLeagueConstant.GET_GAME_FOR_MULTIPLAYER_SUCCESS:
      return {
        ...state,
        loading: false,
        gameForMultiPlayer: action.payload,
      };
    case gameLeagueConstant.GET_GAME_LEAGUE_FAILURE:
    case gameLeagueConstant.GET_GAME_FOR_MULTIPLAYER_FAILURE:
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

export default gameLeagueReducer;
