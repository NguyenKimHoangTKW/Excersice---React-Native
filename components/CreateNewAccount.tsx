import React, { useState } from "react";
import { Alert, Image, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { TextInput } from "react-native-paper";
import { useNavigation } from '@react-navigation/native';
import { BASE_URL } from "../apiConfig";
export default function Create_New_Account() {
    const navigation = useNavigation();
    const [showPassword,setShowPassword] = useState(false);
    const [showCheckPassword,setShowCheckPassword] = useState(false);
    const [email,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [Check_password,setCheckPassword] = useState("");

    async function Create_New(){
        if(email === ""){
            Alert.alert("Email cannot be empty");
            return;
        }
        if(password === ""){
            Alert.alert("Password cannot be empty");
            return;
        }
        if(Check_password === ""){
            Alert.alert("Check password cannot be empty");
            return;
        }
        if(Check_password !== password){
            Alert.alert("Password re-entered incorrectly");
            return;
        }
        const responsive = await fetch(`${BASE_URL}/api/create-account`,{
           method:'POST',
           headers:{
            "Content-Type" :"application/json"
           },
           body:JSON.stringify({
            username : email,
            password : password
           }) 
        });
        const res = await responsive.json();
        if(res.success){
            Alert.alert(res.message);
        }
        else{
            Alert.alert(res.message);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar></StatusBar>         

           <View style={styles.form}>
                <Text style={styles.title_check}>Create a new account!</Text>
           <TextInput
                label="Email"
                placeholder="Enter email"
                value={email}
                onChangeText={setUsername}
                style={styles.ip}
                left={<TextInput.Icon icon="email" />}/>
            <TextInput
                label="Enter password"
                placeholder="Enter password"
                style={styles.ip}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                left={<TextInput.Icon icon={"key"}/>}
                right={<TextInput.Icon 
                    icon={showPassword ? "eye" :"eye-off"}
                    onPress={() => setShowPassword(!showPassword)}
                    />
                }/>
            <TextInput
                label="Enter password again"
                placeholder="Enter password again"
                style={styles.ip}
                value={Check_password}
                onChangeText={setCheckPassword}
                secureTextEntry={!showCheckPassword}
                left={<TextInput.Icon icon={"key"}/>}
                right={<TextInput.Icon 
                    icon={showCheckPassword ? "eye" :"eye-off"}
                    onPress={() => setShowCheckPassword(!showCheckPassword)}
                    />
                }/>    
                <TouchableOpacity style={styles.btn} onPress={Create_New}>
                    <Text style={{color:'#ffffff',fontWeight:'bold'}}>Signup</Text>
                </TouchableOpacity>
           </View>
           <View style={styles.form_option_password} > 
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text style={{color: '#0066ff',marginTop:15}}>Already has been Account!</Text>
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
        paddingTop: 150
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
        backgroundColor:'#ff8c00',
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
        textAlign:'center'
    }
})
export default Create_New_Account;