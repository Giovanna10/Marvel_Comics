//USER
export const USER_LOGGED = "USER_LOGGED";
export const USER_LOGGED_OUT = "USER_LOGGED_OUT";
export const USER_INFO = "USER_INFO";
export const GET_USER_COMICS = "GET_USER_COMICS";
export const RESET_USER_COMICS = "RESET_USER_COMICS";
//CART
export const GET_SELECTED_COMIC_IN_CART = "GET_SELECTED_COMIC_IN_CART";
export const RESET_SELECTED_COMIC_IN_CART = "RESET_SELECTED_COMIC_IN_CART";
export const GET_SELECTED_COMIC_ID_IN_CART = "GET_SELECTED_COMIC_ID_IN_CART";
export const RESET_SELECTED_COMIC_ID_IN_CART =
  "RESET_SELECTED_COMIC_ID_IN_CART";
export const OPEN_QTY_MODAL = "OPEN_QTY_MODAL";
export const CLOSE_QTY_MODAL = "CLOSE_QTY_MODAL";
export const ADD_COMIC_TO_CART = "ADD_COMIC_TO_CART";
export const ADD_COMIC_FROM_WHISHES = "ADD_COMIC_FROM_WHISHES";
export const REMOVE_COMIC_FROM_CART = "REMOVE_COMIC_FROM_CART";
export const ADD_MORE_TO_CART = "ADD_MORE_TO_CART";
export const SET_QUANTITY = "SET_QUANTITY";
//CHARACTERS
export const IS_FROM_CHARACTER = "IS_FROM_CHARACTER"
export const ISNT_FROM_CHARACTER = "ISNT_FROM_CHARACTER"
export const GET_ALL_CHARACTERS = "GET_ALL_CHARACTERS";
export const ADD_TO_CART_FROM_CHARACTER = "ADD_TO_CART_FROM_CHARACTER";
export const GET_SELECTED_COMIC_ID_IN_CHARACTER =
  "GET_SELECTED_COMIC_ID_IN_CHARACTER";
export const RESET_SELECTED_COMIC_ID_IN_CHARACTER = "RESET_SELECTED_COMIC_ID_IN_CHARACTER"
export const GET_SINGLE_CHARACTER = "GET_SINGLE_CHARACTER";
//SEARCHBOX
export const OPEN_SEARCH_BOX = "OPEN_SEARCH_BOX";
export const CLOSE_SEARCH_BOX = "CLOSE_SEARCH_BOX";
//COMICS
export const GET_YEAR_COMICS = "GET_YEAR_COMICS";
export const GET_SELECTED_COMIC = "GET_SELECTED_COMIC";
export const GET_SELECTED_COMIC_ID = "GET_SELECTED_COMIC_ID";
export const RESET_SELECTED_COMIC_ID = "RESET_SELECTED_COMIC_ID";
export const GET_RELATED_COMICS = "GET_RELATED_COMICS";
export const RESET_SELECTED_COMIC = "RESET_SELECTED_COMIC";
export const RESET_RELATED = "RESET_RELATED";
export const GET_NEWS = "GET_NEWS";

export interface Action<P> {
  type: string;
  payload: P;
}

//USER ACTIONS
export interface UserActionInterface {
  loggedIn: boolean;
  user: User;
  userComics: UserComics;
  selectedComicId: number;
}
export interface User {
  name: string;
  image: string;
}
export interface UserComics {
  whished: Comic[];
  inCart: Comic[];
}

//CART ACTIONS
export interface CartActionInterface {
  openModal: boolean;
}

//CHARACTERS ACTION
export type Character = {
  id: number;
  name: string;
  description: string;
  thumbnail: Image;
  comics: Comics;
};

export type Image = {
  path: string;
  extension: string;
};

export interface Comics {
  items: ComicsItem[];
  available: number;
  returned: number;
}

export interface ComicsItem {
  id: string;
  title: string;
}

export interface CharactersActionInterface {
  allCharacters: Character[];
}

//COMICS ACTIONS
export interface Comic {
  id: number;
  title: string;
  comicNumber: string;
  description: string;
  modificationDate: string;
  creationDate: string;
  pageCount: number;
  price: number;
  thumbnail: Image;
  images: Image[];
  creators: Creators;
  characters: string[];
  qtyInCart: number;
}

export type Creators = {
  items: Creator[];
  returned: number;
};

export type Creator = {
  resourceURI: string;
  id: string;
  name: string;
  role?: string;
};

export interface News {
  id: string;
  title: string;
  source: string;
  body: string;
  coverImage: string;
}

export interface ComicsActionInterface {
  news: News[];
  comics: Comic[];
  selectedComic: Comic;
  selectedComicId: number | string;
}
