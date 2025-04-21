import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Project1(){
    return(
        <View style={styles.body}>
            <Text style={styles.title}>Hello World</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    body:{
        width:100,
        height:100,
        backgroundColor:'aqua',
        alignItems:'center',
        justifyContent:'center'
    },
    title:{
        color:'#fff'
    }
});