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
  openModal: boolean;
}

export interface ComicsState {
  comicsNews: News[];
  yearlyComics: Comic[];
  selectedComic: Comic;
  relatedComics: Comic[];
}

export interface AllCharactersState {
  allCharacters: Character[];
}

export interface SingleCharacterState {
  singleCharacter: Character;
}
