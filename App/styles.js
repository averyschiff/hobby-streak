import {StyleSheet} from 'react-native';

export default styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#888',
		alignItems: 'center',
	},
	singleModel: {
		//backgroundColor: '#fff',
	},
	modelText: {
		marginBottom: 10,
		alignItems: 'center',
	},
	modelName: {
		marginTop: 50,
		fontSize: 40,
	},
	taskList:{
		flex: 1,
		alignItems: "center",
		alignContent: 'flex-start',
		width: 300, 
	},
	taskItem: {
		//backgroundColor: '#f9c2ff',
		//backgroundColor: '#add8e6',
		borderColor: '#007AFF',
		borderWidth: 2,
		padding: 4,
		marginVertical: 4,
		marginHorizontal: 2,
		borderRadius: 5,
		flex: 1/2,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	taskBoxAndText: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
	},
	task: {
		fontSize: 14,
	},
	editTaskButton: {
		padding: 4,
		margin: 4,
		backgroundColor: '#2196f3',
	},
	editTaskButtonText: {
		fontSize: 14,
		color: 'white',
	},

});
