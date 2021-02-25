import * as SQLite from 'expo-sqlite'
const db = SQLite.openDatabase("hobby.db")

function addTasksThroughUnit(unit_id, task, callback, errorHandler){
  const query = "SELECT model_id " + 
    "FROM tasks " +
    "WHERE task = ? AND unit_id = ?"
  db.transaction(
    tx => {
      tx.executeSql(
        query,
        [task, unit_id],
        callback,
        errorHandler
      )
    }
  )
}

export default{
  addTasksThroughUnit
}
