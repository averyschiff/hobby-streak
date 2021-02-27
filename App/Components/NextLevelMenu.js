import React from 'react'
import styles from '../styles'

import NewItemForm from './NewItemForm'
import EditTaskMenu from './EditTaskMenu'

import { TouchableOpacity } from 'react-native-gesture-handler'
import Menu, {
  MenuOptions,
  MenuOption,
  MenuTrigger
} from 'react-native-popup-menu'
import {
	Text, 
	View, 
  FlatList, 
  Modal,
  Button,
} from 'react-native'

import NoteBox from './NoteBox'


/*
Props:
navigate
nextName
delete
modalVisible
  defaultName
  cancelModal
  newItem
  modalText
  newValidation
topName
listData
newButtonText
setModalVisible

*/
const NextLevelMenu = (props) => {

  renderItem = ({item}) => (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: 5,
      }}
    >
      <TouchableOpacity
        onPress={()=>{
          props.navigate(item.id)
        }}
      >
        <Text style={{fontSize: 20}}>{item[props.nextName]}</Text>
      </TouchableOpacity>
      <Menu onSelect={
        value=>{
          if(value){
            props.delete(item.id)
          }
        }
      }>
        <MenuTrigger>
          <View
            style={{
              padding: 3,
              margin: 3,
            }}
          >
            <Text>x</Text>
          </View>
        </MenuTrigger>
        <MenuOptions>
          <MenuOption value={true} text={`Delete "${item[props.nextName]}"?`} />
          <MenuOption value={false} text='Cancel'/>
        </MenuOptions>
      </Menu>
    </View>
  )
  return(
    <View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={props.modalVisible}
      >
        {props.modalType=='createNextLevel'?
          (<NewItemForm 
            defaultName={
              props.defaultName
            }
            defLength={props.defLength}
            cancelModal={props.cancelModal}
            newItem={props.newItem}
            modalText={props.modalText}
            validation={props.newValidation}
          />):
          (props.tasks?
          (<EditTaskMenu 
            taskKeys={Object.keys(props.tasks)}
            taskLib = {props.tasks}
            editTaskButtons={props.editTaskButtons}
            cancelModal={props.cancelModal}
            />):
            (<View></View>)
          )
        }
      </Modal>
      <View>
        <Text style={styles.modelName}>{props.topName}</Text>
        <FlatList
          data = {props.listData}
          renderItem={renderItem}
          keyExtractor={item=>item.id.toString()}
        />
        <Button
          title={props.newButtonText}
          onPress={()=>props.setModalVisible('createNextLevel')}
        />
        <View style={{padding:10}}></View>
        {props.tasks?
          (<Button
            title={'Edit tasks for all models'}
            onPress={()=>props.setModalVisible('editTasks')}
          />):
          (<View></View>)
        }
        {props.noteBox?
          (<NoteBox
            note={props.note}
            setNote={props.setNote}
            updateNote={props.updateNote}
          />):
          (<View></View>)
        }
      </View>
    </View>
  )
}

export default NextLevelMenu
