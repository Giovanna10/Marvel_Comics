import { combineReducers } from "redux";
import userReducer from "./userReducer/userReducer";
import charactersReducer from "./charactersReducer/charactersReducer";
import comicsReducer from "./comicsReducer/comicsReducer";
import searchBoxReducer from "./searchBoxReducer/searchBoxReducer";
import cartReducer from "./cartReducer/cartReducer"

const reducers = combineReducers({
  user: userReducer,
  cart: cartReducer,
  characters: charactersReducer,
  comics: comicsReducer,
  searchBox: searchBoxReducer,
});

export default reducers;
