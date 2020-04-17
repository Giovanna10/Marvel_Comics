import characters from "../../../interceptors/charactersInterceptor"
import { API_HOST_KEY as KEY, API_HOST_HASH as HASH, API_HOST_TS as TS } from 'react-native-dotenv'
import { GET_ALL_CHARACTERS, AllCharactersActionInterface, SingleCharactersActionInterface, GET_SINGLE_CHARACTER, Character } from '../actionsTypes/ActionsTypes'

export function getAllCharactersAction(offset?: number) {
    const params = {
        apikey: KEY,
        hash: HASH,
        ts: TS,
        orderBy: 'name',
        offset: `${offset}`,
        limit: '8',
    }
    return async dispatch => {
        const { data } = await characters.get('', { params })
        const allCharacters: AllCharactersActionInterface = data.data.results.map(character => ({
            id: character.id,
            name: character.name,
            description: character.description,
            thumbnail: character.thumbnail,
            comics: {
                items: character.comics.items,
                available: character.comics.available,
                returned: character.comics.returned
            },
        }))
        return dispatch({
            type: GET_ALL_CHARACTERS,
            payload: allCharacters
        })
    }
}


export function getSingleCharacterAction(name){
    const params = {
        apikey: KEY,
        hash: HASH,
        ts: TS,
        name: `${name}`
    }
    return async dispatch => {
        const { data } = await characters.get('', { params })
        const singleCharacter: SingleCharactersActionInterface = {
            id: data.data.results[0].id,
            name: data.data.results[0].name,
            description: data.data.results[0].description,
            thumbnail: data.data.results[0].thumbnail,
            comics: {
                items: data.data.results[0].comics.items,
                available: data.data.results[0].comics.available,
                returned: data.data.results[0].comics.returned
            },
        }
        return dispatch({
            type: GET_SINGLE_CHARACTER,
            payload: singleCharacter
        })
    }
}