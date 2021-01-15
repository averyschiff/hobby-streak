import {StyleSheet} from 'react-native';

export default styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#888',
		alignItems: 'center',
	},
	singleModel: {
		flex: 1,
		backgroundColor: '#D4BF89',
		alignItems: 'center',
	},
	modelText: {
		flex: 1,
		alignItems: 'center',
	},
	modelName: {
		marginTop: 50,
		fontSize: 40,
	},
	taskList:{
		flex: 1,
		alignContent: 'flex-start',
		minWidth: 300,
	},
	taskItem: {
		backgroundColor: '#f9c2ff',
		padding: 10,
		marginVertical: 4,
		marginHorizontal: 4,
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
	},
	task: {
		fontSize: 16,
	},

});
