import React, { useState } from "react";
import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";

export default function Project7() {
    const [name, setName] = useState("");

    const CheckName = () => {
        if (name === "") {
            return <View />;
        } else {
            return (
                <View style={styles.greetingContainer}>
                    <Text style={styles.greetingText}>Hello, {name}</Text>
                </View>
            );
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>What is your name?</Text>
            <TextInput
                style={styles.input}
                placeholder="John Doe"
                placeholderTextColor="rgba(0,0,0,0.5)"
                onChangeText={setName}
                value={name}
            />
            <CheckName />
            <Button
                title={"Say Hello"}
                onPress={() => {
                    setName("");
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        marginTop: 50
    },
    label: {
        fontWeight: "bold",
        fontSize: 18
    },
    input: {
        marginTop: 10,
        backgroundColor: "rgba(0,0,0,0.1)",
        padding: 10,
        borderRadius: 5
    },
    greetingContainer: {
        marginVertical: 10
    },
    greetingText: {
        fontSize: 16,
        fontWeight: "600",
        color: "#333"
    }
});
