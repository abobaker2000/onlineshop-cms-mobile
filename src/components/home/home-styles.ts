import { StyleSheet } from 'react-native';
import { isDarkMode } from '../../theme/colors';

const generateStyles = (isActiveButton?: boolean) => {
	return StyleSheet.create({
		container: {
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			flexDirection: 'row',
			borderRadius: 7,
			backgroundColor: isDarkMode ? '#151b32' : '#f2f2fc',
			margin: 10,
		},
		button: {
			backgroundColor: isActiveButton ? (isDarkMode ? '#595959' : '#fff') : 'transparent',
			paddingRight: isActiveButton ? 5 : 0,
			paddingLeft: isActiveButton ? 5 : 0,
			borderRadius: 7,
		},
	});
};

export default generateStyles;
