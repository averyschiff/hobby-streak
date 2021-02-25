import React from 'react'
import {connect} from 'react-redux'
import {
	Text, 
	View, 
} from 'react-native'
import {
  getUnit, 
  getModels,
  createModel,
  deleteModel,
  setNote,
  updateNote,
  getUnitTasks,
  updateTasksStatusByUnit,
  addTasksThroughUnit,
  deleteTaskByUnit,
} from '../store/singleUnit'
import NextLevelMenu from './NextLevelMenu'
import {modelValidation} from './input_validation'

export class SingleUnit extends React.Component{

  constructor(props){
    super(props)
		this.unit_id = this.props.route.params.unit_id
    this.state = {
      modalType: null,
      modalVisible: false
    }
    this.cancelModal = this.cancelModal.bind(this)
    this.newModel = this.newModel.bind(this)
  }
  async componentDidMount(){
    this._unsubscribe = this.props.navigation.addListener('focus', async ()=>{
      await this.props.getUnit(this.unit_id)
      await this.props.getModels(this.unit_id)
      await this.props.getTasks(this.unit_id)
    })
  }

  componentWillUnmount(){
    this._unsubscribe()
  }

  cancelModal = () =>{
    this.setState({
      modalVisible: false
    })
  }

  newModel = (modelName) => {
    this.props.createModel(
      modelName, 
      this.props.unit.id, 
      this.props.unit.army_id
    )
  }

  findDifference = (taskModels, allModels) => {
    return allModels.map(model=>model.id).filter(model=>{
      return !(taskModels.includes(model))
    })
  }

  render(){
    return(
      this.props.unit.unitName?
      (
        <NextLevelMenu
          navigate = { (id) => this.props.navigation.navigate(
            'Model',
            {
              model_id: id, 
              unitName: this.props.unit.unitName}
          )}
          nextName = 'modelName'
          delete = {async (id) => {
            await this.props.deleteModel(id)
            await this.props.getTasks(this.props.unit.id)
          }}
          modalVisible = {this.state.modalVisible}
          modalType = {this.state.modalType}
          defaultName={
            `Model ${this.props.models.length+1}`
          }
          cancelModal={this.cancelModal}
          newItem={this.newModel}
          modalText={'New model name:'}
          newValidation={modelValidation}
          topName={this.props.unit.unitName}
          listData={this.props.models}
          newButtonText={'New Model'}
          setModalVisible={(modalType)=>{
            this.setState({
              modalVisible: true,
              modalType: modalType
            })
          }}
          tasks={this.props.tasks}
          editTaskButtons={
            {
              checkAll: (task)=>this.props.updateTasks(1, this.props.unit.id, task),
              uncheckAll: (task)=>this.props.updateTasks(0, this.props.unit.id, task),
              addToAll: (task, taskModels)=>this.props.addTasksThroughUnit(
                this.props.unit.id, 
                this.props.unit.army_id, 
                task, 
                this.findDifference(taskModels, this.props.models)
              ),
              deleteFromAll: (task)=>this.props.deleteTask(this.props.unit.id, task)
            }
          }
          noteBox={true}
          note={this.props.unit.note}
          setNote={this.props.setNote}
          updateNote={(note)=>updateNote(note, this.props.unit.id)}
        />):
      (<View>
        <Text>Single unit view</Text>
      </View>)
    )
  }

}

const mapState = state => ({
  unit: state.singleUnit.unit,
  models: state.singleUnit.models,
  tasks: state.singleUnit.tasks,
})


const mapDispatch = dispatch => ({
  getUnit: (unit_id)=>{
    dispatch(getUnit(unit_id))
  },
  getModels: (unit_id)=>{
    dispatch(getModels(unit_id))
  },
  createModel: (modelName, unit_id, army_id)=>{
    dispatch(createModel(modelName, unit_id, army_id))
  },
  deleteModel: (model_id)=>{
    dispatch(deleteModel(model_id))
  },
  setNote: (note)=>{
    dispatch(setNote(note))
  },
  getTasks: (unit_id)=>{
    dispatch(getUnitTasks(unit_id))
  },
  updateTasks: (status, unit_id, task)=>{
    dispatch(updateTasksStatusByUnit(status, unit_id, task))
  },
  addTasksThroughUnit: (unit_id, army_id, task, toAdd)=>{
    dispatch(addTasksThroughUnit(unit_id, army_id, task, toAdd))
  },
  deleteTask: (unit_id, task)=>{
    dispatch(deleteTaskByUnit(unit_id, task))
  }
})

export default connect(mapState, mapDispatch)(SingleUnit)
