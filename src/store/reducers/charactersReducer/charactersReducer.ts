import {
  GET_ALL_CHARACTERS,
  ADD_TO_CART_FROM_CHARACTER,
  Action,
  CharactersActionInterface,
  GET_SINGLE_CHARACTER,
  GET_SELECTED_COMIC_ID_IN_CHARACTER,
  RESET_SELECTED_COMIC_ID_IN_CHARACTER,
  IS_FROM_CHARACTER,
  ISNT_FROM_CHARACTER,
} from "../../actions/actionsTypes/ActionsTypes";
import { CharactersState } from "../../statesTypes/StatesTypes";

const initialState: CharactersState = {
  fromCharacter: false,
  allCharacters: [],
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
  },
  selectedComicId: 0,
};

export default function (
  state: CharactersState = initialState,
  action: Action<CharactersActionInterface>
) {
  switch (action.type) {
    case IS_FROM_CHARACTER: 
    return {
      ...state,
      fromCharacter: action.payload
    }
    case ISNT_FROM_CHARACTER: 
    return {
      ...state,
      fromCharacter: action.payload
    }
    case GET_ALL_CHARACTERS:
      return {
        ...state,
        allCharacters: [].concat.apply(
          [],
          [...state.allCharacters, action.payload]
        ),
      };
    case GET_SINGLE_CHARACTER:
      return {
        ...state,
        singleCharacter: action.payload,
      };
    case GET_SELECTED_COMIC_ID_IN_CHARACTER: 
    return {
      ...state,
      selectedComicId: action.payload
    }
    case RESET_SELECTED_COMIC_ID_IN_CHARACTER: 
    return {
      ...state,
      selectedComicId: action.payload
    }
    case ADD_TO_CART_FROM_CHARACTER:
      return {
        ...state,
        singleCharacter: {
          ...state.singleCharacter,
          comics: {
            ...state.singleCharacter.comics,
            items: state.singleCharacter.comics.items.map((comic) =>
              parseInt(comic.id, 10) !== state.selectedComicId
                ? comic
                : action.payload
            ),
          },
        },
      };
    default:
      return state;
  }
}
