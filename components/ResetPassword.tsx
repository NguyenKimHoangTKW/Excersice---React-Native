import React, { useState } from "react";
import { Alert, Image, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { TextInput } from "react-native-paper";
import { useNavigation } from '@react-navigation/native';
import { BASE_URL } from "../apiConfig";
const ResetPassword = () =>{
    const navigate = useNavigation();
    const [email,setEmail] = useState("");

    async function Reset_Password(){
        if(email === ""){
            Alert.alert("Email cannot be empty");
            return;
        }
        const responsive = await fetch(`${BASE_URL}/api/edit-account`,{
            method:'POST',
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                username : email,
            })
        });
        const res = await responsive.json();
        if(res.success){
            Alert.alert(`Password has been reset to: ${res.data[0].password}`)
        }
        else{
            Alert.alert(res.message);
        }
    };
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar></StatusBar>         
           <View style={styles.form}>
                <Text style={styles.title_check}>Reset your password</Text>
           <TextInput
                label="Enter Email"
                placeholder="Enter email"
                value={email}
                onChangeText={setEmail}
                style={styles.ip}
                left={<TextInput.Icon icon="email" />}/>
                <TouchableOpacity style={styles.btn} onPress={Reset_Password}>
                    <Text style={{color:'#ffffff',fontWeight:'bold'}}>Signup</Text>
                </TouchableOpacity>
           </View>
           <View style={styles.form_option_password} >
                <TouchableOpacity onPress={() => navigate.navigate('Login')}>
                    <Text style={{color: '#0066ff',marginTop:15}}>Go back to Login</Text>
                </TouchableOpacity> 
           </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#ffffff',
        paddingHorizontal:30,
    },
    title:{
        marginTop:25,
        alignItems:'center'
    },
    form:{
        marginTop:30
    },
    ip:{
        borderColor:'black',
        backgroundColor:'#fff',
        borderWidth:1,
        borderRadius:7,
        marginTop:30
    },
    btn:{
        marginTop:20,
        backgroundColor:'#ef506b',
        paddingVertical:15,
        alignItems:'center',
        borderRadius:10
    },
    imageContainer: {
        alignItems: 'center',
        marginTop: 10,
        width:350,
        height:250
    },
    form_option_password:{
        alignItems:'center',
        marginTop:5,
        
    },
    title_check:{
        fontSize:30,
        fontWeight:'bold',
    }
})
export default ResetPassword;