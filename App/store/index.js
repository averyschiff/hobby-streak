import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk'
import singleModel from './singleModel'
import singleUnit from './singleUnit'
import singleArmy from './singleArmy'
import allArmies from './allArmies'

const Reducer = combineReducers({
	singleModel,
	singleUnit,
	singleArmy,
	allArmies,
})

const middleware = applyMiddleware(thunkMiddleware)

const store = createStore(Reducer, middleware)
export default store
