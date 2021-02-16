import * as SQLite from 'expo-sqlite'
const db = SQLite.openDatabase("hobby.db")

function newArmy(armyName, callback, errorHandler){
  db.transaction(
    tx => {
      tx.executeSql(
	      "INSERT INTO armies (armyName) VALUES(?)",
	      [armyName],
	      callback,
	      errorHandler
      )
    }
  )
}

function updateArmyNote(note, army_id, callback, errorHandler){
	db.transaction(
		tx=>{
			tx.executeSql(
				"UPDATE armies SET note = ? WHERE id = ?",
				[note, army_id],
				callback,
				errorHandler
			)
		}
	)
}

function getArmy(army_id, callback, errorHandler){
	db.transaction(
		tx=>{
			tx.executeSql(
				"SELECT * FROM armies WHERE id = ?",
				[army_id],
				callback,
				errorHandler
			)
		}
	)
}

function getAllArmies(callback, errorHandler){
	db.transaction(
		tx=>{
			tx.executeSql(
				"SELECT * FROM armies",
				[],
				callback,
				errorHandler
			)
		}
	)
}

function deleteArmy(army_id, callback, errorHandler){
	db.transaction(
		tx=>{
			tx.executeSql(
				"DELETE FROM armies WHERE id = ?",
				[army_id],
				callback,
				errorHandler
			)
		}
	)
}

function addNotesColumn(callback, errorHandler){
	const query = "ALTER TABLE armies " + 
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
	newArmy,
	updateArmyNote,
	getArmy,
	getAllArmies,
	deleteArmy,
	addNotesColumn,
}
