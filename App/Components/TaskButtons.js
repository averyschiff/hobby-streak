import React from 'react'
import { render } from 'react-dom'
import {View,
  Text,
  TouchableOpacity
} from 'react-native'

import styles from '../styles'


const TaskButtons = (props) => {
  return (
    <View style={{
      flexDirection: 'row',
      justifyContent: 'space-around',
    }}>
      <View>
        <TouchableOpacity 
          style={styles.editTaskButton}
          onPress={props.editTaskButtons.checkAll}
        >
          <Text style={styles.editTaskButtonText}>
            Check all
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.editTaskButton}
          onPress={props.editTaskButtons.uncheckAll}
        >
          <Text style={styles.editTaskButtonText}>
            Uncheck all
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity 
          style={styles.editTaskButton}
          onPress={props.editTaskButtons.addToAll}
        >
          <Text style={styles.editTaskButtonText}>
            Add to all
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.editTaskButton}
          onPress={props.editTaskButtons.deleteFromAll}
        >
          <Text style={styles.editTaskButtonText}>
            Delete
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default TaskButtons
