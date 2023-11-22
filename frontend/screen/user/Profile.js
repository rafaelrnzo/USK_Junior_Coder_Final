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
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import { API_BASE_URL } from '../constantApi';

// const ProfilePage = ({ navigation, route }) => {
//   const [data, setData] = useState([]);
//   const [dataSiswa, setDataSiswa] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const { getDataSiswaCll } = route.params || {};

//   const getDataSiswa = async () => {
//     const token = await AsyncStorage.getItem("token");
//     const response = await axios.get(`${API_BASE_URL}getsiswa`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     setDataSiswa(response.data);
//     setLoading(false);
//   };

//   useEffect(() => {
//     if (JSON.stringify(getDataSiswaCll)) {
//       getDataSiswa();
//     }
//     getDataSiswa();
//   }, [getDataSiswaCll]);

//   return (
//     <SafeAreaView className="h-full bg-white">
//       {loading ? <Text>loading...</Text> :
//         <ScrollView className="flex h-auto">
//           <View className="text-2xl mt-8 w-full p-3 py-4 border-b border-slate-300 flex flex-row justify-between items-center bg-white align-middle" >
//             <Text className="text-base font-bold">MyCanteen</Text>
//             <View className="flex flex-row gap-3">

//               <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
//                 <MaterialCommunityIcons name="history" color='black' size={24} />
//               </TouchableOpacity>
//               <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
//                 <MaterialCommunityIcons name="cart" color='black' size={24} />
//               </TouchableOpacity>
//             </View>
//           </View>
//           <View className="p-3">
//             <View className="bg-blue-600 p-4 rounded-lg flex flex-row justify-between items-center ">
//               <View>

//                 <Text className="text-white text-lg font-bold">{dataSiswa.user.name}</Text>
//                 <View className="gap-0">
//                   <Text className="text-slate-200 ">Balance</Text>
//                   <Text className="text-white font-bold text-lg">Rp{dataSiswa.balance}</Text>
//                 </View>
//               </View>
//               <View className="gap-3 flex-row flex">

//                 <TouchableOpacity onPress={() => navigation.navigate('TopUp')}>
//                   <MaterialCommunityIcons name="credit-card-plus" color='white' size={32} />
//                 </TouchableOpacity>
//                 <TouchableOpacity onPress={() => navigation.navigate('TopUp')}>
//                   <MaterialCommunityIcons name="credit-card-plus" color='white' size={32} />
//                 </TouchableOpacity>
//               </View>
//             </View>
//           </View>
//           <View style={styles.app} className=" px-3">
//             <View className="gap-0">
//               <Text className="text-black font-bold text-lg">Transaction</Text>
//             </View>
//             <View className="border-b border-slate-200 p-4 rounded-lg flex flex-row justify-between items-center ">
//               <View className="flex flex-row gap-2 items-center">
//                 <View className="gap-0 flex-row flex">
//                   <TouchableOpacity onPress={() => navigation.navigate('TopUp')} className="p-3 border border-slate-200 rounded-lg">
//                     <MaterialCommunityIcons name="credit-card-plus" color='#2563EB' size={32} />
//                   </TouchableOpacity>
//                 </View>
//                 <View className="gap-0">
//                   <Text className="text-black font-bold text-lg">Top Up</Text>
//                   <Text className="text-black ">10/11/1222</Text>
//                 </View>
//               </View>
//               <View className="gap-0 flex-row flex">
//                 <View className="gap-0">
//                   <Text className="text-black font-bold text-lg">Rp100.000</Text>
//                 </View>

//               </View>
//             </View>

//           </View>
//         </ScrollView>}
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

// export default ProfilePage;

import { View, Text, Button, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { API_BASE_URL } from "../constantApi";

const ProfilePage = ({ route }) => {
  const [walletSelesai, setwalletSelesai] = useState([]);
  const [walletProcess, setwalletProcess] = useState([]);
  const [historyPembelian, sethistoryPembelian] = useState([]);
  const [loading, setloading] = useState(true);
  const { successTopUp } = route.params || {};

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

  const clearHistory = async () => {
    const token = await AsyncStorage.getItem("token");
    await axios.delete(`${API_BASE_URL}history-clear`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  };

  useEffect(() => {
    getDataHistory();
    if (successTopUp) {
      getDataHistory();
    }
  }, [successTopUp]);

  return (
    <ScrollView>
      <View className="container mx-auto">
        {loading ? (
          <Text>loading</Text>
        ) : (
          <View className="flex flex-col h-full w-full p-4">
            <View className="bg-white p-4 rounded-lg mb-4">
              <Text className="mb-2">Top up Process</Text>
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

            <View className="bg-white p-4 rounded-lg">
              <Text className="mb-2">Top up Selesai</Text>
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

            <View className="bg-white p-4 rounded-lg mb-4 w-full h-full mt-4">
              <Text className="mb-2">Riwayat Pembelian</Text>
              {historyPembelian.map((value, index) => (
                <View
                  key={index}
                  className={`flex flex-row justify-between items-center border border-gray-300 rounded-lg p-3 mb-3`}
                >
                  <Text>
                    {value.products.name} | {value.order_code}
                  </Text>
                </View>
              ))}
              <Button title="Hapus Riwayat" onPress={clearHistory} />
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default ProfilePage;