import {units, models} from "../db"

const SET_UNIT = 'SET_UNIT'
const SET_MODELS = 'SET_MODELS'
const ADD_MODEL = 'ADD_MODEL'

export const setUnit = (unit) => ({
  type: SET_UNIT,
  unit
})

export const setModels = (models) => ({
  type: SET_MODELS,
  models
})

export const addModel = (model) => ({
  type: ADD_MODEL,
  model
})

export const getUnit = (unit_id) => {
  return async dispatch => {
		await units.getUnit(unit_id,
			(_, {rows}) => {
				dispatch(setUnit(rows.item(0)))
			},
			(_, err)=> {alert('Error retrieving unit: ' + err)}
		)
  }
}

export const getModels = (unit_id) => {
  return async dispatch => {
		await models.getModelsByUnit(unit_id,
			(_, {rows}) => {
				dispatch(setModels(rows['_array']))
			},
			(_, err)=> {alert('Error retrieving unit: ' + err)}
		)
  }
}

export const createModel = (modelName, unit_id, army_id) => {
	return async dispatch => {
		await models.newModel(modelName, unit_id, army_id,
			(_, {insertId}) => {
				dispatch(addModel({
          id: insertId, 
          modelName
				}))
			},
			(_, err) => {alert('Error creating model: ' + err)}
		)
	}
}

const initialUnit = {
  unit: {},
  models: [],
}

export default function (state=initialUnit, action){
  switch(action.type){
    case SET_UNIT:
      return {
        ...state,
        unit: action.unit
      }
    
    case SET_MODELS:
      return {
        ...state,
        models: action.models
      }
    case ADD_MODEL:
      return {
        ...state,
        models: [
          ...state.models,
          action.model
        ],
      }
    default:
      return state
  }
}
