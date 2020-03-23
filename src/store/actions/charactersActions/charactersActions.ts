import baseUrl from "../../../interceptors/apiInterceptors"
import {API_HOST_KEY as KEY} from 'react-native-dotenv'
import {GET_CATEGORIES} from '../actionsTypes/ActionsTypes'

export function getAllCharactersAction() {
    return async dispatch => {
        const {data} = await baseUrl.get(`characters?${KEY}`)
        return dispatch({
            type: GET_CATEGORIES,
            payload: data.data.results
        })
    }
}