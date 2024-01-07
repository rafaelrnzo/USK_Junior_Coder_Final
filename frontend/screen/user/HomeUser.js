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
import Icon from 'react-native-ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import CardProduct from './component/CardProduct';
import { API_BASE_URL } from '../constantApi';

const HomeUser = ({ navigation, route }) => {
  const [data, setData] = useState([]);
  const [loading, setloading] = useState(true);
  const { getDataSiswaCallBack } = route.params || {};
  const { username } = route.params || {};
  const [roleAuth, setroleAuth] = useState("");
  const [name, setname] = useState("");

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
    setData(response.data);
    setroleAuth(role);
    setname(name);
    setloading(false);
  };

  useEffect(() => {
    getDataSiswa();
    console.log(getDataSiswaCallBack);
    if (getDataSiswaCallBack) {
      getDataSiswa();
    }
  }, [getDataSiswaCallBack]);

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

  const onRefresh = () => {
    getDataSiswa()
  }

  return (
    <SafeAreaView className="h-full bg-white">
      <ScrollView className="flex h-auto">
        <View className="text-2xl mt-8 w-full p-3 py-4 border-b border-slate-300 flex flex-row justify-between items-center bg-white align-middle" >
          <Text className="text-base font-bold">MyCanteen</Text>
          <View className="flex flex-row gap-3">
            <TouchableOpacity onPress={onRefresh}>
              <MaterialCommunityIcons name="refresh" color='black' size={24} />
            </TouchableOpacity>
            <TouchableOpacity onPress={logout}>
              <MaterialCommunityIcons name="logout" color='black' size={24} />
            </TouchableOpacity>
          </View>
        </View>

        <View className="p-3">
          <View className="bg-blue-600 p-4 rounded-lg flex flex-row justify-between items-center ">
            <View className="gap-0">
              <Text className="text-white text-lg font-bold">Hello, Rafael Lorenzo</Text>
              <View className="4 flex">
                <Text className="text-slate-200 ">Balance</Text>
                <Text className="text-white font-bold text-lg">Rp{data.balance}</Text>
              </View>
            </View>
            <View className="gap-0 flex-row flex">
              <TouchableOpacity onPress={() => navigation.navigate('TopUp')}>
                <MaterialCommunityIcons name="credit-card-plus" color='white' size={32} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {loading ? <Text>No Product Available</Text> :
          <View style={styles.app} className="mb-20 flex w-full ">
            <FlatList
              keyExtractor={(item) => item.id.toString()}
              data={data.products}
              renderItem={({ item, index }) => (
                <CardProduct
                  key={index}
                  name={item.name}
                  desc={item.desc}
                  photo={`http://192.168.1.5:8000${item.photo}`}
                  price={item.price}
                  role={roleAuth}
                  stand={item.stand}
                  stock={item.stock}
                  id={item.id}
                  navigation={navigation}
                />
              )}
            />
          </View>
        }
      </ScrollView>
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

export default HomeUser;

// import { View, Text, Button, FlatList, Modal, TextInput } from "react-native";
// import React, { useEffect, useState } from "react";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import axios from "axios";
// import { API_BASE_URL } from "../constantApi";
// import CardProduct from "./component/CardProduct";

// const HomeUser = ({ route, navigation }) => {
//   const [dataSiswa, setdataSiswa] = useState([]);
//   const [loading, setloading] = useState(true);
//   const { getDataSiswaCallBack } = route.params || {};
//   const { username } = route.params || {};
//   const [roleAuth, setroleAuth] = useState("");
//   const [name, setname] = useState("");
//   const [credit, setcredit] = useState("");
//   const [openModal, setopenModal] = useState(false);

//   const topUp = async () => {
//     const token = await AsyncStorage.getItem("token");
//     await axios.post(
//       `${API_BASE_URL}topup`,
//       {
//         credit: parseInt(credit),
//       },
//       { headers: { Authorization: `Bearer ${token}` } }
//     );
//     setcredit("");
//     setopenModal(false);
//     navigation.navigate("HistoryUser", { successTopUp: credit });
//   };

//   const getDataSiswa = async () => {
//     const token = await AsyncStorage.getItem("token");
//     const role = await AsyncStorage.getItem("role");
//     const name = await AsyncStorage.getItem("name");
//     const response = await axios.get(`${API_BASE_URL}get-product-siswa`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     console.log("response.data", response.data);
//     setdataSiswa(response.data);
//     setroleAuth(role);
//     setname(name);
//     setloading(false);
//   };

//   useEffect(() => {
//     getDataSiswa();
//     console.log(getDataSiswaCallBack);
//     if (getDataSiswaCallBack) {
//       getDataSiswa();
//     }
//   }, [getDataSiswaCallBack]);

//   const logout = async () => {
//     const token = await AsyncStorage.getItem("token");
//     try {
//       await axios.post(
//         `${API_BASE_URL}logout`,
//         {},
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       await AsyncStorage.multiRemove(["token", "role"]);
//       navigation.navigate("LoginPage");
//     } catch (error) {
//       await AsyncStorage.multiRemove(["token", "role"]);
//       navigation.navigate("LoginPage");
//     }
//   };

//   return (
//     <View className="container mx-auto h-full w-full">
//       {loading ? (
//         <>
//           <Text>...loading</Text>
//           <Button title="logout" onPress={logout} />
//         </>
//       ) : (
//         <View className="flex flex-col h-full w-full">
//           <View className="flex flex-row justify-between items-center border-gray-300 border-b p-2 bg-white">
//             <Text>
//               {username ?? name} rp {dataSiswa.difference}
//             </Text>
//             <Modal
//               visible={openModal}
//               onRequestClose={() => setopenModal(false)}
//             >
//               <View>
//                 <Text>Top Up</Text>
//                 <TextInput
//                   value={credit}
//                   onChangeText={(e) => setcredit(e)}
//                   placeholder="nominal"
//                 />
//                 <Button title="top up" onPress={topUp} />
//                 <Button title="close" onPress={() => setopenModal(false)} />
//               </View>
//             </Modal>
//             <View className="flex flex-row">
//               <Button title="Top up" onPress={() => setopenModal(true)} />
//               <Button title="logout" onPress={logout} />
//             </View>
//           </View>
//           <FlatList
//             numColumns={2}
//             keyExtractor={(item) => item.id.toString()}
//             data={dataSiswa.products}
//             renderItem={({ item, index }) => (
//               <CardProduct
//                 key={index}
//                 name={item.name}
//                 desc={item.desc}
//                 photo={`http://192.168.1.10:8000${item.photo}`}
//                 price={item.price}
//                 role={roleAuth}
//                 stand={item.stand}
//                 stock={item.stock}
//                 id={item.id}
//                 navigation={navigation}
//               />
//             )}
//           />
//         </View>
//       )}
//     </View>
//   );
// };

// export default HomeUser;