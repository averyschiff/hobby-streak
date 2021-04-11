import * as SQLite from 'expo-sqlite'
import BaseEndpoint from './BaseDB'
const db = SQLite.openDatabase("hobby.db")

class modelEndpoint extends BaseEndpoint{
	newModel = (modelName, unit_id, army_id, callback, errorHandler) => {
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
}



export default new modelEndpoint("models")
