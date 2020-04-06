import {
  GET_CHARACTERS,
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
    case GET_CHARACTERS:
      return {
        ...state,
        allCharacters: action.payload
      };
    default:
      return state;
  }
}
