import * as SQLite from 'expo-sqlite'
const db = SQLite.openDatabase('hobby.db');

function clearTables(){
	db.transaction(tx => {
		tx.executeSql("DROP TABLE armies")
		tx.executeSql("DROP TABLE units")
		tx.executeSql("DROP TABLE models")
		tx.executeSql("DROP TABLE tasks")
	})
}


const createSampleTable = (sample, insert, insertArr) => {
	if (sample){
		return (tx, rows) => {
			tx.executeSql(insert,
				insertArr,
				null,
				(tx, err) => alert('error creating sample: ' + err)
			)
		}
	} else return null
}

const createTable = (sample, create, insert, insertArr, select) => {
	db.transaction(tx => {
		tx.executeSql(create, 
			[], 
			createSampleTable(sample, insert, insertArr),
			(tx, err) => {
				alert('Error creating table: ' + err)
			})
	})
} 

const testTable = (select) => {
	db.transaction(tx => {
		tx.executeSql(select,
			[],
			(tx, rows) => {
				console.log(rows)
			},
			(tx, err) => {
				alert("error fetching sample: " + err)
			})
	})
}

function createArmyTable(sample=false){
	const createArmies = 
		"CREATE TABLE IF NOT EXISTS armies " +
			"(id INTEGER " +
				"PRIMARY KEY NOT NULL, " +
			"armyName VARCHAR " +
				"NOT NULL, " +
			"completion REAL " +
				"DEFAULT 0.0 CHECK (completion >= 0.0 AND completion <= 1.0))"
	const insertArmy = "INSERT INTO armies (armyName) values(?)"
	const insertArmyArr = ["sampleArmy"]
	createTable(sample, createArmies, insertArmy, insertArmyArr)
}

function testArmyTable(){
	const selectArmy = "SELECT * FROM armies"
	testTable(selectArmy)
}

function createUnitTable(sample=false){
	const createUnits = 
		"CREATE TABLE IF NOT EXISTS units " +
			"(id INTEGER " +
				"PRIMARY KEY NOT NULL, " +
			"unitName VARCHAR " +
				"NOT NULL, " +
			"completion REAL " +
				"DEFAULT 0.0 CHECK (completion >= 0.0 AND completion <= 1.0), " +
			"army_id INTEGER " +
				"NOT NULL, " +
			"FOREIGN KEY (army_id) " +
				"REFERENCES armies (army_id)" +
			")"
	const insertUnit = "INSERT INTO units (unitName, army_id) values(?, ?)"
	const insertUnitArr = ["Mork's Mighty Mushroom", 1]
	createTable(sample, createUnits, insertUnit, insertUnitArr)
}

function testUnitTable(){
	const selectUnit = "SELECT * FROM units"
	testTable(selectUnit)
}
function createModelTable(sample=false){
	const createModels = 
		"CREATE TABLE IF NOT EXISTS models " +
			"(id INTEGER " +
				"PRIMARY KEY NOT NULL, " +
			"modelName VARCHAR " +
				"NOT NULL, " +
			"completion REAL " +
				"DEFAULT 0.0 CHECK (completion >= 0.0 AND completion <= 1.0), " +
			"army_id INTEGER " +
				"NOT NULL, " +
			"unit_id INTEGER " +
				"NOT NULL, " +
			"FOREIGN KEY (army_id) " +
				"REFERENCES armies (army_id)," +
			"FOREIGN KEY (unit_id) " +
				"REFERENCES units (unit_id)" +
			")"
	const insertModel = "INSERT INTO models (modelName, army_id, unit_id) values(?, ?, ?)"
	const insertModelArr = ["MMM Model 1", 1, 1]
	createTable(sample, createModels, insertModel, insertModelArr)
}

function testModelTable(){
	const selectModel = "SELECT * FROM models"
	testTable(selectModel)
}
function createTaskTable(sample=false){
	const createTasks = 
		"CREATE TABLE IF NOT EXISTS tasks " +
			"(id INTEGER " +
				"PRIMARY KEY NOT NULL, " +
			"task VARCHAR " +
				"NOT NULL, " +
			"complete INTEGER " +
				"DEFAULT 0 CHECK (complete == 0 OR complete == 1), " +
			"army_id INTEGER " +
				"NOT NULL, " +
			"unit_id INTEGER " +
				"NOT NULL, " +
			"model_id INTEGER " +
				"NOT NULL, " +
			"FOREIGN KEY (army_id) " +
				"REFERENCES armies (army_id), " +
			"FOREIGN KEY (unit_id) " +
				"REFERENCES units (unit_id), " +
			"FOREIGN KEY (model_id) " +
				"REFERENCES models (model_id)" +
			")"
	const insertTask = "INSERT INTO tasks (task, army_id, unit_id, model_id) "+ 
		"values (?, 1, 1, 1), "+
		"(?, 1, 1, 1), "+
		"(?, 1, 1, 1), "+
		"(?, 1, 1, 1), "+
		"(?, 1, 1, 1), "+
		"(?, 1, 1, 1), "+
		"(?, 1, 1, 1), "+
		"(?, 1, 1, 1)"
	const insertTaskArr = ["Unfucked", "Built", "Primed", "Basecoat", "Painted", "Based", "Magnetized", "Lacquered"]
	createTable(sample, createTasks, insertTask, insertTaskArr)
}


function testTaskTable(){
	const selectTask = "SELECT * FROM tasks"
	testTable(selectTask)
}

export default {
	createArmyTable,
	testArmyTable,
	createUnitTable,
	testUnitTable,
	createModelTable,
	testModelTable,
	createTaskTable,
	testTaskTable,
	clearTables
}
