import {
  GET_CATEGORIES,
  Action,
  CharactersActionInterface
} from "../../actions/actionsTypes/ActionsTypes";
import { CharactersState } from "../../statesTypes/StatesTypes";

const initialState: CharactersState = {
  allCharacters: []
};

export default function(
  state: CharactersState = initialState,
  action: Action<CharactersActionInterface>
) {
  switch (action.type) {
    case GET_CATEGORIES:
      return {
        ...state,
        allCharacters: action.payload
      };
    default:
      return state;
  }
}
