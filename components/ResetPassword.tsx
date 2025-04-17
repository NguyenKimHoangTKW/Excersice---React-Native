import React, { useState } from "react";
import { Alert, Image, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import AwesomeAlert from "react-native-awesome-alerts";
import { TextInput } from "react-native-paper";
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { NavigationContainer } from "@react-navigation/native";
import Create_New_Password from "./CreateNewAccount";
import { useNavigation } from '@react-navigation/native';
const ResetPassword = () =>{
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertTitle, setAlertTitle] = useState('');
    const CheckLogin = () => {
      if (username === "") {
        setAlertTitle("Lỗi");
        setAlertMessage("Không được bỏ trống Tên đăng nhập");
        setShowAlert(true);
      } else if (password === "") {
        setAlertTitle("Lỗi");
        setAlertMessage("Không được bỏ trống Mật khẩu");
        setShowAlert(true);
      } else {
        setAlertTitle("Thông tin đăng nhập");
        setAlertMessage(`Tài khoản: ${username}\nMật khẩu: ${password}`);
        setShowAlert(true);
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
                value={username}
                onChangeText={setUsername}
                style={styles.ip}
                left={<TextInput.Icon icon="email" />}/>
                <TouchableOpacity style={styles.btn} onPress={CheckLogin}>
                    <Text style={{color:'#ffffff',fontWeight:'bold'}}>Signup</Text>
                </TouchableOpacity>
           </View>
           <View style={styles.form_option_password} >
                <Text style={{color: '#0066ff',marginTop:15}}>Go back to Login</Text>
           </View>
           <AwesomeAlert
                show={showAlert}
                showProgress={false}
                title={alertTitle}
                message={alertMessage}
                closeOnTouchOutside={true}
                closeOnHardwareBackPress={false}
                showConfirmButton={true}
                confirmText="OK"
                confirmButtonColor="#1bcdff"
                onConfirmPressed={() => {
                setShowAlert(false);
                }}
            />
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
    }
})
export default ResetPassword;