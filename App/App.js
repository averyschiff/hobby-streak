import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as SQLite from 'expo-sqlite'
const db = SQLite.openDatabase('hobby.db');
import styles from './styles'
import {Provider} from 'react-redux'

import {dbInit} from "./db"
import SingleModel from "./Components/SingleModel"
import store from './store'

export default function App() {


	//Create databases if non-existent
	React.useEffect(()=>{
		/*
		dbInit.clearTables()
		dbInit.createArmyTable(true)
		dbInit.createUnitTable(true)
		dbInit.createModelTable(true)
		dbInit.createTaskTable(true)
		*/
		//dbInit.testArmyTable()
		//dbInit.testUnitTable()
		//dbInit.testModelTable()
		dbInit.testTaskTable()
	})
	return (
		<Provider store={store}>
			<SingleModel model_id={1} unitName={"Mork's Mighty Mushroom"}/>
		</Provider>
	);
}

