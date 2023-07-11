import { combineReducers } from "redux";
import authReducer from "./auth.reducer";
import gameModeReducer from "./gameMode.reducer";
import gameLeagueReducer from "./gameLeague.reducer";
import gameTypeReducer from "./gameType.reducer";
import clubReducer from "./club.reducer";

const rootReducer = combineReducers({
  authReducer,
  gameModeReducer,
  gameLeagueReducer,
  gameTypeReducer,
  clubReducer,
});

export default rootReducer;
