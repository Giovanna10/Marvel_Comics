import {
  Action,
  UserActionInterface,
  USER_LOGGED,
  USER_LOGGED_OUT,
  USER_INFO,
  GET_USER_COMICS,
  RESET_USER_COMICS,
  OPEN_QTY_MODAL,
  CLOSE_QTY_MODAL,
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
  openModal: false,
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
        user: action.payload,
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
    case RESET_USER_COMICS:
      return {
        ...state,
        userComics: action.payload,
      };
    case OPEN_QTY_MODAL:
      return {
        ...state,
        openModal: action.payload,
      };
    case CLOSE_QTY_MODAL: {
      return {
        ...state,
        openModal: action.payload,
      };
    }
    default:
      return state;
  }
}
