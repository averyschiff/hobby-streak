import React from 'react'
import {connect} from 'react-redux'
import styles from '../styles.js'
import {Text, View, FlatList} from 'react-native'
import {getModel, getTasks} from '../store/singleModel'

const DATA = [
	{
		id: 1,
		task: 'testTask'
	}
]

const Task = ({task}) => (
	<View style={styles.taskItem}>
		<Text style={styles.task}>{task}</Text>
	</View>
)

const renderItem = ({item}) => (
	<Task task={item.task} />
)

export class SingleModel extends React.Component{
	constructor(props){
		super(props)
	}
	async componentDidMount(){
		await this.props.getModel(this.props.model_id)
		await this.props.getTasks(this.props.model_id)
	}


	render(){
		return(
			<View style={styles.singleModel}>
				{(this.props.modelName && this.props.tasks)?
					(<View style={styles.modelText}>
						<Text style={styles.modelName}>{this.props.modelName}</Text>
						<Text>{this.props.unitName}</Text>
						<FlatList
							data={this.props.tasks}
							renderItem ={renderItem}
							keyExtractor={item=>item.id.toString()}
							columnWrapperStyle={styles.taskList}
							numColumns={2}
						/>
					</View>):
					(<Text>Single Model View</Text>)
				}
			</View>
		)
	}
}

const mapState = state => ({
	modelName: state.singleModel.modelName,
	tasks: state.singleModel.tasks,
})

const mapDispatch = dispatch => ({
	getModel: (model_id)=>{
		dispatch(getModel(model_id))
	},
	getTasks: (model_id)=>{
		dispatch(getTasks(model_id))
	}
})

export default connect(mapState, mapDispatch)(SingleModel)
