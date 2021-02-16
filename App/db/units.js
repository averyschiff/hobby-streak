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

function updateUnitNote(note, unit_id, callback, errorHandler){
	db.transaction(
		tx=>{
			tx.executeSql(
				"UPDATE units SET note = ? WHERE id = ?",
				[note, unit_id],
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
				"SELECT * FROM units WHERE id = ?",
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
				"DELETE FROM units WHERE id = ?",
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

function addNotesColumn(callback, errorHandler){
	const query = "ALTER TABLE units " + 
	"ADD COLUMN note TEXT"
	db.transaction(
		tx=>{
			tx.executeSql(
				query,
				[],
				callback,
				errorHandler
			)
		}
	)
}
export default{
	newUnit,
	updateUnitNote,
	getUnit,
	getUnitsByArmy,
	getAllUnits,
	deleteUnit,
	deleteUnitsByArmy,
	addNotesColumn,
}
