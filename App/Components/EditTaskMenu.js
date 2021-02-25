import React from 'react'
import { render } from 'react-dom'
import {View, 
  Text, 
  FlatList,
  Button,
  TouchableOpacity
} from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import styles from '../styles'

import TaskButtons from './TaskButtons'

const EditTaskMenu = (props) => {
  const [newTask, setNewTask] = useState('')
  const [valid, checkValid] = useState(true)
  const [validMessage, changeMessage] = useState('')

  renderItem = ({item}) => {
    let entry = props.taskLib[item]
    return(
      <View 
      style={{
        padding: 5,
        margin: 10,
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}
      >
        <View
          style={{
            flexDirection: 'column'
          }}
        >
          <Text style={{fontSize: 24}}>{item}</Text>
          {entry.count>0?
            (
              <Text style={{fontSize: 12}}>
                Models completed: {entry.complete*entry.count}/{entry.count}
              </Text>
            ):
            (<Text></Text>)
          }
        </View>
        <TaskButtons editTaskButtons={{
          checkAll: () => props.editTaskButtons.checkAll(item),
          uncheckAll: () => props.editTaskButtons.uncheckAll(item),
          addToAll: () => props.editTaskButtons.addToAll(item, entry.modelIds),
          deleteFromAll: () => props.editTaskButtons.deleteFromAll(item)
        }}/>
      </View>
    )

  }

  return(
    <View style={{
      alignItems: "center",
      width: '100%',
      height: '60%',
      backgroundColor: "#ddd",
      marginTop: 50,
      borderRadius: 10,
      opacity: 1.0,
    }}>
      <Button
        title="Cancel"
        onPress={props.cancelModal}
      />
      <FlatList
        data={props.taskKeys}
        renderItem={renderItem}
        keyExtractor={item=>props.taskLib[item].id.toString()}
      />
      <Button
        title="Add new task"
      />
      <TextInput
        style={{
          padding: 2,
          borderColor: 'black',
          borderWidth: 1,
          width: '60%',
          backgroundColor:'#fff',
          marginTop: 2,
          marginBottom: 10,
        }}
      />
    </View>
  )
}

export default EditTaskMenu
