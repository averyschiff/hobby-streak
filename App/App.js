import React from 'react';
import { Text, View } from 'react-native';
import {Provider} from 'react-redux'
import {dbInit} from "./db"
import SingleModel from "./Components/SingleModel"
import store from './store'
import {MenuProvider} from 'react-native-popup-menu'


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

	dbTest = () => {
		//dbInit.testArmyTable()
		//dbInit.testUnitTable()
		dbInit.testModelTable()
		//dbInit.testTaskTable()
	}

	//Create databases if non-existent
	loadTables = () => {

		dbInit.clearTables()
		dbInit.createArmyTable(this.incrementTables,true)
		dbInit.createUnitTable(this.incrementTables,true)
		dbInit.createModelTable(this.incrementTables,false)
		dbInit.createTaskTable(this.incrementTables,false)

		this.dbTest()
	}

	componentDidMount(){
		this.loadTables()
	}

	render(){
		if (this.state.tables>=4){
			return (
				<Provider store={store}>
						<MenuProvider>
							<SingleModel model_id={1} unitName={"Mork's Mighty Mushroom"}/>
						</MenuProvider>
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

