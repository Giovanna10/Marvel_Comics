import { GET_CATEGORIES } from "../../actions/actionsTypes/ActionsTypes";

const initialState = {
    allCharacters: []
}

export default function(state=initialState, action){
    switch(action.type){
        case GET_CATEGORIES:
            return {
                ...state,
                allCharacters: action.payload
            }
        default: return state
    }
}