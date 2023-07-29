import { StyleSheet, Text, View } from "react-native";

export function OrderStatus({ status }: { status: string }) {
    switch (status) {
        case 'completed':
            return <View style={[styles[status], styles.chip]}><Text style={styles[`${status}Text`]}>Completed</Text></View>
        default:
            return <Text style={styles.pending}>Pending</Text>
    }
}

const styles = StyleSheet.create({
    chip: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5,
        borderRadius: 5,
    },
    completed: {
        backgroundColor: '#4f772d8f',
    },
    completedText: {
        color: '#ecf39e',
    },
    pending: {
        color: 'red',
        backgroundColor: '#fef2e6',
        padding: 5,
        borderRadius: 5,
    },
});