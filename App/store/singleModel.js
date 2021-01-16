import {models, tasks} from "../db/"

const SET_MODEL = 'SET_MODEL'
const SET_TASKS = 'SET_TASKS'
const TOGGLE_TASK = 'TOGGLE_TASK'
const ADD_TASK = 'ADD_TASK'

const DEFAULT_TASKS = [
	"Unfucked", 
	"Built", 
	"Primed", 
	"Basecoat", 
	"Painted", 
	"Based", 
	"Magnetized", 
	"Lacquered",
]

export const setModel = (model) => ({
	type: SET_MODEL,
	model
})

export const setTasks = (tasks) => ({
	type: SET_TASKS,
	tasks
})

export const addTask = (task) => ({
	type: ADD_TASK,
	task
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
				if(rows['_array'].length==0){
					//create default tasks
					DEFAULT_TASKS.forEach(task=>{
						dispatch(createTask(task, model_id, 1, 1))
					})
				}else{
					dispatch(setTasks(rows['_array']))
				}
			},
			(_, err) => {alert('Error retrieving tasks: ' + err)}
		)
	}
}

export const createTask = (taskName, model_id, unit_id, army_id) => {
	return async dispatch => {
		await tasks.newTask(taskName, model_id, unit_id, army_id,
			(_, {insertId}) => {
				dispatch(addTask({
					id: insertId, 
					task: taskName, 
					complete: 0
				}))
			},
			(_, err) => {alert('Error creating task: ' + err)}
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

const initialModel = {
	model: {},
	tasks: [],
}

export default function (state=initialModel, action){
	switch (action.type){
		case SET_MODEL:
			return {
				...state,
				model: action.model
			}
		case SET_TASKS:
			return {
				...state,
				tasks: action.tasks.map(task =>({
					...task,
					complete: task.complete==0?false:true
				}))
			}
		case ADD_TASK:
			return {
				...state,
				tasks: [
					...state.tasks,
					action.task
				]
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
