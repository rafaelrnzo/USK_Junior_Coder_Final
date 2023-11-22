import { View, Text, FlatList, Button, ScrollView, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { API_BASE_URL } from "../constantApi";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// import API_BASE_URL from "../../constant/ip";

const TopUpListPage = () => {
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

  const onRefresh = () => {
    setRefreshing(true);
    getDataKantin();
  };

  const acceptTopUp = async (id) => {
    const token = await AsyncStorage.getItem("token");
    await axios.put(
      `${API_BASE_URL}topup-success/${id}`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    getDataBank();
  };

  return (
    <SafeAreaView className="h-full bg-white">
      {
        loading ? <Text>Loading</Text> :
          <ScrollView className="flex h-auto">
            <View className="text-2xl  w-full p-3 py-4 border-b border-slate-300 flex flex-row justify-between items-center bg-white align-middle " >
              <Text className="font-bold text-lg">Product List</Text>
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
              <FlatList
                data={dataBank.wallets}
                renderItem={({ item, index }) => (
                  <View
                    className="flex flex-row justify-between items-center px-3 mb-2"
                    key={index}
                  >
                    <View className="flex flex-row justify-between w-full border border-slate-200 p-3 items-center align-middle rounded-lg">
                      <View className="p-2 bg-blue-600 rounded-lg">

                        <MaterialCommunityIcons name="cash-plus" color='white' size={32} />
                      </View>
                      <View className="ml-2">
                        {/* <Text className="text-base font-bold">Rp{item.debit ?? '0'}</Text> */}
                        <Text className="text-base font-bold">Rp{item.credit ?? '0'}</Text>
                        <View className="flex flex-row items-center align-middle justify-center">
                          <Text className="text-base text-slate-800"> {item.user.name} </Text>
                        </View>
                      </View>
                      <Text
                        className={
                          item.status === "process"
                            ? "text-yellow-500 ml-4"
                            : "text-green-500 ml-4"
                        } 
                      >
                        {item.status}
                      </Text>
                      <View className="flex-grow"></View>
                      {item.status === "selesai" ? (
                        <MaterialCommunityIcons name="check" color='black' size={28} />
                      ) : (
                        <TouchableOpacity onPress={() => acceptTopUp(item.id)} className="p-1 rounded-full bg-blue-600">
                          <MaterialCommunityIcons name="check" color='white' size={20} />
                        </TouchableOpacity>
                      )}
                    </View>
                  </View>
                  // <View key={index}>
                  //   <Text>{item.user.name}</Text>
                  //   <Text>Credit {item.credit ?? "0"}</Text>
                  //   <Text>Debit {item.debit ?? "0"}</Text>
                  //   <View className="flex flex-row items-center justify-between">
                  //     <Text
                  //       className={
                  //         item.status === "process"
                  //           ? "text-yellow-500"
                  //           : "text-green-500"
                  //       }
                  //     >
                  //       Status {item.status}
                  //     </Text>
                  //     {item.status === "selesai" ? (
                  //       <Text className="ml-3 rounded bg-green-500 p-3">OK</Text>
                  //     ) : (
                  //       <Button
                  //         title="Accept"
                  //         onPress={() => acceptTopUp(item.id)}
                  //       />
                  //     )}
                  //   </View>
                  // </View>
                )}
              />

              {/* {transactionKantin.transactions.map((item, index) => (
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
              ))} */}
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

export default TopUpListPage;