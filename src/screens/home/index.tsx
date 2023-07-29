import { Animated, Dimensions, ScrollView, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { Dispatch, SetStateAction, useRef, useState } from 'react';
import { MultipleButtons } from '../../components/home/multiple-buttons';
import { homeScreenStyles } from './home-screen.styles';
import { GlobalColors, isDarkMode } from '../../theme/colors';
import { analytics, useHome } from './useHome';
import {
	BarChart,
} from 'react-native-chart-kit';
export type FILTER = 'today' | 'thisWeek' | 'thisMonth' | 'thisYear';

export function HomeScreen() {
	const [filter, setFilter] = useState<FILTER>('today');
	const [type, setType] = useState(0);

	return (
		<View style={{ marginTop: '10%' }}>
			<View style={GlobalColors.card}>
				<MultipleButtons activeButton={filter} setFilter={setFilter} />
				<View style={homeScreenStyles.body}>
					<Comp setActive={setType} />
				</View>
				<Charts filter={filter} type={type} />
			</View>
		</View>
	);
}

function Comp({ setActive }: { setActive: Dispatch<SetStateAction<number>> }) {
	const scrollX = useRef(new Animated.Value(0)).current;

	const { width: windowWidth } = useWindowDimensions();
	const swiperRef = useRef<any>(null);
	const images = ['orderPrice', 'orderCount', 'visitor']
	const sumTotal = (key: string) => {
		return Math.round(10 * 5);
	};

	return (
		<View style={styles.scrollContainer}>
			<ScrollView
				horizontal
				ref={swiperRef}
				pagingEnabled
				showsHorizontalScrollIndicator={false}
				onScroll={Animated.event([
					{
						nativeEvent: {
							contentOffset: {
								x: scrollX,
							},
						},
					},
				], {
					useNativeDriver: false, listener(event: any) {
						const offsetX = event?.nativeEvent?.contentOffset?.x;
						const activeSlideIndex = Math.round((offsetX) / windowWidth);
						setActive(activeSlideIndex);
					},
				})
				}
				scrollEventThrottle={1}
			>
				<View style={{ width: windowWidth - 80 }} id='visitor'>
					<Text style={styles.infoText}>Gesamtumsatz</Text>
					<Text style={styles.title}>{sumTotal('orderPrice')}€</Text>
					<Text style={styles.infoText}>{sumTotal('orderCount')} Orders</Text>
				</View>
				<View style={{ width: windowWidth - 80 }} id='visitor1'>
					<Text style={styles.infoText}>Gesamtumsatz</Text>
					<Text style={styles.title}>{sumTotal('orderPrice')}€</Text>
					<Text style={styles.infoText}>{sumTotal('orderCount')} Orders</Text>
				</View>
				<View style={{ width: windowWidth - 80 }} id='visitor1'>
					<Text style={styles.infoText}>Gesamtumsatz</Text>
					<Text style={styles.title}>{sumTotal('orderPrice')}€</Text>
					<Text style={styles.infoText}>{sumTotal('orderCount')} Orders</Text>
				</View>
			</ScrollView>
			<View style={styles.indicatorContainer}>
				{images.map((image, imageIndex) => {
					const width = scrollX.interpolate({
						inputRange: [
							windowWidth * (imageIndex - 1),
							windowWidth * imageIndex,
							windowWidth * (imageIndex + 1),
						],
						outputRange: [8, 16, 8],
						extrapolate: 'clamp',
					});
					// eslint-disable-next-line react/no-array-index-key
					return <Animated.View key={imageIndex} style={[styles.normalDot, { width }]} />;
				})}
			</View>
		</View >
	);
}

function Charts({ filter, type }: { filter: FILTER, type: number }) {
	const { sumTotal, chartCategoryKeys, chartCategoryValues } = useHome({
		analytics: analytics,
		filter,
		type,
	});

	return (
		<BarChart
			data={{
				labels: chartCategoryKeys(),
				datasets: [
					{
						data: chartCategoryValues()[0] as any,
					},
				],
			}}
			width={Dimensions.get('window').width - 30}
			height={300}
			yAxisLabel={'$'}
			yAxisSuffix={'k'}
			verticalLabelRotation={filter === 'today' ? 50 : 0}
			chartConfig={{
				backgroundColor: '#1cc910',
				backgroundGradientFrom: '#eff3ff',
				backgroundGradientTo: '#efefef',
				decimalPlaces: 1,
				color: (opacity = 1) => GlobalColors.text.secondary,
				style: {
					borderRadius: 16,
				},
				verticalLabelRotation: 100,
				barPercentage: 0.5,
			}}
			showBarTops
			style={{
				marginVertical: 8,
				borderRadius: 16,
			}}
		/>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	scrollContainer: {
		alignItems: 'center',
		justifyContent: 'center',
	},
	card: {
		flex: 1,
		marginVertical: 4,
		marginHorizontal: 16,
		borderRadius: 5,
		overflow: 'hidden',
		alignItems: 'center',
		justifyContent: 'center',
	},
	textContainer: {
		backgroundColor: 'rgba(0,0,0, 0.7)',
		paddingHorizontal: 24,
		paddingVertical: 8,
		borderRadius: 5,
	},
	title: {
		textAlign: 'center',
		color: GlobalColors.text.primary,
		fontSize: 30,
		fontWeight: 'bold',
		padding: 1,
	},
	infoText: {
		textAlign: 'center',
		color: GlobalColors.text.secondary,
		fontSize: 18,
	},
	normalDot: {
		height: 8,
		width: 40,
		borderRadius: 4,
		backgroundColor: '#7d92bd',
		marginHorizontal: 4,
	},
	indicatorContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: isDarkMode ? '#0e1320' : '#d9d9d9',
		padding: 10,
		marginTop: 10,
		borderRadius: 25,
	},
});
