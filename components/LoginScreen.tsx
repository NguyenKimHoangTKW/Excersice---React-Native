import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Alert, Image, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { TextInput } from "react-native-paper";
import { BASE_URL } from "../apiConfig";
export default function Login(){
    const navigation = useNavigation();
    const [showPassword,setShowPassword] = useState(false);
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    async function Check_Login(){
        if(email === ""){
            Alert.alert("Email cannot be empty");
            return;
        }
        if(password === ""){
            Alert.alert("Password cannot be empty");
            return;
        }
        const responsive = await fetch(`${BASE_URL}/dang-nhap`,{
            method:'POST',
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                username : email,
                password : password
            })
        });
        const res = await responsive.json();
        if(res.success){
            if (res.success) {
                if(res.data[0].id_role === 1){
                    navigation.navigate('Home', { username: res.data[0].username });
                }
                else{
                    Alert.alert("Tài khoản này không phải Admin");
                }
              }
        }
        else{
            Alert.alert(res.message);
        }
    }
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar />
            <View style={styles.form}>
                <Text style={styles.title_check}>Login</Text>
                <TextInput
                    label="Email"
                    placeholder="Enter email" 
                    value={email}
                    onChangeText={setEmail}
                    style={styles.ip}
                    left={<TextInput.Icon icon="email" />}
                />
                <TextInput
                    label="Password"
                    placeholder="Enter password"
                    style={styles.ip}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                    left={<TextInput.Icon icon={"key"} />}
                    right={<TextInput.Icon 
                        icon={showPassword ? "eye-off" :"eye"}
                        onPress={() => setShowPassword(!showPassword)}
                    />}
                />
                <TouchableOpacity style={styles.btn} onPress={Check_Login}>
                    <Text style={{ color: '#ffffff', fontWeight: 'bold' }}>Login</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.form_option_password} >
                <TouchableOpacity onPress={() => navigation.navigate('Create New Account')}>
                    <Text style={{ color: '#0066ff', marginTop: 15 }}>Create a new account</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Reset Password')}>
                    <Text style={{ color: '#0066ff', marginTop: 15 }}>Forget Password</Text>
                </TouchableOpacity>   
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        paddingHorizontal: 30
    },
    form: {
        marginTop: 150
    },
    ip: {
        borderColor: 'black',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderRadius: 7,
        marginTop: 30
    },
    btn: {
        marginTop: 20,
        backgroundColor: '#ef506b',
        paddingVertical: 15,
        alignItems: 'center',
        borderRadius: 10
    },
    imageContainer: {
        alignItems: 'center',
        marginTop: 20,
        width: 350,
        height: 250
    },
    form_option_password: {
        alignItems: 'center',
        marginTop: 20
    },
    title_check:{
        fontSize:50,
        fontWeight:'bold',
        textAlign:'center',
        color:'#ef506b'
    }
});