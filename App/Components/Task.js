import React from 'react'
import {Text, View, Button, TextInput} from 'react-native'
import styles from '../styles.js'
import CheckBox from '@react-native-community/checkbox'
import Menu, {
  MenuOptions,
  MenuOption,
  MenuTrigger
} from 'react-native-popup-menu'

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
				<Menu onSelect={
					value=>{
						if (value) {
							deleteTask(id)
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
						<MenuOption value={true} text={`Delete "${task}"`} />
						<MenuOption value={false} text='Cancel'/>
					</MenuOptions>
			</Menu>

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
