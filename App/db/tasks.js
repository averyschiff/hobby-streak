import * as SQLite from 'expo-sqlite'
const db = SQLite.openDatabase("hobby.db")

function newTask(task, model_id, unit_id, army_id, callback, errorHandler){
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

function newTasks(tasks, model_id, unit_id, army_id, callback, errorHandler){
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

function addTasksThroughUnit(task, unit_id, army_id, modelsToAdd, callback, errorHandler){
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

function updateTaskTrue(task_id, callback, errorHandler){
	db.transaction(
		tx=>{
			tx.executeSql(
				"UPDATE tasks SET complete = 1 WHERE id = ?",
				[task_id],
				callback,
				errorHandler
			)
		}
	)
}

function updateTaskFalse(task_id, callback, errorHandler){
	db.transaction(
		tx=>{
			tx.executeSql(
				"UPDATE tasks SET complete = 0 WHERE id = ?",
				[task_id],
				callback,
				errorHandler
			)
		}
	)
}

function updateTasksStatusByUnit(status, unit_id, task, callback, errorHandler){
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

function updateTasksByArmy(updateString, army_id, callback, errorHandler){
	db.transaction(
		tx=>{
			tx.executeSql(
				"UPDATE tasks SET ? WHERE army_id = ?",
				[updateString, army_id],
				callback,
				errorHandler
			)
		}
	)
}

function getTask(task_id, callback, errorHandler){
	db.transaction(
		tx=>{
			tx.executeSql(
				"SELECT * FROM tasks WHERE id = ?",

				[task_id],
				callback,
				errorHandler
			)
		}
	)
}

function getTasksByModel(model_id, callback, errorHandler){
	db.transaction(
		tx=>{
			tx.executeSql(
				"SELECT id, task, complete FROM tasks WHERE model_id = ?",
				[model_id],
				callback,
				errorHandler
			)
		}
	)
}

function getTasksByUnit(unit_id, callback, errorHandler){
	db.transaction(
		tx=>{
			tx.executeSql(
				"SELECT * FROM tasks WHERE unit_id = ?",
				[unit_id],
				callback,
				errorHandler
			)
		}
	)
}

function getTasksByArmy(army_id, callback, errorHandler){
	db.transaction(
		tx=>{
			tx.executeSql(
				"SELECT * FROM tasks WHERE army_id = ?",
				[army_id],
				callback,
				errorHandler
			)
		}
	)
}

function getAllTasks(callback, errorHandler){
	db.transaction(
		tx=>{
			tx.executeSql(
				"SELECT * FROM tasks",
				[],
				callback,
				errorHandler
			)
		}
	)
}

function deleteTask(task_id, callback, errorHandler){
	db.transaction(
		tx=>{
			tx.executeSql(
				"DELETE FROM tasks WHERE id = ?",
				[task_id],
				callback,
				errorHandler
			)
		}
	)
}
function deleteTasksByModel(model_id, callback, errorHandler){
	db.transaction(
		tx=>{
			tx.executeSql(
				"DELETE FROM tasks WHERE model_id = ?",
				[model_id],
				callback,
				errorHandler
			)
		}
	)
}
function deleteTaskByUnit(unit_id, task, callback, errorHandler){
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
function deleteTasksByUnit(unit_id, callback, errorHandler){
	db.transaction(
		tx=>{
			tx.executeSql(
				"DELETE FROM tasks WHERE unit_id = ?",
				[unit_id],
				callback,
				errorHandler
			)
		}
	)
}
function deleteTasksByArmy(army_id, callback, errorHandler){
	db.transaction(
		tx=>{
			tx.executeSql(
				"DELETE FROM tasks WHERE army_id = ?",
				[army_id],
				callback,
				errorHandler
			)
		}
	)
}
export default{
	newTask,
	newTasks,
	addTasksThroughUnit,
	updateTaskTrue,
	updateTaskFalse,
	updateTasksStatusByUnit,
	updateTasksByArmy,
	getTask,
	getTasksByModel,
	getTasksByUnit,
	getTasksByArmy,
	getAllTasks,
	deleteTask,
	deleteTasksByModel,
	deleteTaskByUnit,
	deleteTasksByUnit,
	deleteTasksByArmy
}
