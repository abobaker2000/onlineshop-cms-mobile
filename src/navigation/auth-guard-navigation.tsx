import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign } from '@expo/vector-icons';
import { HomeScreen } from '../screens/home';
import { GlobalColors } from '../theme/colors';
import { ProductScreen } from '../screens/products';
import { OnlineStore } from '../screens/auth/online-store';
import { localStorage } from '../utils/storage';
import { OrderScreen } from '../screens/orders';
import { CreateProduct } from '../screens/products/create-product';
import { NavigatorScreenParams } from '@react-navigation/native';
import { CreateOrder } from '../screens/orders/create-order';

export type BottomTabsRootStackParamList = {
	Home: undefined;
	Products: undefined;
	Orders: undefined;
	Settings: undefined;
	Onlinestore: undefined;
	CreateProduct: NavigatorScreenParams<RootStackParamList>
	CreateOrder: NavigatorScreenParams<RootStackParamList>
};

export type RootStackParamList = {
	TabsOverview: undefined;
	OnlineStore: undefined;
	Home: undefined;
	CreateProduct: undefined;
	CreateOrder: undefined;
};

function RenderTabs() {
	const BottomTab = createBottomTabNavigator<BottomTabsRootStackParamList>();
	return (
		<BottomTab.Navigator
			screenOptions={{
				headerStyle: {
					backgroundColor: GlobalColors.primary,
				},
				headerTintColor: GlobalColors.text.primary,
				tabBarStyle: {
					backgroundColor: GlobalColors.primary,
				},
				tabBarInactiveTintColor: GlobalColors.text.secondary,
				tabBarActiveTintColor: GlobalColors.text.primary,
			}}
		>
			<BottomTab.Screen
				name="Home"
				component={HomeScreen}
				options={{
					title: 'Home',
					// eslint-disable-next-line react/no-unstable-nested-components
					tabBarIcon: ({ color, size }) => <AntDesign name="home" size={size} color={color} />,
				}}
			/>
			<BottomTab.Screen
				name="Products"
				component={ProductScreen}
				options={{
					title: 'Products',
					// eslint-disable-next-line react/no-unstable-nested-components
					tabBarIcon: ({ color, size }) => (
						<AntDesign name="shoppingcart" size={size} color={color} />
					),
				}}
			/>
			<BottomTab.Screen
				name="Orders"
				component={OrderScreen}
				options={{
					title: 'Orders',
					// eslint-disable-next-line react/no-unstable-nested-components
					tabBarIcon: ({ color, size }) => <AntDesign name="linechart" size={size} color={color} />,
				}}
			/>
			<BottomTab.Screen
				name="Settings"
				component={HomeScreen}
				options={{
					title: 'Settings',
					// eslint-disable-next-line react/no-unstable-nested-components
					tabBarIcon: ({ color, size }) => <AntDesign name="setting" size={size} color={color} />,
				}}
			/>
		</BottomTab.Navigator>
	);
}

export function AuthGuardNavigation() {
	const Stack = createNativeStackNavigator<RootStackParamList>();

	return (
		<Stack.Navigator>
			<Stack.Screen name="OnlineStore" component={OnlineStore} />
			<Stack.Screen
				name="TabsOverview"
				component={RenderTabs}
				options={{
					headerShown: false,
				}}
			/>
			<Stack.Screen
				name="CreateProduct"
				component={CreateProduct}
			/>
			<Stack.Screen
				name="CreateOrder"
				component={CreateOrder}
			/>
		</Stack.Navigator>
	);
}
