import {
  USER_LOGGED,
  USER_LOGGED_OUT,
  Action,
  UserActionInterface,
  USER_INFO,
  GET_USER_COMICS,
} from "../../actions/actionsTypes/ActionsTypes";
import { UserState } from "../../statesTypes/StatesTypes";

const initialState: UserState = {
  loggedIn: false,
  user: {
    name: "",
    image: "",
  },
  userComics: {
    whished: [],
    inCart: [],
  },
};

export default function userReducer(
  state: UserState = initialState,
  action: Action<UserActionInterface>
) {
  switch (action.type) {
    case USER_LOGGED:
      return {
        ...state,
        loggedIn: action.payload,
      };
    case USER_LOGGED_OUT:
      return {
        ...state,
        loggedIn: action.payload,
      };
    case USER_INFO:
      return {
        ...state,
        user: action.payload,
      };
    case GET_USER_COMICS:
      return {
        ...state,
        userComics: action.payload,
      };
    default:
      return state;
  }
}
