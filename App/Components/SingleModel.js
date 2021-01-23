import React from 'react'
import {connect} from 'react-redux'
import styles from '../styles.js'
import {Text, View, FlatList, TextInput, KeyboardAvoidingView, Platform} from 'react-native'
import {
	getModel, 
	getTasks, 
	updateTask, 
	deleteTask, 
	createTask,
	setNote,
	updateNote} from '../store/singleModel'
import ProgressBar from 'react-native-progress/Bar'
import Task from './Task'


export class SingleModel extends React.Component{
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
		createTask={(taskName) => this.props.createTask(
			taskName,
			this.props.model.id,
			this.props.model.unit_id,
			this.props.model.army_id,
		)}
		/>
	)


	render(){
		return(
			this.props.model.modelName?
				(<KeyboardAvoidingView 
					behavior="position"
				>
					<View style={styles.singleModel}>
						<View style={styles.modelText}>
							<Text style={styles.modelName}>{this.props.model.modelName}</Text>
							<Text>{this.props.unitName}</Text>
						</View>
						<ProgressBar progress={this.props.progress} width={300}/>
						<View
						style={{height: 300}}
						>
							<FlatList
								data={[...this.props.tasks,
									{task: '',
									id: -1,
									complete: false,
									}
								]}
								renderItem ={this.renderItem}
								keyExtractor={item=>item.id.toString()}
								columnWrapperStyle={styles.taskList}
								numColumns={2}
								removeClippedSubviews={false}
							/>
						</View>
						<View>
						<TextInput
						style={{
							height: 200,
							borderColor: 'black',
							borderWidth: 1,
							width: 300,
							padding: 10,
							//THIS WILL BREAK IN IOS
							textAlignVertical: 'top'
						}}
						placeholder={"Notes..."}
						multiline={true}
						value={this.props.model.note}
						onChangeText = {text=>{this.props.setNote(text)}}
						onEndEditing={()=>{
							updateNote(this.props.model.note, this.props.model.id)
						}}
						/>
						</View>
					</View>
				</KeyboardAvoidingView>):
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
		dispatch(createTask(task_id, model_id, unit_id, army_id))
	},
	setNote: (note)=>{
		dispatch(setNote(note))
	}
})

export default connect(mapState, mapDispatch)(SingleModel)
