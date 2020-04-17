import {
  GET_ALL_CHARACTERS,
  Action,
  AllCharactersActionInterface,
} from "../../actions/actionsTypes/ActionsTypes";
import { AllCharactersState } from "../../statesTypes/StatesTypes";

const initialState: AllCharactersState = {
  allCharacters: [],
};

export default function (
  state: AllCharactersState = initialState,
  action: Action<AllCharactersActionInterface>
) {
  switch (action.type) {
    case GET_ALL_CHARACTERS:
      return {
        ...state,
        allCharacters: [].concat.apply([], [...state.allCharacters, action.payload])
      };
    default:
      return state;
  }
}
