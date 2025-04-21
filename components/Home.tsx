import React from "react";
import { Button, Text, View, StyleSheet, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function Home() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lab1 - Nguyễn Kim Hoàng</Text>
      <Text style={styles.title}>MSSV - 2124802010093</Text>
      <ScrollView contentContainerStyle={styles.buttonContainer}>
        <View style={styles.buttonWrapper}>
          <Button title="Project 1" onPress={() => navigation.navigate("Project1")} />
        </View>
        <View style={styles.buttonWrapper}>
          <Button title="Project 2" onPress={() => navigation.navigate("Project2")} />
        </View>
        <View style={styles.buttonWrapper}>
          <Button title="Project 3" onPress={() => navigation.navigate("Project3")} />
        </View>
        <View style={styles.buttonWrapper}>
          <Button title="Project 4" onPress={() => navigation.navigate("Project4")} />
        </View>
        <View style={styles.buttonWrapper}>
          <Button title="Project 5" onPress={() => navigation.navigate("Project5")} />
        </View>
        <View style={styles.buttonWrapper}>
          <Button title="Project 6" onPress={() => navigation.navigate("Project6")} />
        </View>
        <View style={styles.buttonWrapper}>
          <Button title="Project 7" onPress={() => navigation.navigate("Project7")} />
        </View>
        <View style={styles.buttonWrapper}>
          <Button title="Project 8" onPress={() => navigation.navigate("Project8")} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f0f4f8",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
    paddingBottom: 20,
  },
  buttonWrapper: {
    width: "100%",
    marginBottom: 12,
  },
});
