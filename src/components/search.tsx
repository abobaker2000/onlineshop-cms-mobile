
import { StyleSheet, TextInput, View } from "react-native";
import { GlobalColors } from "../theme/colors";
import { EvilIcons } from "@expo/vector-icons";

interface SearchBarProps {
    search: string;
    setSearch: (e: string) => void;
    inputRef: any | undefined;
}

export function SearchBar({ inputRef, search, setSearch }: SearchBarProps) {
    return (
        <View
            style={{
                ...styles.searchSection,
            }}
        >
            <EvilIcons name="search" size={24} color={GlobalColors.secondary} />
            <TextInput
                ref={inputRef}
                style={styles.input}
                placeholder="Search"
                onChangeText={(e) => {
                    setSearch(e);
                }}
                value={search}
            />
        </View>
    )
}


const styles = StyleSheet.create({
    searchSection: {
        margin: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 10,
        alignItems: 'center',
        borderWidth: 2,
        borderColor: GlobalColors.secondary,
        borderRadius: 10,
    },
    input: {
        flex: 1,
        paddingTop: 10,
        paddingRight: 10,
        paddingBottom: 10,
        paddingLeft: 0,
        // backgroundColor: '#fff',
    },
});
