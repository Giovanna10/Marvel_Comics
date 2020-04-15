import {Comic, Character, News} from '../actions/actionsTypes/ActionsTypes'


export interface UserState {
    loggedIn: boolean
}

export interface ComicsState{
    comicsNews: News[],
    yearlyComics: Comic[],
    selectedComic: Comic,
    relatedComics: Comic[],
}

export interface CharactersState{
    allCharacters: Character[]
}
