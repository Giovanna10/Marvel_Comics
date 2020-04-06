import {
  GET_YEAR_COMICS,
  Action,
  ComicsActionInterface
} from "../../actions/actionsTypes/ActionsTypes";
import { ComicsState } from "../../statesTypes/StatesTypes";

const initialState: ComicsState = {
  yearlyComics: []
};

export default function(
  state: ComicsState = initialState,
  action: Action<ComicsActionInterface>
) {
  switch (action.type) {
    case GET_YEAR_COMICS:
      return {
        ...state,
        yearlyComics: action.payload
      };
    default:
      return state;
  }
}
