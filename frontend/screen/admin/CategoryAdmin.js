import { View, Text, FlatList, Button, ScrollView, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { API_BASE_URL } from "../constantApi";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// import API_BASE_URL from "../../constant/ip";

const CategoryPage = ({ navigation, route }) => {
  const [dataCategory, setdataCategory] = useState([]);
  const [loading, setloading] = useState(true);
  const [refresh, setRefreshing] = useState(true);
  const { createCategoryCallback, editCategoryCallback } = route.params || {};

  const deleteCategory = async (id) => {
    const token = await AsyncStorage.getItem("token");
    await axios.delete(`${API_BASE_URL}category-admin-delete/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    getDataCategory();
  };

  const getDataCategory = async () => {
    const token = await AsyncStorage.getItem("token");
    const response = await axios.get(`${API_BASE_URL}category-admin`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setdataCategory(response.data.categories);
    setloading(false);
  };

  useEffect(() => {
    getDataCategory();
    if (createCategoryCallback || editCategoryCallback) {
      getDataCategory();
    }
  }, [createCategoryCallback, editCategoryCallback]);

  const onRefresh = () => {
    setRefreshing(true);
    getDataCategory();
  };

  return (
    <SafeAreaView className="h-full bg-white">
      {
        loading ? <Text>Loading</Text> :
          <ScrollView className="flex h-auto">
            <View className="text-2xl  w-full p-3 py-4 border-b border-slate-300 flex flex-row justify-between items-center bg-white align-middle " >
              <Text className="font-bold text-lg">Category</Text>
              <View className="flex flex-row gap-3">
                <TouchableOpacity onPress={onRefresh}>
                  <MaterialCommunityIcons name="refresh" color='black' size={24} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('CreateCategory')}>
                  <MaterialCommunityIcons name="plus" color='black' size={24} />
                </TouchableOpacity>
              </View>
            </View>
            <View className="h-auto">
              <View className="border border-b p-3 border-slate-200 mb-2">
                <Text>2 Product</Text>
              </View>
              {dataCategory.map((item, index) => (
                <View
                  className="flex flex-row justify-between items-center px-3 mb-2"
                  key={index}>
                  <View className="flex flex-row justify-between w-full border border-slate-200 p-3 items-center align-middle rounded-lg">
                    <View className="flex flex-row gap-2 items-center">

                      <View className="p-2 bg-blue-600 rounded-lg">
                        <MaterialCommunityIcons name="cash-plus" color='white' size={32} />
                      </View>
                      <View>
                        <Text className="text-base font-bold">{item.name}</Text>
                      </View>
                    </View>
                    <View className="flex flex-row gap-2 items-center">
                      <TouchableOpacity onPress={() => deleteCategory(item.id)}>
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
                </View>
              ))}
            </View>
          </ScrollView>
      }
    </SafeAreaView>
  );
};


const OrderList = ({
  name, price, stock, deleteProduct, id, navigation
}) => {
  // const navigation = NativeScreenNavigationContainer()
  return (
    <View className="flex p-3 py-3 gap-3 border-b-8 border-slate-200">
      <View className="flex-row flex ">
        <View className="bg-blue-600 rounded-lg p-5 px-7 mr-3 basis-auto">
          <MaterialCommunityIcons name="photo" color='white' size={24} />
        </View>
        <View className="flex justify-between basis-auto ">
          <View className="flex ">
            <View className="flex w-auto flex-row justify-between">

              <Text className="font-bold text-base">{name}</Text>
              {/* <View className="bg-blue-300">
                        <Text className="font-bold text-base text-blue-600">Active</Text>
                      </View> */}
            </View>
            <Text className="font-base text-base text-slate-800 -mt-1">{price}</Text>
          </View>
          <View className="flex ">
            <Text className="font-base text-sm text-slate-800">Stock: {stock}</Text>
          </View>
        </View>
      </View>
      <View className="flex flex-row justify-between ">
        <TouchableOpacity className="bg-white mr-1.5 flex-1 p-3 py-1.5 border border-slate-200 rounded-lg" onPress={() => deleteProduct(id)} >
          <Text className="text-black text-center font-semibold text-base">Delete</Text>
        </TouchableOpacity>
        <TouchableOpacity className="bg-white ml-1.5 flex-1 p-3 py-1.5 border border-slate-200 rounded-lg" onPress={() => navigation.navigate("EditProduct", { id: id })} >
          <Text className="text-black text-center font-semibold text-base">Edit</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default CategoryPage;