import React from 'react'
import {connect} from 'react-redux'
import styles from '../styles.js'
import {
	Text, 
	View, 
	FlatList,
	Modal, 
} from 'react-native'
import {
	getModel, 
	getTasks, 
	updateTask, 
	deleteTask, 
	createTask,
	setNote,
	updateNote,
	updateTags,
} from '../store/singleModel'
import ProgressBar from 'react-native-progress/Bar'
import Task from './Task'
import NoteBox from './NoteBox'
import TagsMenu from './TagsMenu'
import TagList from './TagsList'
import NewItemForm from './NewItemForm'
import { TouchableOpacity } from 'react-native-gesture-handler'

export class SingleModel extends React.Component{

	constructor(props){
		super(props)
		this.model_id = this.props.route.params.model_id
		this.unitName = this.props.route.params.unitName
		this.state = {
			modalType: null,
			modalVisible: false,
		}
    this.cancelModal = this.cancelModal.bind(this)
		this.addTags = this.addTags.bind(this)
	}

	async componentDidMount(){
		await this.props.getModel(this.model_id)
		await this.props.getTasks(this.model_id)
	}

	renderItem = ({item}) => (
		<Task task={item.task} 
		complete={item.complete} 
		id={item.id}
		updateTask={this.props.updateTask}
		deleteTask={this.props.deleteTask}
		createTask={(taskName) => this.props.createTask(
			taskName,
			this.model_id,
			this.props.model.unit_id,
			this.props.model.army_id,
		)}
		/>
	)

  cancelModal = () =>{
    this.setState({
      modalVisible: false
    })
  }

	addTags = (tags) => {
		this.props.updateTags(
			tags,
			this.props.model.tags,
			this.props.model.id
		)
	}

	render(){
		return(
			this.props.model.modelName?
				(
				<View
				style={
					{
						alignItems:"center",
					}
				}
				>
					<Modal
						animationType="fade"
						transparent={true}
						visible={this.state.modalVisible}
					>
						<NewItemForm
							defaultName={''}
							cancelModal={this.cancelModal}
							newItem={this.addTags}
							modalText={'Enter new tags, separated by commas'}
						/>
					</Modal>
					<FlatList
						showsVerticalScrollIndicator={false}
						ListHeaderComponent={
							<View style={{
								alignItems: "center"
							}}>
								<View style={styles.modelText}>
									<Text style={styles.modelName}>{this.props.model.modelName}</Text>
									<Text>{this.unitName}</Text>
								</View>

								<ProgressBar progress={this.props.progress} width={300}/>
							</View>
						}
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
						nestedScrollEnabled={true}
						ListFooterComponent={
							<View
							style={{alignItems: "center"}}
							>
								<NoteBox
									note={this.props.model.note}
									setNote={this.props.setNote}
									updateNote={(note)=>updateNote(note, this.props.model.id)}
								/>
								<TagList 
									tagList={this.props.model.tags}
									updateTags={(tags)=>{
										this.props.updateTags(tags, '', this.props.model.id)}
									}
								/>
								<TouchableOpacity
									onPress={()=>{
										this.setState({
											modalType: 'addTags',
											modalVisible: true
										})
									}}
								>
									<Text>Add tags...</Text>
								</TouchableOpacity>
							</View>
						}
						/>
					</View>
					):
					(<View><Text>Single Model View</Text></View>)
				)
		}
	}

	/*

								<TagsMenu
									updateTags={(tags)=>this.props.updateTags(tags, this.props.model.id)}
									oldTags={this.props.model.tags}
								/>
		*/
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
	createTask: (taskName, model_id, unit_id, army_id)=>{
		dispatch(createTask(taskName, model_id, unit_id, army_id))
	},
	setNote: (note)=>{
		dispatch(setNote(note))
	},
	updateTags: (tags, oldTags, model_id)=>{
		dispatch(updateTags(tags, oldTags, model_id))
	},
})

export default connect(mapState, mapDispatch)(SingleModel)
