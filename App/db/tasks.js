import * as SQLite from 'expo-sqlite'
const db = SQLite.openDatabase("hobby.db")
import BaseEndpoint from './BaseDB'

class taskEndpoint extends BaseEndpoint{

	newTask(task, model_id, unit_id, army_id, callback, errorHandler){
		db.transaction(
			tx => {
				tx.executeSql(
					"INSERT INTO tasks (task, model_id, unit_id, army_id) VALUES(?, ?, ?, ?)",
					[task, model_id, unit_id, army_id],
					callback,
					errorHandler
				)
			}
		)
	}
	newTasks(tasks, model_id, unit_id, army_id, callback, errorHandler){
		let argsArray = []
		let builtQuery = "INSERT INTO tasks (task, model_id, unit_id, army_id) VALUES "
		tasks.map(task=>{
			builtQuery += '(?, ?, ?, ?), '
			argsArray.push(task)
			argsArray.push(model_id)
			argsArray.push(unit_id)
			argsArray.push(army_id)
		})
		builtQuery = builtQuery.slice(0,-2)
		db.transaction(
			tx => {
				tx.executeSql(
					builtQuery,
					argsArray,
					callback,
					errorHandler
				)
			}
		)  
	}
	addTasksThroughUnit(task, unit_id, army_id, modelsToAdd, callback, errorHandler){
		let argsArray = []
		let builtQuery = "INSERT INTO tasks (task, model_id, unit_id, army_id) VALUES "
		modelsToAdd.map(modelId=>{
			builtQuery += '(?, ?, ?, ?), '
			argsArray.push(task)
			argsArray.push(modelId)
			argsArray.push(unit_id)
			argsArray.push(army_id)
		})
		builtQuery = builtQuery.slice(0,-2)
		db.transaction(
			tx => {
				tx.executeSql(
					builtQuery,
					argsArray,
					callback,
					errorHandler
				)
			}
		)  
	}
	updateTasksStatusByUnit(status, unit_id, task, callback, errorHandler){
		db.transaction(
			tx=>{
				tx.executeSql(
					"UPDATE tasks SET complete = ? " + 
					"WHERE unit_id = ? AND task = ?",
					[status, unit_id, task],
					callback,
					errorHandler
				)
			}
		)
	}
	deleteTaskByUnit(unit_id, task, callback, errorHandler){
		db.transaction(
			tx=>{
				tx.executeSql(
					"DELETE FROM tasks WHERE unit_id = ? AND task = ?",
					[unit_id, task],
					callback,
					errorHandler
				)
			}
		)
	}
}

export default new taskEndpoint("tasks")
