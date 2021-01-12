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

function updateArmy(updateString, army_id, callback, errorHandler){
	db.transaction(
		tx=>{
			tx.executeSql(
				"UPDATE armies SET ? WHERE id = ?",
				[updateString, army_id],
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

export default{
	newArmy,
	updateArmy,
	getArmy,
	getAllArmies,
	deleteArmy
}
