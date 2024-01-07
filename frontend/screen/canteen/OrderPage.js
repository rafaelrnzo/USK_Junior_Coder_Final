import { View, Text, FlatList, Button, ScrollView, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { API_BASE_URL } from "../constantApi";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// import API_BASE_URL from "../../constant/ip";

const OrderPage = () => {
  const [transactionKantin, settransactionKantin] = useState([]);
  const [loading, setloading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const getTransactionKantin = async () => {
    const token = await AsyncStorage.getItem("token");
    const response = await axios.get(`${API_BASE_URL}transaction-kantin`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data);
    settransactionKantin(response.data);
    setloading(false);
  };

  const verifPengambilan = async (id) => {
    const token = await AsyncStorage.getItem("token");
    await axios.put(
      `${API_BASE_URL}transaction-kantin/${id}`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    getTransactionKantin();
  };

  const onRefresh = () => {
    setRefreshing(true);
    getTransactionKantin();
  };

  useEffect(() => {
    getTransactionKantin();
  }, []);


  return (
    <SafeAreaView className="h-full bg-white">
      {
        loading ? <Text>Loading</Text> :
          <ScrollView className="flex h-auto">
            <View className="text-2xl  w-full p-3 py-4 border-b border-slate-300 flex flex-row justify-between items-center bg-white align-middle " >
              <Text className="font-bold text-lg">Order List</Text>
              <View className="flex flex-row gap-3">
                <TouchableOpacity onPress={() => navigation.navigate('CreateProduct')}>
                  <MaterialCommunityIcons name="plus" color='black' size={24} />
                </TouchableOpacity>
                <TouchableOpacity onPress={onRefresh}>
                  <MaterialCommunityIcons name="refresh" color='black' size={24} />
                </TouchableOpacity>
              </View>
            </View>
            <View className="h-auto">
              <View className="border border-b p-3 border-slate-200 mb-2">
                <Text>2 Product</Text>
              </View>
              {transactionKantin.transactions.map((item, index) => (
                <View
                  className="flex flex-row justify-between items-center px-3 mb-2"
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
              ))}
              {/* <View className=""> */}
              {/* <FlatList
                data={dataKantin.products}
                renderItem={({ item, index }) => (
                  <OrderList
                    key={index}
                    name={item.name}
                    // photo={`http://10.10.18.123:8000${item.photo}`}
                    // desc={item.desc}
                    price={item.price}
                    // stand={item.stand}
                    // role={roleAuth}
                    stock={item.stock}
                    id={item.id}
                    navigation={navigation}
                    deleteProduct={deleteProduct}
                  />
                )}
              /> */}
            </View>
          </ScrollView>}
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

export default OrderPage;