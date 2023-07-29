import {
	ActivityIndicator,
	Button,
	FlatList,
	Image,
	RefreshControl,
	StyleSheet,
	Text,
	View,
} from 'react-native';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { GlobalColors } from '../../theme/colors';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BottomTabsRootStackParamList } from '../../navigation/auth-guard-navigation';
import { SearchBar } from '../../components/search';
import { useGetAllDraftOrders } from '../../hooks/orders/useQueryOrders';
import dayjs from 'dayjs';
import { OrderStatus } from '../../components/order/status';

export type FILTER = 'today' | 'thisWeek' | 'thisMonth' | 'thisYear';

type Props = NativeStackScreenProps<BottomTabsRootStackParamList, 'Orders'>;

export function OrderScreen({ navigation }: Props) {
	const [search, setSearch] = useState<string>('');
	const inputRef = useRef<any>(null);
	const [page, _] = useState(1);
	const [refreshing, setRefreshing] = useState(false);
	const {
		getAllOrders,
		getAllOrdersLoading,
		refetch,
		isFetched,
		fetchNextPage,
		hasNextPage,
	} = useGetAllDraftOrders({
		limit: 20,
		page,
		search
	});

	useEffect(() => {
		navigation.setOptions({
			headerTitle: "Orders",
			headerRight() {
				return (
					<Button
						onPress={() =>
							navigation.navigate(
								"CreateOrder", { screen: "CreateOrder" })
						}
						title="Create"
					/>
				);
			},
		});
	}, [navigation]);

	const handleRefresh = useCallback(() => {
		setRefreshing(true);
		fetchNextPage();
		setTimeout(() => {
			setRefreshing(false);
		}, 2000);
	}, [fetchNextPage]);

	const renderEmpty = useMemo(() => {
		if (isFetched && getAllOrders?.pages.length === 0) {
			return (
				<View>
					<Text>NO DATA</Text>
					<Button title="Refresh" onPress={refetch} />
				</View>
			);
		}

		return null;
	}, [getAllOrders?.pages.length, isFetched, refetch]);


	const products = useMemo(() =>
		(getAllOrders?.pages ?? []).flatMap((pages) =>
			pages?.data.results.flatMap((item) => item)
		),
		[getAllOrders?.pages]
	);

	const renderFooter = useMemo(() => {
		if (!hasNextPage || !!(products.length < 10 && products.length !== 0)) return null;
		return (
			<View>
				<Text>no data more</Text>
			</View>
		)

	}, [hasNextPage, products?.length]);

	return (
		<View style={{ ...styles.container, marginTop: 10, marginBottom: 50 }}>
			<SearchBar inputRef={inputRef} search={search} setSearch={setSearch} />
			{getAllOrdersLoading ? (
				<ActivityIndicator />
			) : (
				<FlatList
					contentInsetAdjustmentBehavior='automatic'
					ListEmptyComponent={renderEmpty}
					ListFooterComponent={renderFooter}
					nestedScrollEnabled
					scrollEnabled
					refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
					data={products}
					keyExtractor={(item) => item?.id?.toString() ?? ''}
					renderItem={(data) => {
						return (
							<View style={styles.listItem}>
								<View style={styles.listItemLeftBox}>
									<Text style={styles.listItemSubtitle} numberOfLines={2} ellipsizeMode="tail">
										{data?.item?.draftOrderNumber} &#x2022; {dayjs(data?.item?.date).format('DD/MM/YYYY')}
									</Text>
									<Text style={styles.listItemTitle} numberOfLines={2} ellipsizeMode="tail">
										{data?.item?.customer?.name}
									</Text>
									<Text style={styles.listItemSubtitle} numberOfLines={2} ellipsizeMode="tail">
										<OrderStatus status={data?.item?.status} />
									</Text>
									<Text style={styles.listItemSubtitle} numberOfLines={2} ellipsizeMode="tail">
										{/* // TODO: set the correct item count: {data?.item?.} */}
										5 items
									</Text>
								</View>
								<Text style={styles.listItemPrice}>{data?.item?.total}</Text>
							</View>
						);
					}}
				/>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	listItem: {
		padding: 15,
		width: '100%',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		borderBottomWidth: 1,
		borderBottomColor: GlobalColors.primary,
	},
	listItemImage: {
		width: 85,
		height: 85,
		borderRadius: 10,
		borderColor: '#e0e0e0',
	},
	listItemLeftBox: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		gap: 5,
	},
	listItemTitleBox: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		width: '60%',
	},
	listItemTitle: {
		fontSize: 16,
		fontWeight: 'bold',
		color: GlobalColors.text.primary,
	},
	listItemSubtitle: {
		fontSize: 14,
		color: GlobalColors.text.secondary,
	},
	listItemPrice: {
		fontSize: 16,
		fontWeight: 'bold',
		color: GlobalColors.text.primary,
	},
});
