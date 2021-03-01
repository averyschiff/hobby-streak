import React from 'react'
import {View} from 'react-native'
import Tag from './Tag'

const TagRow = (props) => {
  let count = 0
  return(
    <View 
      style={{
        flexDirection:"row",
        justifyContent:"space-around"
      }}
    >
      {props.tags.map(tag=>{
        return (<Tag 
          tag={tag} 
          key={count++}
          deleteTag={props.deleteTag}
          />)
      })}
    </View>
  )
}

export default TagRow
