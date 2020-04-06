import { combineReducers } from "redux";
import userReducer from "./userReducer/userReducer";
import charactersReducer from "./charactersReducer/charactersReducer";
import comicsReducer from "./comicsReducer/comicsReducer";
import searchBoxReducer from "./searchBoxReducer/searchBoxReducer";

const reducers = combineReducers({
  user: userReducer,
  characters: charactersReducer,
  comics: comicsReducer,
  searchBox: searchBoxReducer,
});

export default reducers;
