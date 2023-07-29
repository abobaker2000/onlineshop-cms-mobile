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
import { useGetAllProducts } from '../../hooks/products/useQueryProducts';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BottomTabsRootStackParamList } from '../../navigation/auth-guard-navigation';
import { SearchBar } from '../../components/search';

export type FILTER = 'today' | 'thisWeek' | 'thisMonth' | 'thisYear';

type Props = NativeStackScreenProps<BottomTabsRootStackParamList, 'Products'>;

export function ProductScreen({ navigation }: Props) {
	const [search, setSearch] = useState<string>('');
	const [view, setView] = useState<boolean>(false);
	const inputRef = useRef<any>(null);
	const [page, _] = useState(1);
	const [refreshing, setRefreshing] = useState(false);
	const {
		getAllProducts,
		getAllProductsLoading,
		refetch,
		isFetched,
		fetchNextPage,
		hasNextPage,
	} = useGetAllProducts({
		limit: 20,
		page,
		search
	});


	useEffect(() => {
		navigation.setOptions({
			headerTitle: "Products",
			headerRight() {
				return (
					<Button
						onPress={() =>
							navigation.navigate(
								"CreateProduct", { screen: "CreateProduct" })
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
		if (isFetched && getAllProducts?.pages.length === 0) {
			return (
				<View>
					<Text>NO DATA</Text>
					<Button title="Refresh" onPress={refetch} />
				</View>
			);
		}

		return null;
	}, [getAllProducts?.pages.length, isFetched, refetch]);


	const products = useMemo(() =>
		(getAllProducts?.pages ?? []).flatMap((pages) =>
			pages?.data.results.flatMap((item) => item)
		),
		[getAllProducts?.pages]
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
			<Button title="Refresh" onPress={() => setView(true)} />
			{getAllProductsLoading ? (
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
									<Image
										style={styles.listItemImage}
										source={require('../../../assets/icon.png')}
									/>
									<View style={styles.listItemTitleBox}>
										<Text style={styles.listItemTitle} numberOfLines={2} ellipsizeMode="tail">
											{data?.item?.name}
										</Text>
										<Text style={styles.listItemSubtitle} numberOfLines={2} ellipsizeMode="tail">
											{data?.item?.category?.defaultName}
										</Text>
									</View>
								</View>
								<Text style={styles.listItemPrice}>{data?.item?.variants.find((variant) => variant.isDefault)?.price}</Text>
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
		flexDirection: 'row',
		justifyContent: 'flex-start',
		gap: 10,
	},
	listItemTitleBox: {
		display: 'flex',
		flexDirection: 'column',
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
