import React, { Component, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { buttonStyle, textInputStyle } from '../../assets/style/basic';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { API_BASE_URL } from '../constantApi';

function Withdraw({ navigation }) {
  const [withdraw, setWithdraw] = useState("");

  const WithdrawUser = async () => {
    const token = await AsyncStorage.getItem("token");
    await axios.post(
      `${API_BASE_URL}withdraw`,
      {
        debit: withdraw,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setWithdraw("");
    navigation.navigate("MainBank");
  };

  return (
    <SafeAreaView className="bg-white h-full">
      <View className="flex">
        <View className="text-2xl w-full gap-1 p-3 border-b border-slate-300 flex flex-row  items-center" >
          <TouchableOpacity onPress={() => navigation.navigate('MainUser')}>
            <MaterialCommunityIcons name="chevron-left" color='black' size={32} />
          </TouchableOpacity>
          <Text className="text-base font-bold">Withdraw</Text>
        </View>
        <View className="p-3 pt-6">
          <View>
            <Text className="text-md py-2">Balance</Text>
            <TextInput
              value={withdraw}
              className={`${textInputStyle}`}
              onChangeText={(e) => setWithdraw(e)}
              placeholder='Value'
            // value={text}
            />
          </View>


          <View className="mt-4">
            <TouchableOpacity className={`${buttonStyle}`} onPress={WithdrawUser}>
              <Text className="text-white text-base font-bold">Continue</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({})

export default Withdraw;
