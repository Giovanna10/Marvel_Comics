import {
  Action,
  ComicsActionInterface,
  GET_YEAR_COMICS,
  GET_NEWS,
  GET_SELECTED_COMIC,
  GET_RELATED_COMICS,
  RESET_RELATED,
  RESET_SELECTED_COMIC,
  ADD_COMIC_TO_CART,
  GET_SELECTED_COMIC_ID,
  RESET_SELECTED_COMIC_ID,
  REMOVE_COMIC_FROM_CART,
} from "../../actions/actionsTypes/ActionsTypes";
import { ComicsState } from "../../statesTypes/StatesTypes";

const initialState: ComicsState = {
  comicsNews: [],
  yearlyComics: [],
  selectedComic: {
    id: 0,
    title: "",
    comicNumber: "",
    description: "",
    modificationDate: "",
    creationDate: "",
    pageCount: 0,
    price: 0,
    thumbnail: { path: "", extension: "" },
    images: [],
    creators: { items: [], returned: 0 },
    characters: [],
    qtyInCart: 0,
  },
  selectedComicId: 0,
  relatedComics: [],
};

export default function (
  state: ComicsState = initialState,
  action: Action<ComicsActionInterface>
) {
  switch (action.type) {
    case GET_NEWS:
      return {
        ...state,
        comicsNews: action.payload,
      };
    case GET_YEAR_COMICS:
      return {
        ...state,
        yearlyComics: [].concat.apply(
          [],
          [...state.yearlyComics, action.payload]
        ),
      };
    case GET_SELECTED_COMIC:
      return {
        ...state,
        selectedComic: action.payload,
      };
    case GET_SELECTED_COMIC_ID:
      return {
        ...state,
        selectedComicId: action.payload,
      };
    case RESET_SELECTED_COMIC_ID:
      return {
        ...state,
        selectedComicId: action.payload,
      };
    case ADD_COMIC_TO_CART:
      return {
        ...state,
        relatedComics: state.relatedComics.map((comic) => {
          return comic.id !== state.selectedComicId ? comic : action.payload;
        }),
        yearlyComics: state.yearlyComics.map((comic) => {
          return comic.id !== state.selectedComicId ? comic : action.payload;
        }),
      };
    case REMOVE_COMIC_FROM_CART:
      return {
        ...state,
        relatedComics: state.relatedComics.map((comic) => {
          return comic.id !== state.selectedComicId ? comic : action.payload;
        }),
        yearlyComics: state.yearlyComics.map((comic) => {
          return comic.id !== state.selectedComicId ? comic : action.payload;
        }),
      };
    case RESET_SELECTED_COMIC:
      return {
        ...state,
        selectedComic: action.payload,
      };
    case GET_RELATED_COMICS:
      return {
        ...state,
        relatedComics: [].concat.apply(
          [],
          [...state.relatedComics, action.payload]
        ),
      };
    case RESET_RELATED:
      return {
        ...state,
        relatedComics: action.payload,
      };
    default:
      return state;
  }
}
