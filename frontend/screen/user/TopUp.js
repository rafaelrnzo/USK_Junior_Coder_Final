import React, { Component, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { buttonStyle, textInputStyle } from '../../assets/style/basic';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { API_BASE_URL } from '../constantApi';

function TopUp({ navigation }) {
  const [creditTopUp, setcreditTopUp] = useState("");

  const topUpUser = async () => {
    const token = await AsyncStorage.getItem("token");
    await axios.post(
      `${API_BASE_URL}topup`,
      {
        credit: creditTopUp,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setcreditTopUp("");
    // modalInteraction();
    navigation.navigate("MainUser");
  };

  return (
    <SafeAreaView className="bg-white h-full">
      <View className="flex">
        <View className="text-2xl w-full gap-1 p-3 border-b border-slate-300 flex flex-row  items-center" >
          <TouchableOpacity onPress={() => navigation.navigate('MainUser')}>
            <MaterialCommunityIcons name="chevron-left" color='black' size={32} />
          </TouchableOpacity>
          <Text className="text-base font-bold">Top Up</Text>
        </View>
        <View className="p-3 pt-6">
          <View>
            <Text className="text-md py-2">Balance</Text>
            <TextInput
              value={creditTopUp}
              className={`${textInputStyle}`}
              onChangeText={(e) => setcreditTopUp(e)}
              placeholder='Value'
            // value={text}
            />
          </View>


          <View className="mt-4">
            <TouchableOpacity className={`${buttonStyle}`} onPress={topUpUser}>
              <Text className="text-white text-base font-bold">Continue</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({})

export default TopUp;
