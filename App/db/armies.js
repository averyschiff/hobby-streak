import * as SQLite from 'expo-sqlite'
const db = SQLite.openDatabase("hobby.db")
import BaseEndpoint from './BaseDB'

class armyEndpoint extends BaseEndpoint{
	newArmy(armyName, callback, errorHandler){
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
}

export default new armyEndpoint("armies")
