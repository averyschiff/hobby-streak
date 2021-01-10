import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as SQLite from 'expo-sqlite'
const db = SQLite.openDatabase('hobby.db');

import {dbInit} from "./db"

export default function App() {


	//Create databases if non-existent
	React.useEffect(()=>{
		dbInit.clearTables()
		dbInit.createArmyTable(true)
		dbInit.testArmyTable()
		dbInit.createUnitTable(true)
		dbInit.testUnitTable()
		dbInit.createModelTable(true)
		dbInit.testModelTable()
		dbInit.createTaskTable(true)
		dbInit.testTaskTable()
	})
	return (
		<View style={styles.container}>
		<Text>Welcome to our Hobby Streak app!</Text>
		<StatusBar style="auto" />
		</View>
	);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
