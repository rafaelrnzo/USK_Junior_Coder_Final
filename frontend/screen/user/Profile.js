import { View, Text, Button, ScrollView, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { API_BASE_URL } from "../constantApi";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const ProfilePage = ({ route }) => {
  const [walletSelesai, setwalletSelesai] = useState([]);
  const [walletProcess, setwalletProcess] = useState([]);
  const [historyPembelian, sethistoryPembelian] = useState([]);
  const [loading, setloading] = useState(true);
  const { successTopUp } = route.params || {};
  const [dataSiswa, setDataSiswa] = useState([]);

  const getDataHistory = async () => {
    const token = await AsyncStorage.getItem("token");
    const response = await axios.get(`${API_BASE_URL}history`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setwalletSelesai(response.data.walletSelesai);
    setwalletProcess(response.data.walletProcess);
    sethistoryPembelian(response.data.transactionsBayar);
    setloading(false);
  };

  const getDataSiswa = async () => {
    const token = await AsyncStorage.getItem("token");
    const role = await AsyncStorage.getItem("role");
    const name = await AsyncStorage.getItem("name");
    const response = await axios.get(`${API_BASE_URL}getsiswa`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("response.data", response.data);
    setDataSiswa(response.data);
    setroleAuth(role);
    setname(name);
    // setloading(false);
  };

  const clearHistory = async () => {
    const token = await AsyncStorage.getItem("token");
    await axios.delete(`${API_BASE_URL}history-clear`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  };

  useEffect(() => {
    getDataHistory();
    getDataSiswa();
    if (successTopUp) {
      getDataHistory();
    }
  }, [successTopUp]);

  return (
    <SafeAreaView className="bg-white">
      <ScrollView>
        <View className="text-2xl w-full p-3 py-4 border-b border-slate-300 flex flex-row justify-between items-center bg-white align-middle" >
          <Text className="text-base font-bold">Profile</Text>
          <View className="flex flex-row gap-3">
            <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
              <MaterialCommunityIcons name="cart" color='black' size={24} />
            </TouchableOpacity>
          </View>
        </View>
        <View className="p-3">
          <View className="bg-blue-600 p-4 rounded-lg flex flex-row justify-between items-center ">
            <View>
              {/* <Text className="text-white text-lg font-bold">{dataSiswa.user.name}</Text> */}
              <View className="gap-0">
                <Text className="text-slate-200 ">Balance</Text>
                <Text className="text-white font-bold text-lg">Rp{dataSiswa.balance}</Text>
              </View>
            </View>
            <View className="gap-3 flex-row flex">
              <TouchableOpacity onPress={() => navigation.navigate('TopUp')}>
                <MaterialCommunityIcons name="credit-card-plus" color='white' size={32} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View className="container mx-auto">
          {loading ? (
            <Text>loading</Text>
          ) : (
            <View className="flex flex-col h-full w-full px-3">
              <View className="bg-white rounded-lg mb-3">
                <Text className="mb-2 text-lg font-bold">Top up Process</Text>
                {walletProcess.map((value, index) => (
                  <View
                    key={index}
                    className={
                      value.credit === 0 || value.credit === null
                        ? `hidden`
                        : `flex flex-row justify-between items-center border border-gray-300 rounded-lg p-3 mb-3`
                    }
                  >
                    <Text>Rp{value.credit}</Text>
                    <Text className="bg-yellow-400 p-2 rounded">
                      {value.status}
                    </Text>
                  </View>
                ))}
              </View>

              <View className="bg-white  rounded-lg">
                <Text className="mb-2 text-lg font-bold">Top up Selesai</Text>
                {walletSelesai.map((value, index) => (
                  <View
                    key={index}
                    className={
                      value.credit === 0 || value.credit === null
                        ? `hidden`
                        : `flex flex-row justify-between items-center border border-gray-300 rounded-lg p-3 mb-3`
                    }
                  >
                    <Text>Rp{value.credit}</Text>
                    <Text className="bg-green-400 p-2 rounded">
                      {value.status}
                    </Text>
                  </View>
                ))}
              </View>

              <View className="bg-white  rounded-lg  w-full h-full mt-4">
                <Text className="mb-2 text-lg font-bold">Riwayat Pembelian</Text>
                {historyPembelian.map((value, index) => (
                  <View
                    key={index}
                    className={`flex flex-row justify-between items-start border border-gray-300 rounded-lg p-3 mb-3`}
                  >
                    <View className="flex">
                      <Text className="text-base font-semibold">
                        {value.order_code}
                      </Text>
                      <Text>
                        {value.products.name}
                      </Text>
                      <Text>
                        {value.created_at}
                      </Text>
                    </View>
                  </View>
                ))}
                {/* <Button title="Hapus Riwayat" onPress={clearHistory} /> */}
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfilePage;