import React, { useState } from "react";
import { Image, SafeAreaView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import AwesomeAlert from "react-native-awesome-alerts";

const Login = () =>{
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
            <View style={styles.title}>
                <Text style={{fontWeight:'bold', fontSize:30}}>Màn hình đăng nhập</Text>               
            </View>
            <View>
                <Text style={{fontSize:20,marginTop:30, fontWeight:'bold'}}> SVTH: <Text style={{color:'red',fontWeight:'bold'}}>Nguyễn Kim Hoàng</Text></Text>
                <Text style={{fontSize:16, fontWeight:'bold',marginTop:10}}> MSSV: <Text style={{color:'red',fontWeight:'bold'}}>2124802010093</Text></Text>
            </View>
            <View style={styles.imageContainer}>
                <Image
                    source={require("../assets/images/react-native-1.png")}
                />
            </View>
           <View style={styles.form}>
                <TextInput 
                placeholder="Nhập tài khoản" 
                style={styles.ip} 
                value={username} 
                onChangeText={setUsername}></TextInput>
                <TextInput
                placeholder="Nhập mật khẩu"
                style={styles.ip}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={true}
                ></TextInput>
                <TouchableOpacity style={styles.btn} onPress={CheckLogin}>
                    <Text style={{color:'#ffffff',fontWeight:'bold'}}>Đăng nhập</Text>
                </TouchableOpacity>
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
        paddingHorizontal:30
    },
    title:{
        marginTop:30,
        alignItems:'center'
    },
    form:{
        marginTop:30
    },
    ip:{
        borderColor:'black',
        backgroundColor:'#fff',
        borderBottomWidth:1,
        marginTop:30
    },
    btn:{
        marginTop:20,
        backgroundColor:'#1bcdff',
        paddingVertical:15,
        alignItems:'center',
        borderRadius:20
    },
    imageContainer: {
        alignItems: 'center',
        marginTop: 20,
      }      

})
export default Login;