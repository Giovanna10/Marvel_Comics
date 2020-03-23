import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import reducers from './reducers/combineReducers';
import { composeWithDevTools } from 'redux-devtools-extension';

const middlewares = [thunk]

const middlewareEnhancer = applyMiddleware(...middlewares)

export type AppState = ReturnType<typeof reducers>

const store = createStore(reducers, composeWithDevTools(middlewareEnhancer))

export default store