import { GET_YEAR_COMICS } from "../../actions/actionsTypes/ActionsTypes";

const initialState = {
  comicsArray: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_YEAR_COMICS:
      return {
        ...state,
        comicsArray: action.payload
      };
    default:
      return state;
  }
}
