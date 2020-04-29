import {
  Comic,
  Character,
  News,
  User,
  UserComics,
} from "../actions/actionsTypes/ActionsTypes";

export interface UserState {
  loggedIn: boolean;
  user: User;
  userComics: UserComics;
  selectedComic: Comic;
  selectedComicId: number;
}

export interface CartState {
  openModal: boolean;
}

export interface ComicsState {
  comicsNews: News[];
  yearlyComics: Comic[];
  selectedComic: Comic;
  selectedComicId: number;
  relatedComics: Comic[];
}

export interface CharactersState {
  fromCharacter: boolean;
  allCharacters: Character[];
  singleCharacter: Character;
  selectedComicId: number;
}
