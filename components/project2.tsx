import React from "react";
import { Alert, Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Project2(){
    function SayHello(){
        Alert.alert("Hello");
    }
    return(
        <View style={styles.body}>
            <Button title={"Button 1" } onPress={SayHello}></Button>
            <TouchableOpacity style={styles.touch}>
                <Text style={styles.btn}>Button 2</Text>
            </TouchableOpacity>
        </View>
    )
};
const styles = StyleSheet.create({
    body:{
        flex:1,
        justifyContent:'center'
    },
    touch:{
        backgroundColor:'blue',
        padding:10,
        alignItems:"center",
        marginTop:10
    },
    btn:{
        color:'#fff',
        fontSize:18
    }
});