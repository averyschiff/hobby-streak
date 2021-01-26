import * as SQLite from 'expo-sqlite'
const db = SQLite.openDatabase("hobby.db")

function newModel(modelName, unit_id, army_id, callback, errorHandler){
  db.transaction(
    tx => {
      tx.executeSql(
	      "INSERT INTO models (modelName, unit_id, army_id) VALUES(?, ?, ?)",
	      [modelName, unit_id, army_id],
	      callback,
	      errorHandler
      )
    }
  )
}

function updateModelNote(note, model_id, callback, errorHandler){
	db.transaction(
		tx=>{
			tx.executeSql(
				"UPDATE models SET note = ? WHERE id = ?",
				[note, model_id],
				callback,
				errorHandler
			)
		}
	)
}

function updateModelTags(tags, model_id, callback, errorHandler){
	db.transaction(
		tx=>{
			tx.executeSql(
				"UPDATE models SET tags = ? where id = ?",
				[tags, model_id],
				callback,
				errorHandler
			)
		}
	)
}

function getModel(model_id, callback, errorHandler){
	db.transaction(
		tx=>{
			tx.executeSql(
				"SELECT * FROM models WHERE id = ?",
				[model_id],
				callback,
				errorHandler
			)
		}
	)
}

function getModelsByUnit(unit_id, callback, errorHandler){
	db.transaction(
		tx=>{
			tx.executeSql(
				"SELECT * FROM models WHERE unit_id = ?",
				[unit_id],
				callback,
				errorHandler
			)
		}
	)
}

function getModelsByArmy(army_id, callback, errorHandler){
	db.transaction(
		tx=>{
			tx.executeSql(
				"SELECT * FROM models WHERE army_id = ?",
				[army_id],
				callback,
				errorHandler
			)
		}
	)
}


function getAllModels(callback, errorHandler){
	db.transaction(
		tx=>{
			tx.executeSql(
				"SELECT * FROM models",
				[],
				callback,
				errorHandler
			)
		}
	)
}

function deleteModel(model_id, callback, errorHandler){
	db.transaction(
		tx=>{
			tx.executeSql(
				"DELETE FROM models WHERE id = ?",
				[model_id],
				callback,
				errorHandler
			)
		}
	)
}
function deleteModelsByUnit(unit_id, callback, errorHandler){
	db.transaction(
		tx=>{
			tx.executeSql(
				"DELETE FROM models WHERE unit_id = ?",
				[unit_id],
				callback,
				errorHandler
			)
		}
	)
}
function deleteModelsByArmy(army_id, callback, errorHandler){
	db.transaction(
		tx=>{
			tx.executeSql(
				"DELETE FROM models WHERE army_id = ?",
				[army_id],
				callback,
				errorHandler
			)
		}
	)
}
export default{
	newModel,
	updateModelNote,
	updateModelTags,
	getModel,
	getModelsByUnit,
	getModelsByArmy,
	getAllModels,
	deleteModel,
	deleteModelsByUnit,
	deleteModelsByArmy
}
