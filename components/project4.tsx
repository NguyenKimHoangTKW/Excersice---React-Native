import React, { useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";

export default function Project4(){
    const [pressCount, setPressCount] = useState(0);
    return(
        <View style={styles.body}>
            <Text>You've pressed the button: {pressCount} time(s)</Text>
            <Button title={`Pressed ${pressCount} time(s)`} onPress={()=>setPressCount(pressCount +1)}></Button>
        </View> 
    );
};

const styles = StyleSheet.create({
    body:{
        alignItems:'center',
        marginTop:20
    }
});