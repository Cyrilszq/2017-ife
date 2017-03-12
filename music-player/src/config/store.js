import {createStore, combineReducers, applyMiddleware} from 'redux'
import reducer from '../reducers'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'

const logger = createLogger()


let store = createStore(
    reducer,
    applyMiddleware(thunk, logger)
);

export default store;