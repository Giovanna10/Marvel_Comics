import {
  USER_LOGGED,
  USER_LOGGED_OUT,
  Action,
  UserActionInterface
} from "../../actions/actionsTypes/ActionsTypes";
import { UserState } from "../../statesTypes/StatesTypes";

const initialState: UserState = {
  loggedIn: false
};

export default function userReducer(
  state: UserState = initialState,
  action: Action<UserActionInterface>
) {
  switch (action.type) {
    case USER_LOGGED:
      return {
        loggedIn: action.payload
      };
    case USER_LOGGED_OUT:
      return {
        loggedIn: action.payload
      };
    default:
      return state;
  }
}
