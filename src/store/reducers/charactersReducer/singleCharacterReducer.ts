import {
  GET_SINGLE_CHARACTER,
  Action,
  SingleCharactersActionInterface,
} from "../../actions/actionsTypes/ActionsTypes";
import { SingleCharacterState } from "../../statesTypes/StatesTypes";

const initialState: SingleCharacterState = {
  singleCharacter: {
    id: 0,
    name: "",
    description: "",
    thumbnail: {
      path: "",
      extension: "",
    },
    comics: {
      items: [],
      available: 0,
      returned: 0,
    },
  }
};

export default function (
  state: SingleCharacterState = initialState,
  action: Action<SingleCharactersActionInterface>
) {
  switch (action.type) {
    case GET_SINGLE_CHARACTER:
      return {
        ...state,
        singleCharacter: action.payload
      };
    default:
      return state;
  }
}