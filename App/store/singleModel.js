import {models, tasks} from "../db/"

const SET_MODEL = 'SET_MODEL'
const SET_MODEL_NAME = 'SET_MODEL_NAME'
const SET_TASKS = 'SET_TASKS'
const TOGGLE_TASK = 'TOGGLE_TASK'
const ADD_TASK = 'ADD_TASK'
const REMOVE_TASK = 'REMOVE_TASK'
const SET_NOTE = 'SET_NOTE'
const SET_TAGS = 'SET_MODEL_TAGS'

const RESET_MODEL = 'RESET_MODEL'

export const setModel = (model) => ({
	type: SET_MODEL,
	model
})

export const setModelName = (modelName) => ({
	type: SET_MODEL_NAME,
	modelName
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

export const setTags = (tags) => ({
	type: SET_TAGS,
	tags
})

export const resetModel = () => ({
	type: RESET_MODEL
})

export const getModel = (model_id) => {
	return async dispatch => {
		await models.getEntry(model_id,
			(_, {rows}) => {
				dispatch(setModel(rows.item(0)))
			},
			(_, err)=> {alert('Error retrieving model: ' + err)}
		)
	}
}

//TODO: Remove defaultTasks
export const getTasks = (model_id, defaultTasks) => {
	return async dispatch => {
		await tasks.getEntryByHigher("model",model_id,
			(_, {rows}) => {
				let allTasks = rows['_array']
				let completion  = 0
				allTasks.forEach(task=>{
					if (task.complete) completion++
				})
				completion = completion/allTasks.length
				models.updateVal('completion', completion, model_id,
					(_, {rows})=>{
						dispatch(setTasks(allTasks))
					},
					(_, err)=>{alert('Error updating model completion: ' + err)}
					)
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
			await tasks.updateVal("complete", 1, task_id,
				(_, rows) => {
					dispatch(toggleTask(task_id, value))
				},
				(_, err) => {alert('Error updating task: ' + err)}
			)
		}else{
			await tasks.updateVal("complete", 0, task_id,
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
		await tasks.deleteEntry(task_id,
			(_, rows) => {
				dispatch(removeTask(task_id))
			},
			(_, err) => {alert('Error deleting task: ') + err}
		)
	}
}

export const updateNote = async (note, model_id) => {
	await models.updateVal('note', note, model_id,
		null,
		(_, err)=> {alert('Error updating note: ' + err)}
	)
}

export const updateModelName = (newName, model_id) => {
	return async dispatch => {
		await models.updateVal('modelName', newName, model_id,
			(_, {rows}) => {
				dispatch(setModelName(newName))
			},
			(_, err) => {alert('Error updating name: ') + err}
			)
	}
}

export const updateTags = (tags, oldTags, model_id) => {
	let newTags = ''
	if (oldTags) newTags = oldTags + tags + ', '
	else if (tags) newTags = tags + ', '
	return async dispatch => {
		await models.updateVal('tags', newTags, model_id,
			(_, rows) => {
				dispatch(setTags(newTags))
			},
			(_, err)=> {
				console.log('Error updating tags: ' + err)
			}
		)
	}
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
		
		case SET_MODEL_NAME:
			return {
				...state,
				model: {
					...state.model,
					modelName: action.modelName
				}
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
		
		case SET_TAGS:
			return {
				...state,
				model: {
					...state.model,
					tags: action.tags
				},
			}

		case RESET_MODEL:
			return initialModel
		default:
			return state
	}
}
