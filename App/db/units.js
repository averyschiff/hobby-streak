import * as SQLite from 'expo-sqlite'
import BaseEndpoint from './BaseDB'
const db = SQLite.openDatabase("hobby.db")

class unitEndpoint extends BaseEndpoint{
	newUnit(unitName, army_id, callback, errorHandler){
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
}

export default new unitEndpoint("units")
