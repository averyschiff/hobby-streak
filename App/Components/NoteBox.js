import React from 'react'
import { View, TextInput } from 'react-native'

const NoteBox = (props) => {
  return (
    <View>
      <TextInput
        style={{
          height: 100,
          borderColor: 'black',
          borderWidth: 1,
          width: 300,
          padding: 10,
          //THIS WILL BREAK IN IOS
          textAlignVertical: 'top'
        }}
      placeholder={"Notes..."}
      multiline={true}
      value={props.note}
      onChangeText = {text=>{props.setNote(text)}}
      onEndEditing={()=>{
        props.updateNote(props.note)
      }}
      />
    </View>
  )
}

export default NoteBox
