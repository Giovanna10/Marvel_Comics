import {
  OPEN_SEARCH_BOX,
  CLOSE_SEARCH_BOX
} from "../../actions/actionsTypes/ActionsTypes";

const initialState = {
  searchBoxState: false
};

const searchBoxReducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_SEARCH_BOX:
      return {
        searchBoxState: action.payload
      };
    case CLOSE_SEARCH_BOX:
      return {
        searchBoxState: action.payload
      };
    default:
      return state;
  }
};

export default searchBoxReducer;