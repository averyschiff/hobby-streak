import React from 'react'
import {View} from 'react-native'
import TagRow from './TagRow'

const TagsList = (props) => {


  const deleteTag = (tags, tagToDelete) => {
    let newTags = ''
    tags.forEach(tag=>{
      if (tag!=tagToDelete) newTags = newTags + tag + ', '
    })
    props.updateTags(newTags)
  }

  const allTags = props.tagList.split(', ').slice(0,-1)

  let rowLength = 4
  let count = 0
  let tagRows = []
  let row = []
  let rowCount = 0, i
  while (rowCount < allTags.length){
    for (i=0; i<rowLength;i++){
      row.push(allTags[rowCount])
      rowCount++
      if (rowCount>=allTags.length) break
    }
    tagRows.push(row)
    row = []
    if (rowLength==4) rowLength=3
    else rowLength=4
  }
  return(
    <View
      style={{
        flex:1,
        flexDirection:'column',
        width: 250,
      }}
    >
      {tagRows.map(tags=>{
        return (<TagRow 
          tags={tags}
          key={count++}
          deleteTag={(tag)=>deleteTag(allTags, tag)}
          />)
      })}
    </View>
  )
}


export default TagsList
