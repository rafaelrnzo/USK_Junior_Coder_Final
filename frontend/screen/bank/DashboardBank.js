import { View, Text, Button, FlatList, TouchableOpacity, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { API_BASE_URL } from "../constantApi";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const HomeBank = ({ navigation }) => {
  const [loading, setloading] = useState(true);
  const [dataBank, setdataBank] = useState([]);

  const getDataBank = async () => {
    const token = await AsyncStorage.getItem("token");
    const response = await axios.get(`${API_BASE_URL}bank`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setdataBank(response.data);
    setloading(false);
  };

  useEffect(() => {
    getDataBank();
  }, []);

  const logout = async () => {
    const token = await AsyncStorage.getItem("token");
    await axios.post(
      `${API_BASE_URL}logout`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    await AsyncStorage.multiRemove(["token", "role", "name"]);
    navigation.navigate("Login");
  };

  return (
    <SafeAreaView className="h-full bg-white">
      {loading ? <Text>Loading...</Text> :
        <ScrollView className="flex h-auto">
          <View className="text-2xl w-full p-3 py-4 border-b border-slate-300 flex flex-row justify-between items-center bg-white align-middle" >
            <Text className="text-lg font-bold">Bank</Text>
            <View className="flex flex-row gap-3">
              <TouchableOpacity onPress={logout}>
                <MaterialCommunityIcons name="logout" color='black' size={24} />
              </TouchableOpacity>
            </View>
          </View>
          <View className="text-2xl  w-full p-3 py-0 pt-3 flex flex-row justify-between items-center bg-white align-middle" >
            <Text className="text-lg font-bold">Welcome Back {dataBank.user.name}!</Text>
          </View>
          <View className=" py-0 flex p-3 justify-between ">
            <View className="flex flex-row gap-3 justify-between mb-3">
              <View className="bg-white flex-1 p-3 py-4 border border-slate-200 rounded-lg">
                <View className="gap-0">
                  <Text className="text-slate-800 ">Balance Total</Text>
                  <Text className="text-black font-bold text-lg">Rp{dataBank.balanceBank}</Text>
                </View>
              </View>
              <View className="bg-white flex-1 p-3 py-4 border border-slate-200 rounded-lg">
                <View className="gap-0">
                  <Text className="text-slate-800 ">Nasabah</Text>
                  <Text className="text-black font-bold text-lg">{dataBank.nasabah}</Text>
                </View>
              </View>
            </View>
            <View className="flex flex-row gap-3 justify-between">
              <View className="bg-white flex-1 p-3 py-4 border border-slate-200 rounded-lg">
                <View className="gap-0">
                  <Text className="text-slate-800 ">Total Wallet</Text>
                  <Text className="text-black font-bold text-lg">{dataBank.walletCount || ''}</Text>
                </View>
              </View>
              <View className="bg-white flex-1 p-3 py-4 border border-slate-200 rounded-lg">
                <View className="gap-0">
                  <Text className="text-slate-800 ">Pending</Text>
                  <Text className="text-black font-bold text-lg">20</Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      }
    </SafeAreaView>
  );
};

const styles = {
  item: {
    flex: 1,
    maxWidth: "100%",
    alignItems: "center",
    padding: 10,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
};

export default HomeBank;