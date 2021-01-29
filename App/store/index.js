import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk'
import singleModel from './singleModel'
import singleUnit from './singleUnit'

const Reducer = combineReducers({
	singleModel,
	singleUnit
})

const middleware = applyMiddleware(thunkMiddleware)

const store = createStore(Reducer, middleware)
export default store
