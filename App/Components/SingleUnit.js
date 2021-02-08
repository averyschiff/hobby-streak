import React from 'react'
import {connect} from 'react-redux'
import {
	Text, 
	View, 
  FlatList, 
  Modal,
  Button,
} from 'react-native'
import Menu, {
  MenuOptions,
  MenuOption,
  MenuTrigger
} from 'react-native-popup-menu'

import {
  getUnit, 
  getModels,
  createModel,
  deleteModel
} from '../store/singleUnit'
import styles from '../styles'
import { TouchableOpacity } from 'react-native-gesture-handler'
import NewItemForm from './NewItemForm'
import { deleteTask } from '../store/singleModel'
import {modelValidation} from './input_validation'

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
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: 5,
      }}
    >
      <TouchableOpacity
        onPress={()=>{
          this.props.navigation.navigate(
            'Model',
            {model_id: item.id, unitName: this.props.unit.unitName}
          )
        }}
      >
        <Text style={{fontSize: 20}}>{item.modelName}</Text>
      </TouchableOpacity>
      <Menu onSelect={
        value=>{
          if(value){
            this.props.deleteModel(item.id)
          }
        }
      }>
        <MenuTrigger>
          <View
            style={{
              padding: 3,
              margin: 3,
            }}
          >
            <Text>x</Text>
          </View>
        </MenuTrigger>
        <MenuOptions>
          <MenuOption value={true} text={`Delete "${item.modelName}"?`} />
          <MenuOption value={false} text='Cancel'/>
        </MenuOptions>
      </Menu>
    </View>
  )

  render(){
    return(
      this.props.unit.unitName?
      (
      <View>
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.modalVisible}
        >
          <NewItemForm 
            defaultName={
              `Model ${this.props.models.length+1}`
            }
            cancelModal={this.cancelModal}
            newItem={this.newModel}
            modalText={'New model name:'}
            validation={modelValidation}
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
  },
  deleteModel: (model_id)=>{
    dispatch(deleteModel(model_id))
  },
})

export default connect(mapState, mapDispatch)(SingleUnit)
