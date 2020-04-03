import {Comic, Character} from '../actions/actionsTypes/ActionsTypes'


export interface UserState {
    loggedIn: boolean
}

export interface ComicsState{
    yearlyComics: Comic[]
}

export interface CharactersState{
    allCharacters: Character[]
}
