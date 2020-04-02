import baseUrl from "../../../interceptors/apiInterceptors"
import {API_HOST_KEY as KEY} from 'react-native-dotenv'
import {GET_YEAR_COMICS} from '../actionsTypes/ActionsTypes'

export function getYearlyComicsAction() {
    return async dispatch => {
        const {data} = await baseUrl.get(`comics?${KEY}&dateRange=2020-01-01, 2020-04-02&orderBy=onsaleDate&format=comic&formatType=comic`)
        return dispatch({
            type: GET_YEAR_COMICS,
            payload: data.data.results
        })
    }
}