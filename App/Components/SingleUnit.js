import React from 'react'
import {connect} from 'react-redux'
import {
	Text, 
	View, 
  FlatList, 
  Modal,
  Button,
} from 'react-native'

import {
  getUnit, 
  getModels,
  createModel,
} from '../store/singleUnit'
import styles from '../styles'
import { TouchableOpacity } from 'react-native-gesture-handler'
import NewItemForm from './NewItemForm'

export class SingleUnit extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      modalType: null,
      modalVisible: false
    }
    this.cancelModal = this.cancelModal.bind(this)
    this.newModel = this.newModel.bind(this)
  }
  async componentDidMount(){
    await this.props.getUnit(this.props.unit_id)
    await this.props.getModels(this.props.unit_id)
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

  renderItem = ({item}) => (
    <TouchableOpacity
      onPress={()=>{
        this.props.navigation.navigate(
          'Model',
          {model_id: item.id, unitName: this.props.unit.unitName}
        )
      }}
    >
      <Text>{item.modelName}</Text>
    </TouchableOpacity>
  )

  render(){
    return(
      this.props.unit.unitName?
      (
      <View>
        <Modal
          animationType="fade"
          transparent={false}
          visible={this.state.modalVisible}
        >
          <NewItemForm 
            defaultName={
              `Model ${this.props.models.length+1}`
            }
            cancelModal={this.cancelModal}
            newItem={this.newModel}
          />
        </Modal>
        <View>
          <Text style={styles.modelName}>{this.props.unit.unitName}</Text>
          <FlatList
            data = {this.props.models}
            renderItem={this.renderItem}
            keyExtractor={item=>item.id.toString()}
          />
          <Button
            title='New model'
            onPress={()=>this.setState({
              modalVisible: true
            })
            }
          />
        </View>
      </View>):
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
  }
})

export default connect(mapState, mapDispatch)(SingleUnit)
