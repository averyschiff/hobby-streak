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
    await this.props.getUnit(this.unit_id)
    await this.props.getModels(this.unit_id)
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

  render(){
    return(
      this.props.unit.unitName?
      (
        <NextLevelMenu
          navigate = { (id) => this.props.navigation.navigate(
            'Model',
            {model_id: id, unitName: this.props.unit.unitName}
          )}
          nextName = 'modelName'
          delete = {(id) => this.props.deleteModel(id)}
          modalVisible = {this.state.modalVisible}
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
          setModalVisible={()=>{
            this.setState({
              modalVisible: true
            })
          }}
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
})

export default connect(mapState, mapDispatch)(SingleUnit)
