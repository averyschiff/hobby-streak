import {models, tasks} from "../db/"

const SET_MODEL = 'SET_MODEL'
const SET_TASKS = 'SET_TASKS'
const TOGGLE_TASK = 'TOGGLE_TASK'

export const setModel = (model) => ({
	type: SET_MODEL,
	model
})

export const setTasks = (tasks) => ({
	type: SET_TASKS,
	tasks
})

export const toggleTask = (task_id, value) => ({
	type: TOGGLE_TASK,
	task_id,
	value
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

export const updateTask = (task_id, value) => {
	return async dispatch => {
		if (value){
			await tasks.updateTaskTrue(task_id,
				(_, rows) => {
					dispatch(toggleTask(task_id, value))
				},
				(_, err) => {alert('Error updating task: ' + err)}
			)
		}else{
			await tasks.updateTaskFalse(task_id,
				(_, rows) => {
					dispatch(toggleTask(task_id, value))
				},
				(_, err) => {alert('Error updating task: ' + err)}
			)
		}
	}
}

const initialModel = {}

export default function (state=initialModel, action){
	console.log(action.type)
	switch (action.type){
		case SET_MODEL:
			return {
				...state,
				modelName: action.model.modelName
			}
		case SET_TASKS:
			return {
				...state,
				tasks: action.tasks.map(task =>({
					...task,
					complete: task.complete==0?false:true
				}))
			}
		case TOGGLE_TASK:
			return {
				...state,
				tasks: state.tasks.map(task=>{
					if (task.id==action.task_id){
						return {...task, complete: action.value}
					}else return task
				})
			}
		default:
			return state
	}
}
