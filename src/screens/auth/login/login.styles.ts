import { StyleSheet } from 'react-native';
import { GlobalColors } from '../../../theme/colors';

export const loginStyles = StyleSheet.create({
	container: {
		// marginBottom: 20,
	},
	card:{
		margin: 20,
		padding: 20,
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		gap: 20,
	},
	title: {
		fontWeight: 'bold',
		textAlign: 'center',
		color: GlobalColors.text.primary,
	},
	input: {
		width: '100%',
		borderWidth: 1,
		borderColor: GlobalColors.secondary,
		color: GlobalColors.text.primary,
		borderRadius: 5,
		padding: 10,
	},
	button: GlobalColors.button
});
