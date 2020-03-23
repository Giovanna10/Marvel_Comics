import { combineReducers } from "redux";
import userReducer from "./userReducer/userReducer";
import charactersReducer from "./charactersReducer/charactersReducer";

const reducers = combineReducers({
  user: userReducer,
  characters: charactersReducer
});

export default reducers;
