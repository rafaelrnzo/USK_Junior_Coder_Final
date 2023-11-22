import { View, Text, Button, FlatList, ScrollView, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { API_BASE_URL } from "../constantApi";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const DashboardAdmin = ({ navigation, route }) => {
  const [loading, setloading] = useState(true);
  const [dataAdmin, setdataAdmin] = useState([]);
  const [refresh, setRefresh] = useState([]);
  const { userEdit, createUserCallback } = route.params || {};

  const getDataAdmin = async () => {
    const token = await AsyncStorage.getItem("token");
    const response = await axios.get(`${API_BASE_URL}getsiswa`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setdataAdmin(response.data);
    setloading(false);
  };

  const deleteUser = async (id) => {
    const token = await AsyncStorage.getItem("token");
    await axios.delete(`${API_BASE_URL}user-admin-delete/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    getDataAdmin();
  };

  const logout = async () => {
    const token = await AsyncStorage.getItem("token");
    try {
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
    } catch (error) {
      await AsyncStorage.multiRemove(["token", "role"]);
      navigation.navigate("Login");
    }
  };

  useEffect(() => {
    getDataAdmin();
    if (userEdit || createUserCallback) {
      getDataAdmin();
    }
  }, [userEdit, createUserCallback]);

  const onRefresh = () => {
    setRefresh(true);
    getDataAdmin();
  };

  return (
    <SafeAreaView className="h-full bg-white">
      {loading ? <Text>Loading...</Text> :
        <ScrollView className="flex h-auto">
          <View className="text-2xl w-full p-3 py-4 border-b border-slate-300 flex flex-row justify-between items-center bg-white align-middle" >
            <Text className="text-lg font-bold">Admin</Text>
            <View className="flex flex-row gap-3">
              <TouchableOpacity onPress={onRefresh}>
                <MaterialCommunityIcons name="refresh" color='black' size={24} />
              </TouchableOpacity>
              <TouchableOpacity onPress={logout}>
                <MaterialCommunityIcons name="logout" color='black' size={24} />
              </TouchableOpacity>
            </View>
          </View>
          <View className="text-2xl  w-full p-3 py-0 pt-3 flex flex-row justify-between items-center bg-white align-middle" >
            <Text className="text-lg font-bold">Welcome Back {dataAdmin.user.name}!</Text>
          </View>
          <View className=" py-0 flex p-3 justify-between ">
            <View className="flex flex-row gap-3 justify-between mb-3">
              <View className="bg-white flex-1 p-3 py-4 border border-slate-200 rounded-lg">
                <View className="gap-0">
                  <Text className="text-slate-800 ">Balance Total</Text>
                  <Text className="text-black font-bold text-lg">{dataAdmin.wallet_count}</Text>
                </View>
              </View>
              <View className="bg-white flex-1 p-3 py-4 border border-slate-200 rounded-lg">
                <View className="gap-0">
                  <Text className="text-slate-800 ">User</Text>
                  <Text className="text-black font-bold text-lg">{dataAdmin.users.length}</Text>
                </View>
              </View>
            </View>
            <View className="flex flex-row gap-3 justify-between">
              <View className="bg-white flex-1 p-3 py-4 border border-slate-200 rounded-lg">
                <View className="gap-0">
                  <Text className="text-slate-800 ">Total Wallet</Text>
                  <Text className="text-black font-bold text-lg">{dataAdmin.products.length}</Text>
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
          <View className="gap-0 px-3 flex flex-row w-full justify-between items-center">
            <Text className="text-black font-bold text-lg">Users</Text>
            <TouchableOpacity onPress={() => navigation.navigate("CreateUser")}>
              <Text className="text-blue-600 font-bold text-sm">Add new</Text>
            </TouchableOpacity>
          </View>
          <View className="px-4">
            <FlatList
              data={dataAdmin.users}
              renderItem={({ item, index }) => (
                <View
                  key={index}
                  className="flex flex-row justify-between items-center my-1 border-b py-3 border-slate-200"
                >
                  <View className="flex flex-row items-center gap-3">
                    <View className="bg-blue-600 p-3 rounded-lg px-4">
                      <MaterialCommunityIcons name="eye" color='white' size={24} />
                    </View>
                    <View className="flex">
                      <Text className="text-base font-bold ">{item.name}</Text>
                      <Text className="text-base ">{item.roles.name}</Text>
                    </View>
                  </View>
                  <View className="flex flex-row gap-2 items-center">
                    <TouchableOpacity onPress={() => deleteUser(item.id)}>
                      <MaterialCommunityIcons name="delete" color='black' size={24} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() =>
                      navigation.navigate("EditUser", {
                        id: item.id,
                      })
                    }>
                      <MaterialCommunityIcons name="pencil" color='black' size={24} />
                    </TouchableOpacity>

                  </View>
                </View>
              )}
            />
          </View>
        </ScrollView>
      }
    </SafeAreaView>
  );
};

export default DashboardAdmin;