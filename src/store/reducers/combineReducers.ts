import { combineReducers } from "redux";
import userReducer from "./userReducer/userReducer";
import allCharactersReducer from "./charactersReducer/allCharactersReducer";
import singleCharacterReducer from "./charactersReducer/singleCharacterReducer";
import comicsReducer from "./comicsReducer/comicsReducer";
import searchBoxReducer from "./searchBoxReducer/searchBoxReducer";

const reducers = combineReducers({
  user: userReducer,
  allCharacters: allCharactersReducer,
  singleCharacter: singleCharacterReducer,
  comics: comicsReducer,
  searchBox: searchBoxReducer,
});

export default reducers;
