export const USER_LOGGED = "USER_LOGGED";
export const USER_LOGGED_OUT = "USER_LOGGED_OUT";
export const GET_CHARACTERS = "GET_CHARACTERS";
export const GET_YEAR_COMICS = "GET_YEAR_COMICS";
export const GET_SELECTED_COMIC = "GET_SELECTED_COMIC";
export const GET_RELATED_COMICS = "GET_RELATED_COMICS";
export const SET_UNMOUNT = "SET_UNMOUNT";
export const GET_NEWS = "GET_NEWS";
export const OPEN_SEARCH_BOX = "OPEN_SEARCH_BOX";
export const CLOSE_SEARCH_BOX = "CLOSE_SEARCH_BOX";
export interface Action<P> {
  type: string;
  payload: P;
}

//USER ACTIONS
export interface UserActionInterface {
  loggedIn: boolean;
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
  resourceURI: string;
  name: string;
}

export interface CharactersActionInterface {
  characters: Character[];
}

//COMICS ACTIONS
export interface Comic {
  id: number;
  title: string;
  comicNumber: string;
  description: null;
  modificationDate: string;
  creationDate: string;
  pageCount: number;
  price: number;
  thumbnail: Image;
  images: Image[];
  creators: Creators;
  characters: string[];
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
  comics: Comic[];
  news: News[];
}
