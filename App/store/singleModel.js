import { ActionSheetIOS } from "react-native"
import {models, tasks} from "../db/"

const SET_MODEL = 'SET_MODEL'
const SET_TASKS = 'SET_TASKS'
const TOGGLE_TASK = 'TOGGLE_TASK'
const ADD_TASK = 'ADD_TASK'
const REMOVE_TASK = 'REMOVE_TASK'
const SET_NOTE = 'SET_NOTE'

const DEFAULT_TASKS = [
	"Cleaned", 
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

export const removeTask = (task_id) => ({
	type: REMOVE_TASK,
	task_id,
})

export const setNote = (note) => ({
	type: SET_NOTE,
	note
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

export const deleteTask = (task_id)=>{
	return async dispatch => {
		await tasks.deleteTask(task_id,
			(_, rows) => {
				dispatch(removeTask(task_id))
			},
			(_, err) => {alert('Error deleting task: ') + err}
		)
	}
}

export const updateNote = async (note, model_id) => {
	console.log('Note: ' + note)
	await models.updateModelNote(note, model_id,
		(_, rows) => {
			models.getModel(model_id,
				(_, {rows}) => {
					console.log(rows)
				},
				(_, {err}) => {
					console.log('fucky wucky: ' + err)
				}
			)
		},
		(_, err)=> {alert('Error updating note: ') + err}
	)
}

const initialModel = {
	model: {},
	tasks: [],
	progress: 0,
}

export default function (state=initialModel, action){
	let newProgress = 0
	let oldLength = state.tasks.length
	switch (action.type){
		case SET_MODEL:
			return {
				...state,
				model: action.model
			}
		case SET_TASKS:
			return {
				...state,
				tasks: action.tasks.map(task =>{
					if (task.complete) newProgress++
					return {
					...task,
					complete: task.complete==0?false:true
					}
				}),
				progress: newProgress/action.tasks.length
			}
		case ADD_TASK:
			newProgress = state.progress*oldLength/(oldLength+1)
			return {
				...state,
				tasks: [
					...state.tasks,
					action.task
				],
				progress: newProgress,
			}
		case TOGGLE_TASK:
			if (action.value) newProgress = state.progress + 1/state.tasks.length
			else newProgress = state.progress - 1/state.tasks.length
			return {
				...state,
				tasks: state.tasks.map(task=>{
					if (task.id==action.task_id){
						return {...task, complete: action.value}
					}else return task
				}),
				progress: newProgress
			}
		case REMOVE_TASK:
			return {
				...state,
				tasks: state.tasks.filter(task=>{
					if (task.id!=action.task_id){
						if (task.complete) newProgress++
						return true
					}else{
						return false
					}
				}),
				progress: oldLength>1?newProgress/(oldLength-1):0
			}
		case SET_NOTE:
			return {
				...state,
				model: {
					...state.model,
					note: action.note
				}
			}
		default:
			return state
	}
}
