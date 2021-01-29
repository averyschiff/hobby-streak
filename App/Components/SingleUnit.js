import React from 'react'
import {connect} from 'react-redux'
import {
	Text, 
	View, 
	FlatList, 
} from 'react-native'

import {getUnit, getModels} from '../store/singleUnit'
import { render } from 'react-dom'
import styles from '../styles'
import { TouchableOpacity } from 'react-native-gesture-handler'

export class SingleUnit extends React.Component{
  async componentDidMount(){
    await this.props.getUnit(this.props.unit_id)
    await this.props.getModels(this.props.unit_id)
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
      (<View
      >
        <Text style={styles.modelName}>{this.props.unit.unitName}</Text>
        <FlatList
          data = {this.props.models}
          renderItem={this.renderItem}
          keyExtractor={item=>item.id.toString()}
        />
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
  }
})

export default connect(mapState, mapDispatch)(SingleUnit)
