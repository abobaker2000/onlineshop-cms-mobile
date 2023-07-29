import { Button, View } from 'react-native';
import { Dispatch, SetStateAction } from 'react';
import generateStyles from './home-styles';
import { FILTER } from '../../screens/home';
import { GlobalColors } from '../../theme/colors';

interface IMultipleButtonsProps {
	activeButton: FILTER;
	setFilter: Dispatch<SetStateAction<FILTER>>;
}

export function MultipleButtons({ activeButton, setFilter }: IMultipleButtonsProps) {
	return (
		<View style={generateStyles(false).container}>
			<View style={generateStyles(activeButton === 'today').button}>
				<Button
					color={GlobalColors.text.primary}
					title="today"
					onPress={() => setFilter('today')}
				/>
			</View>
			<View style={generateStyles(activeButton === 'thisWeek').button}>
				<Button
					color={GlobalColors.text.primary}
					title="this Week"
					onPress={() => setFilter('thisWeek')}
				/>
			</View>
			<View style={generateStyles(activeButton === 'thisMonth').button}>
				<Button
					color={GlobalColors.text.primary}
					title="this Month"
					onPress={() => setFilter('thisMonth')}
				/>
			</View>
			<View style={generateStyles(activeButton === 'thisYear').button}>
				<Button
					color={GlobalColors.text.primary}
					title="this Year"
					onPress={() => setFilter('thisYear')}
				/>
			</View>
		</View>
	);
}
