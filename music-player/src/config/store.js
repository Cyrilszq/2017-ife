import {createStore, combineReducers, applyMiddleware} from 'redux';
import reducer from '../reducers';
import thunk from 'redux-thunk';

const middleware = [thunk]

let store = createStore(
    reducer,
    applyMiddleware(...middleware)
);

export default store;