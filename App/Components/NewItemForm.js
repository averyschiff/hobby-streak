import React, {useState} from 'react'
import {View, TextInput, Text, Button} from 'react-native'

const NewItemForm = (props) => {
  const [newName, setName] = useState(props.defaultName)

  return(
    <View style={{
      alignItems: "center",
      justifyContent: "space-around",
      alignContent: "center",
      alignSelf: "center",
      width: '75%',
      height: '50%',
      backgroundColor: "#bbb",
      marginTop: 50,
      borderRadius: 10,
      opacity: 0.98,
    }}>
      <Text
        style={{
          fontSize: 24,
        }}
      >
        {props.modalText}
      </Text>
      <TextInput
        style={{
          padding: 2,
          borderColor: 'black',
          borderWidth: 1,
          width: "90%",
          backgroundColor:"#fff",
          fontSize: 20,
        }}
        multiline={true}
        value={newName}
        onChangeText = {text=>{setName(text)}}
      >
      </TextInput>
      <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '80%'
      }}>
        <Button
          title="Submit"
          onPress={
            ()=>{
              props.newItem(newName)
              props.cancelModal()
            }
          }
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
