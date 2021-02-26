import {units, models, tasks} from "../db"

const SET_UNIT = 'SET_UNIT'
const SET_MODELS = 'SET_MODELS'
const ADD_MODEL = 'ADD_MODEL'
const REMOVE_MODEL = 'REMOVE_MODEL'
const SET_NOTE = 'SET_NOTE'
const SET_UNIT_TASKS = 'SET_UNIT_TASKS'
const SET_UNIT_TASK_STATUS = 'SET_UNIT_TASK_STATUS'
const ADD_UNIT_TASKS_TO_MODELS = 'ADD_UNIT_TASKS_TO_MODELS'
const REMOVE_TASK_FROM_UNIT = 'REMOVE_TASK_FROM_UNIT'

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

export const removeModel = (model_id) => ({
  type: REMOVE_MODEL,
  model_id
})

export const setNote = (note) => ({
	type: SET_NOTE,
	note
})

export const setTasks = (tasks) => ({
  type: SET_UNIT_TASKS,
  tasks
})

export const setTaskStatus = (task, status) => ({
  type: SET_UNIT_TASK_STATUS,
  task,
  status,
})

export const addTaskToModels = (models, task) => ({
  type: ADD_UNIT_TASKS_TO_MODELS,
  models,
  task
})

export const removeTaskFromUnit = (task) => ({
  type: REMOVE_TASK_FROM_UNIT,
  task
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
			(_, err)=> {alert('Error retrieving models: ' + err)}
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

export const deleteModel = (model_id) => {
  return async dispatch => {
    await tasks.deleteTasksByModel(model_id,
      await models.deleteModel(model_id,
        (_, {}) => {
          dispatch(removeModel(model_id))
        },
        (_, err) => {alert('Error deleting model: ' + err)}
      ),
      (_, err) => {alert('Error deleting tasks for model: ' + err)}
    )
  }
}

export const updateNote = async (note, unit_id) => {
	await units.updateUnitNote(note, unit_id,
		null,
		(_, err)=> {alert('Error updating note: ' + err)}
	)
}

export const getUnitTasks = (unit_id) => {
  return async dispatch => {
    await tasks.getTasksByUnit(unit_id,
      (_, {rows})=>{
        dispatch(setTasks(rows['_array']))
      },
      (_, err)=>{alert('Error fetching tasks: ' + err)}
    )
  }
}

export const updateTasksStatusByUnit = (status, unit_id, task) => {
  return async dispatch => {
    await tasks.updateTasksStatusByUnit(status, unit_id, task,
      (_, {rows})=>{
        dispatch(setTaskStatus(task, status))
      },
      (_, err)=>{alert('Error updating tasks: ' + err)}
    )
  }
}

export const addTasksThroughUnit = (unit_id, army_id, task, toAdd) => {
  return async dispatch => {
    if (toAdd.length>0){
      await tasks.addTasksThroughUnit(task, unit_id, army_id, toAdd,
        (_, {rows}) => {
          dispatch(addTaskToModels(toAdd, task))
        },
        (_, err)=>{alert('Error add tasks to models: ' + err)}
      )
    }
  }
}

export const deleteTaskByUnit = (unit_id, task) => {
  return async dispatch => {
    await tasks.deleteTaskByUnit(unit_id, task,
      (_, {rows}) => {
        dispatch(removeTaskFromUnit(task))
      },
      (_, err)=>{alert('Error removing task: ' + err)}
    )
  }
}

const initialUnit = {
  unit: {},
  models: [],
  tasks: {},
  taskId: 0,
}

export default function (state=initialUnit, action){
  let unitTasks = {}, oldTotal, taskName
  let id=state.taskId
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
    case REMOVE_MODEL:
      return {
        ...state,
        models: state.models.filter(model=>{
          return model.id!=action.model_id
        })
      }
		case SET_NOTE:
			return {
				...state,
				unit: {
					...state.unit,
					note: action.note
				}
			}
    case SET_UNIT_TASKS:
      if (action.tasks.length>0){
        action.tasks.map(task=>{
          taskName = task.task
          if (taskName in unitTasks){
            oldTotal = unitTasks[taskName].complete*unitTasks[taskName].count
            unitTasks[taskName].count++
            unitTasks[taskName].complete = (oldTotal + task.complete)/unitTasks[taskName].count
            unitTasks[taskName].modelIds.push(task.model_id)
          }else{
            unitTasks[taskName] = {
              id: id++,
              count: 1,
              complete: task.complete,
              modelIds: [task.model_id]
            }
          }
        })
      }else{
        DEFAULT_TASKS.map(task=>{
          unitTasks[task] = {
            id: id++,
            count: 0,
            complete: 0,
            modelIds: []
          }
        })
      }
      return {
        ...state,
        tasks: unitTasks,
        taskId: id
      }
    case SET_UNIT_TASK_STATUS:
      unitTasks = {...state.tasks}
      unitTasks[action.task] = {
        ...unitTasks[action.task],
        complete: action.status
      }
      return {
        ...state,
        tasks: unitTasks
      } 
    case ADD_UNIT_TASKS_TO_MODELS:

      let newModels = action.models

      taskName = action.task
      unitTasks = {...state.tasks}
      if (taskName in unitTasks){
        oldTotal = unitTasks[taskName].complete*unitTasks[taskName].count

        let newCount = unitTasks[taskName].count+newModels.length

        unitTasks[taskName] = {
          ...unitTasks[taskName],
          count: newCount,
          complete: oldTotal/newCount,
          modelIds: [...unitTasks[taskName].modelIds, ...newModels]
        }
      } else {
        unitTasks[taskName] = {
          id: id++,
          count: newModels.length,
          complete: 0,
          modelIds: newModels
        }
      }

      return {
        ...state,
        tasks: unitTasks,
        taskId: id
      } 
    case REMOVE_TASK_FROM_UNIT:
      unitTasks = {...state.tasks}
      delete unitTasks[action.task]
      return {
        ...state,
        tasks: unitTasks
      }
    default:
      return state
  }
}
