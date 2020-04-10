import {
  GET_YEAR_COMICS,
  Action,
  ComicsActionInterface,
  GET_NEWS,
  GET_SELECTED_COMIC
} from "../../actions/actionsTypes/ActionsTypes";
import { ComicsState } from "../../statesTypes/StatesTypes";

const initialState: ComicsState = {
  comicsNews: [],
  yearlyComics: [],
  selectedComic: {
    id: 0,
  title: '',
  comicNumber: '',
  description: null,
  modificationDate: '',
  creationDate: '',
  pageCount: 0,
  price: 0,
  thumbnail: {path: '', extension: ''},
  images: [],
  creators: {items: [], returned: 0},
  characters: [],
  }
};

export default function(
  state: ComicsState = initialState,
  action: Action<ComicsActionInterface>
) {
  switch (action.type) {
    case GET_NEWS:
        return {
          ...state,
          comicsNews: action.payload
        }
    case GET_YEAR_COMICS:
      return {
        ...state,
        yearlyComics: [].concat.apply([],[...state.yearlyComics, action.payload])
      };
    case GET_SELECTED_COMIC: 
    return {
      ...state,
      selectedComic: action.payload
    }
    default:
      return state;
  }
}
