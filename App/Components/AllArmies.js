import React from 'react'
import {connect} from 'react-redux'
import {
	Text, 
	View, 
} from 'react-native'
import {
  getArmies,
  createArmy,
  deleteArmy,
} from '../store/allArmies'
import NextLevelMenu from './NextLevelMenu'
import {armyValidation} from './input_validation'

export class AllArmies extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      modalType: null,
      modalVisible: false
    }
    this.cancelModal = this.cancelModal.bind(this)
    this.newArmy = this.newArmy.bind(this)
  }
  async componentDidMount(){
    await this.props.getArmies()
  }

  cancelModal = () =>{
    this.setState({
      modalVisible: false
    })
  }

  newArmy = (armyName) => {
    this.props.createArmy(
      armyName, 
    )
  }

  render(){
    return(
      <NextLevelMenu
        navigate = { (id) => this.props.navigation.navigate(
          'Army',
          {army_id: id}
        )}
        nextName = 'armyName'
        delete = {(id) => this.props.deleteArmy(id)}
        modalVisible = {this.state.modalVisible}
        modalType = {this.state.modalType}
        defaultName={
          `Army`
        }
        defLength={this.props.armies.length+1}
        cancelModal={this.cancelModal}
        newItem={this.newArmy}
        modalText={'New army name:'}
        newValidation={armyValidation}
        topName={'Armies'}
        listData={this.props.armies}
        newButtonText={'New Army'}
        setModalVisible={(modalType)=>{
          this.setState({
            modalVisible: true,
            modalType: modalType,
          })
        }}
        noteBox={false}
      />
    )
  }
}
const mapState = state => ({
  armies: state.allArmies.armies,
})


const mapDispatch = dispatch => ({
  getArmies: ()=>{
    dispatch(getArmies())
  },
  createArmy: (armyName)=>{
    dispatch(createArmy(armyName))
  },
  deleteArmy: (army_id)=>{
    dispatch(deleteArmy(army_id))
  },
})

export default connect(mapState, mapDispatch)(AllArmies)
