import React from 'react'
import {Text, View, Button, TextInput} from 'react-native'
import styles from '../styles.js'
import CheckBox from '@react-native-community/checkbox'

export default Task = ({task, id, complete, updateTask, deleteTask, createTask}) => {
	const [newTask, onChangeText] = React.useState('');
	return(
		id!=-1?
			(
			<View style={styles.taskItem}>
				<View style={styles.taskBoxAndText}>
					<CheckBox
            disabled={false}
            tintColors={{
                true: '#007AFF',
                false: '#000'
            }}
						value={complete}
						onValueChange={(newValue)=>updateTask(id, newValue)}
					/>
					<Text style={styles.task}>{task}</Text>
				</View>
				<Button
				title='x'
				onPress={()=>deleteTask(id)}
				/>
			</View>
			):
			(<View style={{
          ...styles.taskItem, 
          borderWidth: 0,
        }}>
				<TextInput
				style={{ height: 20, 
					borderWidth: 0,
          width: 110,
        }}
				value={newTask}
				placeholder={'Enter new task...'}
				onChangeText={text=>onChangeText(text)}
				/>
				<Button
				title='+'
				onPress={async ()=>{
					if (newTask) await createTask(newTask)
					onChangeText('')
				}}
				/>
				</View>)
	)
}
