import React from 'react'
import {connect} from 'react-redux'
import styles from '../styles.js'
import {Text, View, FlatList} from 'react-native'
import {getModel, getTasks, updateTask} from '../store/singleModel'
import CheckBox from '@react-native-community/checkbox'
import ProgressBar from 'react-native-progress/Bar'

const Task = ({task, id, complete, updateTask}) => (
	<View style={styles.taskItem}>
		<CheckBox
			disabled={false}
			value={complete}
			onValueChange={(newValue)=>updateTask(id, newValue)}
		/>
		<Text style={styles.task}>{task}</Text>
	</View>
)

export class SingleModel extends React.Component{
	constructor(props){
		super(props)
	}
	async componentDidMount(){
		await this.props.getModel(this.props.model_id)
		await this.props.getTasks(this.props.model_id)
	}

	renderItem = ({item}) => (
		<Task task={item.task} 
		complete={item.complete} 
		id={item.id}
		updateTask={this.props.updateTask}/>
	)

	render(){
		return(
			this.props.model.modelName && 
			this.props.tasks.length>0?
				(<View style={styles.singleModel}>
					<View style={styles.modelText}>
						<Text style={styles.modelName}>{this.props.model.modelName}</Text>
						<Text>{this.props.unitName}</Text>
					</View>
					<ProgressBar progress={this.props.progress} width={300}/>
					<FlatList
						data={this.props.tasks}
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
})

export default connect(mapState, mapDispatch)(SingleModel)
