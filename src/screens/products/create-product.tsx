import { Alert, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { GlobalColors } from "../../theme/colors";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/auth-guard-navigation";
import { useEffect } from "react";
import WebView from "react-native-webview";
import { WebViewNavigation, WebViewNavigationEvent } from "react-native-webview/lib/WebViewTypes";
import { useSelector } from "../../redux";

type Props = NativeStackScreenProps<RootStackParamList, 'CreateProduct', 'TabsOverview'>;

export function CreateProduct({ navigation }: Props) {
    const { adminDomain } = useSelector(state => state.shop.shop);
    useEffect(() => {
        navigation.setOptions({
            headerTitle: "Create Product",
            headerBackTitle: "Back",
            headerTintColor: GlobalColors.text.primary
        });
    }, [navigation]);
    const runFirst = `
      true; // note: this is required, or you'll sometimes get silent failures
    `;

    const handleWebViewNavigationStateChange = (newNavState: WebViewNavigation) => {

        const { url } = newNavState;
        if (!url) return;

        // one way to handle a successful form submit is via query strings
        if (!url.includes('create-mobile-view')) {
            navigation.navigate('TabsOverview');
        }

    };
    return (
        <View style={{ flex: 1 }}>
            <WebView
                source={{
                    uri: `https://${adminDomain}/dashboard/products/create-mobile-view`,
                }}
                sharedCookiesEnabled={true}
                onNavigationStateChange={handleWebViewNavigationStateChange}
                injectedJavaScript={runFirst}
            />
        </View>
    )
}
