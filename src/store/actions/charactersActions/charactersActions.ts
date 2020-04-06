import characters from "../../../interceptors/charactersInterceptor"
import { API_HOST_KEY as KEY, API_HOST_HASH as HASH, API_HOST_TS as TS } from 'react-native-dotenv'
import {GET_CATEGORIES, CharactersActionInterface} from '../actionsTypes/ActionsTypes'

export function getAllCharactersAction() {
    const params ={
        apikey: KEY,
        hash: HASH,
        ts: TS
      }
    return async dispatch => {
        const {data} = await characters.get('', {params})
        const allCharacters: CharactersActionInterface = data.map(character => ({
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
            type: GET_CATEGORIES,
            payload: allCharacters
        })
    }
}