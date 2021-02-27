import React, {useState} from 'react'
import {View, 
  TextInput, 
  Text, 
  Button,
  FlatList,
  TouchableOpacity
} from 'react-native'

const NewItemForm = (props) => {
  const [newNames, setNames] = useState([{
    id: 0,
    text: `${props.defaultName} ${props.defLength}` ,
    valid: true,
    validMessage: ''
  }])

  renderItem = ({item}) => {
    let validCheck
    return(
      <View 
        style={{
          padding: 5,
          margin: 10,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Text style={{fontSize: 20}}>
          {item.id+1}.
        </Text>
        <View>
          <TextInput
            style={{
              padding: 6,
              borderColor: 'black',
              borderWidth: 1,
              backgroundColor:"#fff",
              fontSize: 20,
            }}
            multiline={true}
            value={item.text}
            onChangeText = {text=>{
              validCheck = props.validation(text)
              setNames([
                ...newNames.slice(0,item.id),
                {
                  ...item,
                  text,
                  valid: validCheck.valid,
                  validMessage: validCheck.message
                },
                ...newNames.slice(item.id+1)
              ])
            }}
          >
          </TextInput>
          {!item.valid?
          (<Text
            style={{color: 'red'}}
          >
            {item.validMessage}</Text>):
          (<View></View>)}
        </View>
        <TouchableOpacity
          onPress={()=>{
            setNames(newNames.filter(newName=>{
              return newName.id!=item.id
            }))
          }}
        >
          <Text style={{fontSize: 20, padding: 3}}>x</Text>
        </TouchableOpacity>
      </View>
    )
  }

  return(
    <View style={{
      alignItems: "center",
      justifyContent: "space-around",
      alignContent: "center",
      alignSelf: "center",
      width: '90%',
      height: '70%',
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
      <FlatList
        style={{width: '80%', paddingBottom: 5}}
        data={newNames}
        renderItem={renderItem}
        keyExtractor={item=>item.id.toString()}
        ListFooterComponent={
          <Button
            title={'Additional model'}
            onPress={()=>{
              let newId = newNames.length>0?newNames[newNames.length-1].id+1:0
              setNames(
                [...newNames,
                {
                  id: newId,
                  text: `${props.defaultName} ${props.defLength+newId}`,
                  valid: true,
                  validMessage: '',
                }]
              )
            }}
          />
        }
      />
      <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '80%',
        paddingBottom: 5,
      }}>
        <Button
          title="Submit"
          disabled={newNames.reduce((res, entry)=>res || !entry.valid, false)}
          onPress={
            ()=>{
              newNames.map(newName=>{
                props.newItem(newName.text)
              })
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
