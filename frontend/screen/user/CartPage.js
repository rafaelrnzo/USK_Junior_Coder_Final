// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import {
//   StyleSheet,
//   Text,
//   Image,
//   SafeAreaView,
//   ScrollView,
//   StatusBar,
//   View,
//   TouchableOpacity,
//   FlatList,
// } from 'react-native';
// import Icon from 'react-native-ionicons'
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import { API_BASE_URL } from '../constantApi';
// import { CardProduct } from './component/CardProduct'

// const CartPage = ({ navigation }) => {
//   const [data, setData] = useState([]);
//   const gap = 12

//   useEffect(() => {
//     axios.get(`${API_BASE_URL}product`).then(response => {
//       setData(response.data)
//         .catch(error => console.log(error))
//     })
//   }, [])

//   return (
//     <SafeAreaView className="h-full bg-white">
//       <ScrollView className="flex h-auto">
//         <View className="text-2xl mt-8 w-full p-3 py-4 border-b border-slate-300 flex flex-row justify-between items-center bg-white align-middle" >
//           <Text className="text-base font-bold">MyCanteen</Text>
//           <View className="flex flex-row gap-3">
//             <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
//               <MaterialCommunityIcons name="history" color='black' size={24} />
//             </TouchableOpacity>
//             <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
//               <MaterialCommunityIcons name="cart" color='black' size={24} />
//             </TouchableOpacity>
//           </View>
//         </View>
//         <View className="p-3">
//           <View className="bg-blue-600 p-4 rounded-lg flex flex-row justify-between items-center ">
//             {/* <Text className="text-white text-lg ">Hello, Rafael Lorenzo</Text> */}
//             <View className="gap-0">
//               <Text className="text-slate-200 ">Total</Text>
//               <Text className="text-white font-bold text-lg">Rp100.000</Text>
//             </View>
//             <View className="gap-0 flex-row flex">
//               <TouchableOpacity onPress={() => navigation.navigate('TopUp')} className="px-4 p-1.5 bg-white rounded-lg">
//                 <Text className="text-blue-600 font-semibold text-base">Payment</Text>
//                 {/* <MaterialCommunityIcons name="credit-card-plus" color='#2563EB' size={32} /> */}
//               </TouchableOpacity>
//             </View>
//           </View>
//         </View>
//         <View style={styles.app} className=" px-3">
//           {data.map((item, index) => (
//             <CardProduct key={index} image={item.photo} name={item.name} desc={item.stock} price={item.price} />
//           ))}
//           {/* <FlatList
//             contentContainerStyle={{ gap }}
//             columnWrapperStyle={{ gap }}
//             data={data}
//             numColumns={2}
//             keyExtractor={item => item.id}
//             renderItem={({ item }) =>
//               <View style={styles.container}>

//                 <CardProduct id={item.id} image={item.photo} name={item.name} desc={item.stock} price={item.price} />
//               </View>
//             }
//           /> */}
//         </View>

//       </ScrollView>
//     </SafeAreaView>
//   );
// };


// const styles = {
//   item: {
//     flex: 1,
//     maxWidth: "100%",
//     alignItems: "center",
//     padding: 10,
//   },
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// };

// export default CartPage;


import { View, Text, Button, FlatList, ScrollView, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { MaterialIcons } from "@expo/vector-icons";
import { API_BASE_URL } from "../constantApi";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const CartPage = ({ navigation, route }) => {
  const [dataHistory, setdataHistory] = useState([]);
  const [loading, setloading] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const currentTime = new Date();
  const seconds = currentTime.getSeconds();
  const { successCart } = route.params || {};

  const getDataHistory = async () => {
    const token = await AsyncStorage.getItem("token");
    const response = await axios.get(`${API_BASE_URL}history`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(response.data);
    setdataHistory(response.data);
    setloading(false);
  };

  const cancelCart = async (id) => {
    const token = await AsyncStorage.getItem("token");
    await axios.delete(`${API_BASE_URL}keranjang/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    getDataHistory();
  };

  const payProduct = async () => {
    const token = await AsyncStorage.getItem("token");
    await axios.put(
      `${API_BASE_URL}payproduct`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    getDataHistory();
    navigation.navigate("MainUser", { getDataSiswaCallBack: seconds });
  };

  useEffect(() => {
    getDataHistory();
    if (successCart == successCart || successCart !== successCart) {
      getDataHistory();
    }
  }, [successCart]);

  const onRefresh = () => {
    setRefresh(true);
    getDataHistory();
  };

  return (
    <SafeAreaView className="flex flex-col h-full w-full bg-white">
      {loading ? (
        <>
          <Text>...loading</Text>
        </>
      ) : (
        <ScrollView>
          <View className="">
            <View className="text-2xl w-full gap-1 p-3 border-b justify-between border-slate-300 flex flex-row  items-center " >
              <View className="flex-row flex items-center">
                <Text className="text-lg font-bold">Cart</Text>
              </View>
              <View className="flex-row flex items-center">
                <TouchableOpacity onPress={() => { onRefresh }}>
                  <MaterialCommunityIcons name="refresh" color='black' size={28} />
                </TouchableOpacity>
              </View>
            </View>
            <View className="p-3">
              <View className="bg-blue-600 p-4 rounded-lg flex flex-row justify-between items-center ">
                <View className="gap-0">
                  <Text className="text-slate-200 ">Total</Text>
                  <Text className="text-white font-bold text-lg">Rp{dataHistory.totalPrice}</Text>
                </View>
                <View className="gap-0 flex-row flex">
                  <TouchableOpacity onPress={payProduct} className="px-4 p-1.5 bg-white rounded-lg">
                    <Text className="text-blue-600 font-semibold text-base px-4">Buy</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
          <View className="flex flex-col px-4 ">
            <View className="flex flex-row justify-between items-center pb-3">
              <Text className="text-lg font-bold">Your Cart</Text>
              <Text>{dataHistory.transactionsKeranjang.length} Result</Text>
            </View>

            <FlatList
              data={dataHistory.transactionsKeranjang}
              renderItem={({ item, index }) => (
                <View
                  key={index}
                  className="flex flex-row justify-between items-center border border-slate-200 rounded-lg p-3 mb-3"
                >
                  <View className="flex flex-row gap-3 items-center">

                    <View className="p-1.5 px-3 rounded-lg` border border-slate-200 ">
                      <Text className="text-lg">
                        {item.quantity}x
                      </Text>
                    </View>
                    <View>
                      <Text className="text-base  text-black">
                        {item.products.name}
                      </Text>
                      <Text className="text-lg text-blue-600 font-bold">
                        rp{item.price}
                      </Text>
                    </View>
                  </View>
                  <TouchableOpacity className="bg-blue-600 p-2 rounded-full" onPress={() => cancelCart(item.id)} >
                    <MaterialCommunityIcons name="delete" color="white" size={20} />
                  </TouchableOpacity>
                </View>
              )}
            />
            {dataHistory.totalPrice > dataHistory.difference ? (
              <Text>Saldo mu kurang, saldo kamu: {dataHistory.difference}</Text>
            ) : (
              <Button title="buy" onPress={payProduct} />
            )}
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default CartPage;