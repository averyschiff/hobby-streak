import * as SQLite from 'expo-sqlite'
const db = SQLite.openDatabase("hobby.db")

function newUnit(unitName, army_id, callback, errorHandler){
  db.transaction(
    tx => {
      tx.executeSql(
	      "INSERT INTO units (unitName, army_id) VALUES(?, ?)",
	      [unitName, army_id],
	      callback,
	      errorHandler
      )
    }
  )
}

function updateUnit(updateString, unit_id, callback, errorHandler){
	db.transaction(
		tx=>{
			tx.executeSql(
				"UPDATE units SET ? WHERE unit_id = ?",
				[updateString, unit_id],
				callback,
				errorHandler
			)
		}
	)
}

function getUnit(unit_id, callback, errorHandler){
	db.transaction(
		tx=>{
			tx.executeSql(
				"SELECT * FROM units WHERE unit_id = ?",
				[unit_id],
				callback,
				errorHandler
			)
		}
	)
}

function getUnitsByArmy(army_id, callback, errorHandler){
	db.transaction(
		tx=>{
			tx.executeSql(
				"SELECT * FROM units WHERE army_id = ?",
				[army_id],
				callback,
				errorHandler
			)
		}
	)
}


function getAllUnits(callback, errorHandler){
	db.transaction(
		tx=>{
			tx.executeSql(
				"SELECT * FROM units",
				[],
				callback,
				errorHandler
			)
		}
	)
}

function deleteUnit(unit_id, callback, errorHandler){
	db.transaction(
		tx=>{
			tx.executeSql(
				"DELETE FROM units WHERE unit_id = ?",
				[unit_id],
				callback,
				errorHandler
			)
		}
	)
}
function deleteUnitsByArmy(army_id, callback, errorHandler){
	db.transaction(
		tx=>{
			tx.executeSql(
				"DELETE FROM units WHERE army_id = ?",
				[army_id],
				callback,
				errorHandler
			)
		}
	)
}
export default{
	newUnit,
	updateUnit,
	getUnit,
	getUnitsByArmy,
	getAllUnits,
	deleteUnit,
	deleteUnitsByArmy
}
