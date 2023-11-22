import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Button, BackHandler } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { buttonStyle, textInputStyle } from '../../assets/style/basic';
import axios from 'axios';
import { API_BASE_URL } from '../constantApi';
import AsyncStorage from "@react-native-async-storage/async-storage";

function LoginPage({ navigation }) {
  const [name, setname] = useState("");
  const [password, setpassword] = useState("");

  const saveTokenRole = async (token, role) => {
    try {
      await AsyncStorage.setItem("token", token);
      await AsyncStorage.setItem("role", role);
    } catch (error) {
      console.log(error);
    }
  };

  const loginUser = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}login`, {
        name: name,
        password: password,
      }); 
      console.log(response.data);
      const token = response.data.token;
      const role = response.data.message;
      console.log(token, role);
      await saveTokenRole(token, role);
      setname("");
      setpassword("");
      navigateToHomeScreen(role);
    } catch (error) {
      console.log(error);
    }
  };

  const navigateToHomeScreen = (role) => {
    switch (role) {
      case "siswa":
        navigation.navigate("MainUser");
        break;
      case "kantin":
        navigation.navigate("MainCanteen");
        break;
      case "bank":
        navigation.navigate("MainBank");
        break;
      default:
        navigation.navigate("MainAdmin");
    }
  };

  return (
    <SafeAreaView className="bg-white h-full">
      <View className="flex">
        <View className="text-2xl w-full p-3 border-b border-slate-300 flex flex-row justify-between items-center" >
          <Text className="text-base font-bold">Login</Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
            <Text className="text-md text-blue-600 font-bold">Sign In</Text>
          </TouchableOpacity>
        </View>
        <View className="p-3 pt-6">
          <View>
            <Text className="text-md py-2">Username</Text>
            <TextInput
              value={name}
              className={`${textInputStyleLogin}`}
              onChangeText={(text) => setname(text)}
              placeholder='Username'
            />
          </View>
          <View className="">
            <Text className="text-md py-2">Password</Text>
            <TextInput
              value={password}
              className={`${textInputStyleLogin} border`}
              onChangeText={(text) => setpassword(text)}
              placeholder='Password'
            />
          </View>
          <View className="mt-4">
            <TouchableOpacity onPress={loginUser} className={`${buttonStyle}`}>
              <Text className="text-white text-base font-bold">Continue</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
const textInputStyleLogin =
  "tracking-widest border p-3 py-2 text-base border-slate-300 rounded-lg w-full text-base ";

export default LoginPage;

