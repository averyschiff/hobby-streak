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
  deleteUnit
} from '../store/singleArmy'
import NextLevelMenu from './NextLevelMenu'
import {unitValidation} from './input_validation'

export class SingleArmy extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      modalType: null,
      modalVisible: false
    }
    this.cancelModal = this.cancelModal.bind(this)
    this.newUnit = this.newUnit.bind(this)
  }
  async componentDidMount(){
    await this.props.getArmy(this.props.army_id)
    await this.props.getUnits(this.props.army_id)
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
          defaultName={
            ``
          }
          cancelModal={this.cancelModal}
          newItem={this.newUnit}
          modalText={'New unit name:'}
          newValidation={unitValidation}
          topName={this.props.army.armyName}
          listData={this.props.units}
          newButtonText={'New Unit'}
          setModalVisible={()=>{
            this.setState({
              modalVisible: true
            })
          }}
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
})

export default connect(mapState, mapDispatch)(SingleArmy)