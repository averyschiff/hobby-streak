import React, {useState} from 'react'
import {View, TextInput, Text, Button} from 'react-native'

const NewItemForm = (props) => {
  const [newName, setName] = useState(props.defaultName)

  return(
    <View style={{
      flex: 1,
      alignItems: "center",
    }}>
      <Text
        style={{
          backgroundColor:"#fff",
        }}
      >
        New model name:
      </Text>
      <TextInput
        style={{
          height: 40,
          padding: 2,
          borderColor: 'black',
          borderWidth: 1,
          width: 200,
          backgroundColor:"#fff",
        }}
        value={newName}
        onChangeText = {text=>{setName(text)}}
      >
      </TextInput>
      <View
      style={{
        flexDirection: 'row'
      }}>
        <Button
          title="Submit"
        />
        <Button
          title="Cancel"
          onPress={props.cancelModal}
        />
      </View>
    </View>
  )
}

export default NewItemForm
