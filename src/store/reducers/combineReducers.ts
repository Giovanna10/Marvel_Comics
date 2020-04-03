import { combineReducers } from "redux";
import userReducer from "./userReducer/userReducer";
import charactersReducer from "./charactersReducer/charactersReducer";
import comicsReducer from "./comicsReducer/comicsReducer";

const reducers = combineReducers({
  user: userReducer,
  comics: comicsReducer,
  characters: charactersReducer
});

export default reducers;
