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


export default class App extends React.Component{

	constructor(props){
		super(props)
		this.state={
			tables: 0
		}
		this.incrementTables = this.incrementTables.bind(this)
	}

	incrementTables = () => {
		this.setState({
			tables: this.state.tables+1
		})
	}

	//Create databases if non-existent
	loadTables = async () => {
		dbInit.clearTables()
		dbInit.createArmyTable(this.incrementTables,true)
		dbInit.createUnitTable(this.incrementTables,true)
		dbInit.createModelTable(this.incrementTables,true)
		dbInit.createTaskTable(this.incrementTables,false)
		//dbInit.testArmyTable()
		//dbInit.testUnitTable()
		//dbInit.testModelTable()
		//dbInit.testTaskTable()
	}

	componentDidMount(){
		this.loadTables()
	}

	render(){
		if (this.state.tables>=4){
			return (
				<Provider store={store}>
						<SingleModel model_id={1} unitName={"Mork's Mighty Mushroom"}/>
				</Provider>
			)
		}else{
			return(
				<View>
					<Text>Loading tables...</Text>
				</View>
			)
		}
	}
}

