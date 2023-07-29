import { Appearance } from 'react-native';

const colorScheme: 'light' | 'dark' = Appearance.getColorScheme() || 'light';

const primaryLightColor = '#f7f7f7';
const primaryDarkColor = '#111927';

const colors = {
	light: {
		primary: primaryLightColor,
		secondary: '#E0E1E1',
		background: '#ffffff',
		text: {
			primary: 'black',
			secondary: '#666666',
		},
		button: {
			backgroundColor: '#667eea',
			width: '100%',
			padding: 5,
			borderRadius: 5,
			color: 'white',
		},
		card: {
			margin: 15,
			borderRadius: 10,
			backgroundColor: primaryLightColor,
			shadowColor: 'rgba(17, 12, 46, 0.15)',
			shadowOffset: {
				width: 0,
				height: 48,
			},
			shadowOpacity: 1,
			shadowRadius: 100,
			elevation: 10, // only for Android
		},
	},
	dark: {
		primary: primaryDarkColor,
		secondary: '#1e212d',
		background: '#0e1320',
		text: {
			primary: 'white',
			secondary: '#999999',
		},
		button: {
			backgroundColor: '#667eea',
			width: '100%',
			padding: 5,
			borderRadius: 5,
			color: 'white',
		},
		card: {
			background: '#ffffff',
			margin: 10,
			borderRadius: 10,
			backgroundColor: primaryDarkColor,
			shadowColor: 'rgba(17, 12, 46, 0.15)',
			shadowOffset: {
				width: 0,
				height: 48,
			},
			shadowOpacity: 1,
			shadowRadius: 100,
			elevation: 10, // only for Android
		},
	},
};

export const GlobalColors = colors[colorScheme];

export const isDarkMode = colorScheme === 'dark';
