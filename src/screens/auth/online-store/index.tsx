import { useCallback, useEffect, useMemo, useState } from "react";
import { ActivityIndicator, Button, FlatList, Image, Pressable, RefreshControl, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { useGetAllShops } from "../../../hooks/auth/useQueryAuth";
import { SearchBar } from "../../../components/search";
import { GlobalColors } from "../../../theme/colors";
import { localStorage } from "../../../utils/storage";
import { BottomTabsRootStackParamList, RootStackParamList } from "../../../navigation/auth-guard-navigation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useDispatch } from "react-redux";
import { setShop } from "../../../redux/slices/shop";

type Props = NativeStackScreenProps<RootStackParamList, 'OnlineStore', 'TabsOverview'>;

export function OnlineStore({ navigation }: Props) {
    const { getAllShops, getAllShopsError, getAllShopsLoading, getAllShopsRefetch } = useGetAllShops();
    const [search, setSearch] = useState<string>('');
    const [refreshing, setRefreshing] = useState(false);
    const dispatch = useDispatch();
    useEffect(() => {
        navigation.setOptions({
            headerTitle: "Online Store",
            headerSearchBarOptions: {
                placeholder: "Search",
                onChangeText: (event) => setSearch(event.nativeEvent.text),
            },
        });
    }, [navigation]);


    const handleSelectShop = useCallback((tenantId: string, shop: IShop) => {
        localStorage.setItem('TENANT_ID', tenantId);
        dispatch(setShop(shop))
        navigation.navigate("TabsOverview");
    }, [])

    const handleRefresh = useCallback(() => {
        setRefreshing(true);
        getAllShopsRefetch();
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }, [getAllShopsRefetch]);

    const renderShops = useMemo(() =>
        getAllShops?.filter((shop) => !!search ? shop.shopName.toLowerCase().includes(search.toLowerCase()) : true) ?? []
        , [getAllShops, search])

    const renderEmpty = useMemo(() => {
        if (renderShops?.length === 0) {
            return (
                <View>
                    <Text>NO DATA</Text>
                    <Button title="Refresh" onPress={getAllShopsRefetch} />
                </View>
            );
        }

        return null;
    }, [renderShops, getAllShopsRefetch]);

    if (getAllShopsError) return <SafeAreaView><Text>ERROR</Text></SafeAreaView>

    return (
        <SafeAreaView style={{ ...styles.container }}>
            <Text style={styles.title}>All Online Shops</Text>
            {getAllShopsLoading ? (
                <ActivityIndicator />
            ) : (
                <FlatList
                    ListEmptyComponent={renderEmpty}
                    nestedScrollEnabled
                    scrollEnabled
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
                    data={renderShops ?? []}
                    keyExtractor={(item) => item?.tenantId?.toString() ?? ''}
                    renderItem={(data) => {
                        return (
                            <Pressable onPress={() => handleSelectShop(data.item.tenantId, data.item)} style={styles.listItem}>
                                <View style={styles.listItemLeftBox}>
                                    <Image
                                        style={styles.listItemImage}
                                        source={require('../../../../assets/icon.png')}
                                    />
                                    <View style={styles.listItemTitleBox}>
                                        <Text style={styles.listItemTitle} numberOfLines={2} ellipsizeMode="tail">
                                            {data?.item?.shopName}
                                        </Text>
                                        <Text style={styles.listItemSubtitle} numberOfLines={2} ellipsizeMode="tail">
                                            {data?.item?.shopDomain}
                                        </Text>
                                    </View>
                                </View>
                            </Pressable>
                        );
                    }}
                />
            )}
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        margin: 10,
        color: GlobalColors.text.primary,
    },
    searchSection: {
        margin: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 10,
        alignItems: 'center',
        borderWidth: 2,
        borderColor: GlobalColors.primary,
    },
    input: {
        flex: 1,
        paddingTop: 10,
        paddingRight: 10,
        paddingBottom: 10,
        paddingLeft: 0,
        backgroundColor: '#fff',
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
        width: 80,
        height: 80,
        borderRadius: 10,
        borderColor: '#e0e0e0',
    },
    listItemLeftBox: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 15,
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