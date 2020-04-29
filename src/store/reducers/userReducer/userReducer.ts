import {
  Action,
  UserActionInterface,
  USER_LOGGED,
  USER_LOGGED_OUT,
  USER_INFO,
  GET_USER_COMICS,
  RESET_USER_COMICS,
  ADD_MORE_TO_CART,
  GET_SELECTED_COMIC_ID_IN_CART,
  GET_SELECTED_COMIC_IN_CART,
  RESET_SELECTED_COMIC_IN_CART,
  ADD_COMIC_TO_CART,
  REMOVE_COMIC_FROM_CART,
  RESET_SELECTED_COMIC_ID_IN_CART,
  ADD_COMIC_FROM_WHISHES,
} from "../../actions/actionsTypes/ActionsTypes";
import { UserState } from "../../statesTypes/StatesTypes";

const initialState: UserState = {
  loggedIn: false,
  user: {
    name: "",
    image: "",
  },
  userComics: {
    whished: [],
    inCart: [],
  },
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
};

export default function userReducer(
  state: UserState = initialState,
  action: Action<UserActionInterface>
) {
  switch (action.type) {
    case USER_LOGGED:
      return {
        ...state,
        loggedIn: action.payload,
      };
    case USER_LOGGED_OUT:
      return {
        ...state,
        user: action.payload,
      };
    case USER_INFO:
      return {
        ...state,
        user: action.payload,
      };
    case GET_USER_COMICS:
      return {
        ...state,
        userComics: action.payload,
      };
    case RESET_USER_COMICS:
      return {
        ...state,
        userComics: action.payload,
      };
    case GET_SELECTED_COMIC_IN_CART:
      return {
        ...state,
        selectedComic: action.payload,
      };
    case RESET_SELECTED_COMIC_IN_CART:
      return {
        ...state,
        selectedComic: action.payload,
      };
    case GET_SELECTED_COMIC_ID_IN_CART:
      return {
        ...state,
        selectedComicId: action.payload,
      };
    case RESET_SELECTED_COMIC_ID_IN_CART:
      return {
        ...state,
        selectedComicId: action.payload,
      };
    case ADD_COMIC_FROM_WHISHES:
      return {
        ...state,
        userComics: {
          ...state.userComics,
          whished: state.userComics.whished.map((comic) =>
            comic.id !== state.selectedComicId ? comic : action.payload
          ),
        },
      };
    case REMOVE_COMIC_FROM_CART:
      return {
        ...state,
        userComics: {
          ...state.userComics,
          inCart: state.userComics.inCart.map((comic) =>
            comic.id !== state.selectedComicId ? comic : action.payload
          ),
        },
      };
    case ADD_MORE_TO_CART:
      return {
        ...state,
        userComics: {
          ...state.userComics,
          inCart: state.userComics.inCart.map((comic) =>
            comic.id !== state.selectedComicId ? comic : action.payload
          ),
        },
      };
    default:
      return state;
  }
}
