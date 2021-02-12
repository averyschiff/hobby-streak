import React from 'react';
import { Text, View } from 'react-native';
import {Provider} from 'react-redux'
import {dbInit} from "./db"
import SingleModel from "./Components/SingleModel"
import SingleUnit from "./Components/SingleUnit"
import SingleArmy from "./Components/SingleArmy"
import AllArmies from "./Components/AllArmies"
import store from './store'
import {MenuProvider} from 'react-native-popup-menu'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'

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
		//dbInit.testModelTable()
		//dbInit.testTaskTable()
	}

	//Create databases if non-existent
	loadTables = () => {

		dbInit.clearTables()
		dbInit.createArmyTable(this.incrementTables,false)
		dbInit.createUnitTable(this.incrementTables,false)
		dbInit.createModelTable(this.incrementTables,false)
		dbInit.createTaskTable(this.incrementTables,false)

		this.dbTest()
	}

	componentDidMount(){
		this.loadTables()
	}

	render(){
		const Stack = createStackNavigator();
		if (this.state.tables>=4){
			return (
				<Provider store={store}>
						<MenuProvider>
							<NavigationContainer>
								<Stack.Navigator initialRouteName="AllArmies">
									<Stack.Screen name="AllArmies">
										{props=> <AllArmies {...props}/>}
									</Stack.Screen>
									<Stack.Screen name="Army" component={SingleArmy}/>
									<Stack.Screen name="Unit" component={SingleUnit}/>
									<Stack.Screen name="Model" component={SingleModel}/>
								</Stack.Navigator>
							</NavigationContainer>
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

