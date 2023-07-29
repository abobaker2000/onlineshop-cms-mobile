import { StyleSheet } from 'react-native';
import { GlobalColors } from '../../theme/colors';

export const homeScreenStyles = StyleSheet.create({
	container: {
		margin: 10,
		borderRadius: 10,
		backgroundColor: GlobalColors.primary,
	},
	body: {
		padding: 20,
		// backgroundColor: GlobalColors.primary,
	},
	title: {
		fontSize: 15,
		fontWeight: 'bold',
	},
});
