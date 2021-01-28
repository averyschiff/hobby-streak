import React from 'react'
import {View} from 'react-native'
import Tag from './Tag'

const TagsList = (props) => {
  let four = false
  const tags = props.tagList.split(', ')
  console.log(tags)
  return(
    <View>
      {tags.map(tag=>(
        <Tag tag={tag}/>
      ))}
    </View>
  )
}


export default TagsList
