import React from 'react'
import {connect} from 'react-redux'
import styles from '../styles.js'
import {Text, View, FlatList, Button, TextInput} from 'react-native'
import {getModel, getTasks, updateTask, deleteTask, addTask} from '../store/singleModel'
import CheckBox from '@react-native-community/checkbox'
import ProgressBar from 'react-native-progress/Bar'

const Task = ({task, id, complete, updateTask, deleteTask, changeText}) => {
	const [newTask, onChangeText] = React.useState('');
	return(
		id!=-1?
			(
			<View style={styles.taskItem}>
				<View style={styles.taskBoxAndText}>
					<CheckBox
						disabled={false}
						value={complete}
						onValueChange={(newValue)=>updateTask(id, newValue)}
					/>
					<Text style={styles.task}>{task}</Text>
				</View>
				<Button
				title='x'
				onPress={()=>deleteTask(id)}
				/>
			</View>
			):
			(<View style={styles.taskItem}>
				<TextInput
				style={{ height: 20, 
					borderColor: 'gray', 
					borderWidth: 1,
					width: 140}}
				value={newTask}
				onChangeText={text=>onChangeText(text)}
				/>
				</View>)
	)
}

export class SingleModel extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			newTask: ''
		}
		this.onChangeText = this.onChangeText.bind(this)
	}
	async componentDidMount(){
		await this.props.getModel(this.props.model_id)
		await this.props.getTasks(this.props.model_id)
	}

	renderItem = ({item}) => (
		<Task task={item.task} 
		complete={item.complete} 
		id={item.id}
		updateTask={this.props.updateTask}
		deleteTask={this.props.deleteTask}
		changeText={this.changeText}/>
	)

	onChangeText = (text) => {
		this.setState({
			newTask: text
		})
	}

	render(){
		return(
			this.props.model.modelName?
				(<View style={styles.singleModel}>
					<View style={styles.modelText}>
						<Text style={styles.modelName}>{this.props.model.modelName}</Text>
						<Text>{this.props.unitName}</Text>
					</View>
					<ProgressBar progress={this.props.progress} width={300}/>
					<FlatList
						data={[...this.props.tasks,
							{task: this.state.newTask,
							id: -1,
							complete: false,
							}
						]}
						renderItem ={this.renderItem}
						keyExtractor={item=>item.id.toString()}
						columnWrapperStyle={styles.taskList}
						numColumns={2}
					/>
				</View>):
				(<View><Text>Single Model View</Text></View>)
			)
	}
}

const mapState = state => ({
	model: state.singleModel.model,
	tasks: state.singleModel.tasks,
	progress: state.singleModel.progress,
})

const mapDispatch = dispatch => ({
	getModel: (model_id)=>{
		dispatch(getModel(model_id))
	},
	getTasks: (model_id)=>{
		dispatch(getTasks(model_id))
	},
	updateTask: (task_id, value)=>{
		dispatch(updateTask(task_id, value))
	},
	deleteTask: (task_id)=>{
		dispatch(deleteTask(task_id))
	},
	createTask: (task_id, model_id, unit_id, army_id)=>{
		dispatch(addTask(task_id, model_id, unit_id, army_id))
	}
})

export default connect(mapState, mapDispatch)(SingleModel)
