import {models, tasks} from "../db/"

const SET_MODEL = 'SET_MODEL'
const SET_TASKS = 'SET_TASKS'

export const setModel = (model) => ({
	type: SET_MODEL,
	model
})

export const setTasks = (tasks) => ({
	type: SET_TASKS,
	tasks
})

export const getModel = (model_id) => {
	return async dispatch => {
		await models.getModel(model_id,
			(_, {rows}) => {
				dispatch(setModel(rows.item(0)))
			},
			(_, err)=> {alert('Error retrieving model: ' + err)}
		)
	}
}

export const getTasks = (model_id) => {
	return async dispatch => {
		await tasks.getTasksByModel(model_id,
			(_, {rows}) => {
				dispatch(setTasks(rows['_array']))
			},
			(_, err) => {alert('Error retrieving tasks: ' + err)}
		)
	}
}

const initialModel = {}

export default function (state=initialModel, action){
	switch (action.type){
		case SET_MODEL:
			return {
				...state,
				modelName: action.model.modelName
			}
		case SET_TASKS:
			return {
				...state,
				tasks: action.tasks
			}
		default:
			return state
	}
}
