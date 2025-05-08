import React, { useState } from "react";
import { Alert, Image, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { TextInput } from "react-native-paper";
import { useNavigation } from '@react-navigation/native';
import { BASE_URL } from "../apiConfig";

const CreateNewAccount = () => {
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
        const responsive = await fetch(`${BASE_URL}/create-account`,{
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
            <StatusBar />
            <View style={styles.formBox}>
                <Text style={styles.title_check}>Create Account</Text>
                <Text style={styles.subtitle}>Join us and start your journey!</Text>
                <TextInput
                    label="Email"
                    placeholder="Enter email"
                    value={email}
                    onChangeText={setUsername}
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
                    left={<TextInput.Icon icon={"key"}/>}
                    right={<TextInput.Icon 
                        icon={showPassword ? "eye-off" :"eye"}
                        onPress={() => setShowPassword(!showPassword)}
                    />}
                />
                <TextInput
                    label="Confirm Password"
                    placeholder="Enter password again"
                    style={styles.ip}
                    value={Check_password}
                    onChangeText={setCheckPassword}
                    secureTextEntry={!showCheckPassword}
                    left={<TextInput.Icon icon={"key"}/>}
                    right={<TextInput.Icon 
                        icon={showCheckPassword ? "eye-off" :"eye"}
                        onPress={() => setShowCheckPassword(!showCheckPassword)}
                    />}
                />    
                <TouchableOpacity style={styles.btn} onPress={Create_New}>
                    <Text style={styles.btnText}>Create Account</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.form_option_password}>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.linkText}>Already have an account? Sign in</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f6f8fa',
        paddingHorizontal: 0,
        justifyContent: 'center',
    },
    formBox: {
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 30,
        marginHorizontal: 20,
        shadowColor: '#ef506b',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 8,
    },
    title_check: {
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 8,
        color: '#ef506b',
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginBottom: 30,
    },
    ip: {
        borderColor: '#e0e0e0',
        backgroundColor: '#f9f9f9',
        borderWidth: 1,
        borderRadius: 12,
        marginTop: 20,
        fontSize: 16,
        paddingLeft: 8,
    },
    btn: {
        marginTop: 30,
        backgroundColor: '#ef506b',
        paddingVertical: 16,
        alignItems: 'center',
        borderRadius: 12,
        shadowColor: '#ef506b',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4,
    },
    btnText: {
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    form_option_password: {
        alignItems: 'center',
        marginTop: 30,
    },
    linkText: {
        color: '#0066ff',
        fontSize: 15,
        fontWeight: '500',
    }
});

export default CreateNewAccount;