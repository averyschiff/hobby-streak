import React from 'react'
import {connect} from 'react-redux'
import {
	Text, 
	View, 
} from 'react-native'
import {
  getArmy, 
  getUnits,
  createUnit,
  deleteUnit,
  setNote,
  updateNote,
} from '../store/singleArmy'
import NextLevelMenu from './NextLevelMenu'
import {unitValidation} from './input_validation'

export class SingleArmy extends React.Component{

  constructor(props){
    super(props)
		this.army_id = this.props.route.params.army_id
    this.state = {
      modalType: null,
      modalVisible: false
    }
    this.cancelModal = this.cancelModal.bind(this)
    this.newUnit = this.newUnit.bind(this)
  }
  async componentDidMount(){
    await this.props.getArmy(this.army_id)
    await this.props.getUnits(this.army_id)
  }

  cancelModal = () =>{
    this.setState({
      modalVisible: false
    })
  }

  newUnit = (unitName) => {
    this.props.createUnit(
      unitName, 
      this.props.army.id
    )
  }

  render(){
    return(
      this.props.army.armyName?
      (
        <NextLevelMenu
          navigate = { (id) => this.props.navigation.navigate(
            'Unit',
            {unit_id: id, armyName: this.props.army.armyName}
          )}
          nextName = 'unitName'
          delete = {(id) => this.props.deleteUnit(id)}
          modalVisible = {this.state.modalVisible}
          modalType = {this.state.modalType}
          defaultName={
            `Unit`
          }
          defLength={this.props.units.length+1}
          cancelModal={this.cancelModal}
          newItem={this.newUnit}
          modalText={'New unit name:'}
          newValidation={unitValidation}
          topName={this.props.army.armyName}
          listData={this.props.units}
          newButtonText={'New Unit'}
          setModalVisible={(modalType)=>{
            this.setState({
              modalVisible: true,
              modalType: modalType
            })
          }}
          noteBox={true}
          note={this.props.army.note}
          setNote={this.props.setNote}
          updateNote={(note)=>updateNote(note, this.props.army.id)}
        />):
      (<View>
        <Text>Single army view</Text>
      </View>)
    )
  }

}

const mapState = state => ({
  army: state.singleArmy.army,
  units: state.singleArmy.units,
})


const mapDispatch = dispatch => ({
  getArmy: (army_id)=>{
    dispatch(getArmy(army_id))
  },
  getUnits: (army_id)=>{
    dispatch(getUnits(army_id))
  },
  createUnit: (unitName, army_id)=>{
    dispatch(createUnit(unitName, army_id))
  },
  deleteUnit: (unit_id)=>{
    dispatch(deleteUnit(unit_id))
  },
  setNote: (note)=>{
    dispatch(setNote(note))
  },
})

export default connect(mapState, mapDispatch)(SingleArmy)
