import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  View,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { API_BASE_URL } from '../constantApi';

const DashboardCanteenPage = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(true);
  const gap = 12
  const [transactionKantin, settransactionKantin] = useState([]);

  const getDataKantin = async () => {
    const token = await AsyncStorage.getItem("token");
    const role = await AsyncStorage.getItem("role");
    const response = await axios.get(`${API_BASE_URL}kantin`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data.user);
    setData(response.data);
    setLoading(false)
  };

  const getTransactionKantin = async () => {
    const token = await AsyncStorage.getItem("token");
    const response = await axios.get(`${API_BASE_URL}transaction-kantin`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data);
    settransactionKantin(response.data);
  };

  const onRefresh = () => {
    setRefresh(true)
    getDataKantin();
  }


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
    await AsyncStorage.multiRemove(["token", "role"]);
    navigation.navigate("Login");
  };

  useEffect(() => {
    getTransactionKantin();
    getDataKantin();
  }, []);

  return (
    <SafeAreaView className="h-full bg-white">
      {loading ? <Text>Loading...</Text> :
        <ScrollView className="flex h-auto">
          <View className="text-2xl mt-8 w-full p-3 py-4 border-b border-slate-300 flex flex-row justify-between items-center bg-white align-middle" >
            <Text className="text-lg font-bold">Canteen</Text>
            <View className="flex flex-row gap-3">

              <TouchableOpacity onPress={onRefresh}>
                <MaterialCommunityIcons name="refresh" color='black' size={24} />
              </TouchableOpacity>
              <TouchableOpacity onPress={logout}>
                <MaterialCommunityIcons name="logout" color='black' size={24} />
              </TouchableOpacity>

            </View>
          </View>
          <View className="text-2xl  w-full p-3 flex flex-row justify-between items-center bg-white align-middle" >
            <Text className="text-lg font-bold">Welcome Back {data.user.name}!</Text>
          </View>
          <View className=" py-0 flex p-3 justify-between ">
            <View className="flex flex-row gap-3 justify-between mb-3">
              <View className="bg-white flex-1 p-3 py-4 border border-slate-200 rounded-lg">
                <View className="gap-0">
                  <Text className="text-slate-800 ">Total Order</Text>
                  <Text className="text-black font-bold text-lg">210</Text>
                </View>
              </View>
              <View className="bg-white flex-1 p-3 py-4 border border-slate-200 rounded-lg">
                <View className="gap-0">
                  <Text className="text-slate-800 ">Pending</Text>
                  <Text className="text-black font-bold text-lg">20</Text>
                </View>
              </View>
            </View>
            <View className="flex flex-row gap-3 justify-between">
              <View className="bg-white flex-1 p-3 py-4 border border-slate-200 rounded-lg">
                <View className="gap-0">
                  <Text className="text-slate-800 ">Total Product</Text>
                  <Text className="text-black font-bold text-lg">{data.products.length || ''}</Text>
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
          <View>
            <Text className="font-bold text-lg px-3">History</Text>
          </View>
          {transactionKantin.transactions.map((item, index) => item.status === 'diambil' ? (
            <View
              className="flex flex-row justify-between items-center px-3 my-3 mb-2"
              key={index}
            >
              <View className="flex flex-row justify-between w-full border border-slate-200 p-3 items-center align-middle rounded-lg">
                <View className="p-2 bg-blue-600 rounded-lg">

                  <MaterialCommunityIcons name="cash-plus" color='white' size={32} />
                </View>
                <View>
                  <Text className="text-base font-bold">Rp{item.price}</Text>
                  <View className="flex flex-row items-center align-middle justify-center">
                    {
                      item.user_transactions.map((val, ind) => (
                        <Text key={ind} className="text-base">{val.name} |</Text>
                      ))
                    }
                    <Text className="text-xs text-slate-800"> {item.order_code}</Text>
                  </View>
                </View>
                <Text>{item.quantity}x </Text>
                <Text>{item.status} </Text>
                {item.status === "dibayar" ? (
                  <TouchableOpacity onPress={() => verifPengambilan(item.id)} className="p-1 rounded-full bg-blue-600">
                    <MaterialCommunityIcons name="check" color='white' size={20} />
                  </TouchableOpacity>
                ) : (
                  <MaterialCommunityIcons name="check" color='black' size={28} />
                )}
              </View>
            </View>
          ) : null)}
        </ScrollView>
      }
    </SafeAreaView>
  );
};

const CardStatus = (props) => {
  return (
    <View className="bg-blue-600 p-3 py-4 w-1/2 flex rounded-lg flex-row justify-between items-center ">
      <View className="gap-0">
        <Text className="text-slate-200 ">Balance</Text>
        <Text className="text-white font-bold text-lg">Rp100.000</Text>
      </View>
      <View className="gap-0 flex-row flex">
        <TouchableOpacity onPress={() => navigation.navigate('TopUp')}>
          <MaterialCommunityIcons name="credit-card-plus" color='white' size={32} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

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

export default DashboardCanteenPage;