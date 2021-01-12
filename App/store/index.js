import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk'
import singleModel from './singleModel'

const Reducer = combineReducers({
	singleModel
})

const middleware = applyMiddleware(thunkMiddleware)

const store = createStore(Reducer, middleware)
export default store
