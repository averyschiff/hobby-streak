import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk'
import singleModel from './singleModel'
import singleUnit from './singleUnit'
import singleArmy from './singleArmy'

const Reducer = combineReducers({
	singleModel,
	singleUnit,
	singleArmy,
})

const middleware = applyMiddleware(thunkMiddleware)

const store = createStore(Reducer, middleware)
export default store
