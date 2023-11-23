import { View, Text, Button, ScrollView, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { API_BASE_URL } from "../constantApi";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const HistoryAdmin = ({ route }) => {
  const [walletSelesai, setwalletSelesai] = useState([]);
  const [walletProcess, setwalletProcess] = useState([]);
  const [historyPembelian, sethistoryPembelian] = useState([]);
  const [loading, setloading] = useState(true);
  const { successTopUp } = route.params || {};
  const [report, setReport] = useState([]);

  const getDataHistory = async () => {
    const token = await AsyncStorage.getItem("token");
    const response = await axios.get(`${API_BASE_URL}report/all`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setReport(response.data)
    // setwalletSelesai(response.data.walletSelesai);
    // setwalletProcess(response.data.walletProcess);
    // sethistoryPembelian(response.data.transactionsBayar);
    setloading(false);
  };

  useEffect(() => {
    // console.log(da/ta)
    getDataHistory();
  }, [successTopUp]);

  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView>
        <View className="text-2xl w-full p-3 py-4 border-b border-slate-300 flex flex-row justify-between items-center bg-white align-middle" >
          <Text className="text-base font-bold">History</Text>
        </View>
        <View className="container mx-auto">
          {loading ? (
            <Text>loading</Text>
          ) : (
            <View className="flex flex-col h-full w-full px-3 py-3">
              <Text className="text-lg font-bold">Today Transactions</Text>
              <View>
                
        {
        report.transactions.map((item) => {
              return(
                      <View className="border my-2 p-3 rounded-lg border-slate-200">
                          <View>
                              <Text style={{ fontWeight: 700, fontSize: 16 }}>{item.order_code}</Text>
                              <Text style={{ fontWeight: 500, fontSize: 16 }}>{item.user?.name}</Text>
                              <Text style={{ fontWeight: 500, fontSize: 12 }}>{item.price}</Text>
                          </View>
                          <View>
                              <Text>{item.status}</Text>
                              <Text>{item.created_at}</Text>
                          </View>
                      </View>
                  )
              })
              }
          </View>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HistoryAdmin;
{/* <View className="bg-white rounded-lg mb-3">
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
  ))} */}
  {/* <Button title="Hapus Riwayat" onPress={clearHistory} /> */}
{/* </View> */}
// import AsyncStorage from "@react-native-async-storage/async-storage"
// import { useEffect, useState } from "react"
// import Navbar from "../../components/Navbar"
// import { Button, ScrollView, StyleSheet, Text, View } from "react-native"

// function Report({navigation}) {
//     const api_url = "http://10.10.18.204:8000/api"
//     const [transactions, settransactions] = useState([])
//     let date = ""

//     async function getTransactions() {
  //         const token = await AsyncStorage.getItem('token')
//         const response = await fetch(${api_url}/report/all, {
//             headers: {
//                 "Authorization": Bearer ${token}
//             }
//         })
//         const resJson = await response.json()        
//         if(response.status == 200) {
//             console.log(resJson)
//             settransactions(resJson.transactions)
//         } else {
//             console.log(resJson)
//         }
//     }
    
//     async function turnDate() {
//         transactions.map((item) => {

//         }) 
//     }

//     useEffect(() => {
//         getTransactions()
//         turnDate()
//     }, [])
    
//     return(
//         <>
//             <Navbar title="Report"></Navbar>
            
//             <ScrollView>
//                 <View style={styles.container}>
//                     <Text style={{ fontWeight: 700, fontSize: 18 }}>Recent Transactions</Text>
//                     <View style={styles.cardWrap}>
//                         {transactions.map((item, index) => {
//                             return(
//                                 <View style={styles.card}>
//                                     <View style={styles.cardLeft}>
//                                         <Text style={{ fontWeight: 700, fontSize: 16 }}>{item.order_code}</Text>
//                                         <Text style={{ fontWeight: 500, fontSize: 16 }}>{item.user?.name}</Text>
//                                         <Text style={{ fontWeight: 500, fontSize: 12 }}>{item.price}</Text>
//                                     </View>
//                                     <View style={styles.cardRight}>
//                                         <Text>{item.status}</Text>
//                                         <Text>{item.created_at}</Text>
//                                     </View>
//                                 </View>
//                             )
//                         })}
//                     </View>

//                     <Button
//                     title="Back"
//                     onPress={() => navigation.navigate('IndexBank')}></Button>
//                 </View>
//             </ScrollView>
//         </>
//     )
// }

// const styles = StyleSheet.create({
//     navbar: {
//         padding: 20,
//         marginBottom: 10,
//         flexDirection: "row",
//         alignItems: "center",
//         justifyContent: "space-between"
//     },
//     container: {
//         padding: 10,
//         marginVertical: 5,
//         marginHorizontal: 4
//     },
//     card: {
//         borderWidth: 1,
//         padding: 10,
//         borderRadius: 8,
//         flexDirection: "row",
//         justifyContent: "space-between"
//     },
//     productWrap: {
//         marginTop: 10,
//         gap: 10,
//     },
//     formInput: {
//         marginTop: 4,
//         marginBottom: 10 
//     },
//     cardWrap: {
//         gap: 15,
//         marginVertical: 10
//     },
//     cardRight: {
//         gap: 2,
//         justifyContent: 'center',
//         alignItems: 'flex-end'
//     },
//     formInput: {
//         paddingVertical: 5 ,
//         paddingHorizontal: 10,
//         marginTop: 4,
//         marginBottom: 10,
//         borderWidth: 1,
//         borderRadius: 5, 
//     }
// })

// export default Report