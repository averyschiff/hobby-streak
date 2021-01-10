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

function updateTask(updateString, task_id, callback, errorHandler){
	db.transaction(
		tx=>{
			tx.executeSql(
				"UPDATE tasks SET ? WHERE task_id = ?",
				[updateString, task_id],
				callback,
				errorHandler
			)
		}
	)
}

function updateTasksByUnit(updateString, unit_id, callback, errorHandler){
	db.transaction(
		tx=>{
			tx.executeSql(
				"UPDATE tasks SET ? WHERE unit_id = ?",
				[updateString, unit_id],
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
				"SELECT * FROM tasks WHERE task_id = ?",

				[task_id],
				callback,
				errorHandler
			)
		}
	)
}

function getsTasksByModel(model_id, callback, errorHandler){
	db.transaction(
		tx=>{
			tx.executeSql(
				"SELECT * FROM tasks WHERE model_id = ?",
				[model_id],
				callback,
				errorHandler
			)
		}
	)
}

function getsTasksByUnit(unit_id, callback, errorHandler){
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

function getsTasksByArmy(army_id, callback, errorHandler){
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
				"DELETE FROM tasks WHERE task_id = ?",
				[model_id],
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
	updateTask,
	updateTasksByUnit,
	updateTasksByArmy,
	getTask,
	getTasksByModel,
	getTasksByUnit,
	getTasksByArmy,
	getAllTasks,
	deleteTask,
	deleteTasksByModel,
	deleteTasksByUnit,
	deleteTasksByArmy
}
