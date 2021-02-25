import React from 'react'
import { render } from 'react-dom'
import {View, 
  Text, 
  FlatList,
  Button,
  TouchableOpacity
} from 'react-native'
import styles from '../styles'

const EditTaskMenu = (props) => {

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
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}>
          <View>
            <TouchableOpacity 
              style={styles.editTaskButton}
              onPress={()=>props.editTaskButtons.checkAll(item)}
            >
              <Text style={styles.editTaskButtonText}>
                Check all
              </Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.editTaskButton}
              onPress={()=>props.editTaskButtons.uncheckAll(item)}
            >
              <Text style={styles.editTaskButtonText}>
                Uncheck all
              </Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity 
              style={styles.editTaskButton}
              onPress={()=>props.editTaskButtons.addToAll(item, entry.modelIds)}
            >
              <Text style={styles.editTaskButtonText}>
                Add to all
              </Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.editTaskButton}
              onPress={()=>props.editTaskButtons.deleteFromAll(item)}
            >
              <Text style={styles.editTaskButtonText}>
                Delete
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )


  }

  return(
    <View style={{
      alignItems: "center",
      width: '100%',
      height: '50%',
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
    </View>
  )
}

export default EditTaskMenu
