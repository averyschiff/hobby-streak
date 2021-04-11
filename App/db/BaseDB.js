import * as SQLite from 'expo-sqlite'
const db = SQLite.openDatabase("hobby.db")

export default class BaseEndpoint{
  constructor(table){
    this.table = table
  }

  executeQuery(query, args, callback, errorHandler){
    db.transaction(
      tx=>{
        tx.executeSql(
          query,
          args,
          callback,
          errorHandler
        )
      }
    )
  }

  updateVal(val, newVal, id, callback, errorHandler){
    const query = `UPDATE ${this.table} SET ${val} = ? WHERE id = ?`
    this.executeQuery(
      query,
      [newVal, id],
      callback,
      errorHandler
    )
  }

  updateNote(note, id, callback, errorHandler){
    const query = `UPDATE ${this.table} SET note = ? WHERE id = ?`
    this.executeQuery(
      query,
      [note, id],
      callback,
      errorHandler
    )
  }

  updateTags(tags, id, callback, errorHandler){
    const query = `UPDATE ${this.table} SET tags = ? WHERE id = ?`
    this.executeQuery(
      query,
      [tags, id],
      callback,
      errorHandler
    )
  }

  getEntry(id, callback, errorHandler){
    const query = `SELECT * FROM ${this.table} WHERE id = ?`
    this.executeQuery(
      query,
      [id],
      callback,
      errorHandler
    )
  }

  getAllEntries(callback, errorHandler){
    const query = `SELECT * FROM ${this.table}`
    this.executeQuery(
      query,
      [],
      callback,
      errorHandler
    )
  }

  getEntryByHigher(higherTable, higherId, callback, errorHandler){
    const query = `SELECT * FROM ${this.table} WHERE ${higherTable}_id = ?`
    this.executeQuery(
      query,
      [higherId],
      callback,
      errorHandler
    )
  }

  deleteEntry(id, callback, errorHandler){
    const query = `DELETE FROM ${this.table} WHERE id = ?`
    this.executeQuery(
      query,
      [id],
      callback,
      errorHandler
    )
  }

  deleteEntryByHigher(higherTable, higherId, callback, errorHandler){
    const query = `DELETE FROM ${this.table} WHERE ${higherTable}_id = ?`
    this.executeQuery(
      query,
      [higherId],
      callback,
      errorHandler
    )
  }

}
