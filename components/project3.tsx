import React from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';

export default function Project3() {

    function SayHello(title) {
        Alert.alert(title);
    }

    return (
        <View style={styles.body}>
            <TouchableOpacity 
                style={styles.touch1}
                onPress={() => SayHello("Say Hello")}
            >
                <Text style={styles.btn}>Say Hello</Text>
            </TouchableOpacity>

            <TouchableOpacity 
                style={styles.touch2}
                onPress={() => SayHello("Say Goodbye")}
            >
                <Text style={styles.btn}>Say Goodbye</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    body: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    touch1: {
        backgroundColor: '#f44336',
        padding: 10,
        marginBottom: 20,
        borderRadius: 5,
    },
    touch2: {      
        backgroundColor: '#4CAF50',
        padding: 10,
        borderRadius: 5,
    },
    btn: {
        color: '#fff',
        fontSize: 18,
    }
});
