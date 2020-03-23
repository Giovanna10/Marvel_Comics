import {
  USER_LOGGED,
  USER_LOGGED_OUT
} from "../../actions/actionsTypes/ActionsTypes";

const initialState = {
  loggedIn: false
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGGED:
      return {
        loggedIn: action.payload
      };
    case USER_LOGGED_OUT:
      console.log(action.payload);

      return {
        loggedIn: action.payload
      };
    default:
      return state;
  }
};

export default userReducer;
