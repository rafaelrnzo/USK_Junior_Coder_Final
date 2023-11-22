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
  const [dataSiswa, setdataSiswa] = useState([]);
  const [loading, setloading] = useState(true);
  const { getDataSiswaCll } = route.params || {};


  const getDataSiswa = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await axios.get(
        `${API_BASE_URL}getsiswa`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      setdataSiswa(response.data);
      // setroleAuth(role);
      setloading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.multiRemove(["token", "role"]);
      navigation.navigate("Login");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (JSON.stringify(getDataSiswaCll)) {
      getDataSiswa();
    }
    getDataSiswa();
  }, [getDataSiswaCll]);

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
            {/* <Text className="text-white text-lg ">Hello, Rafael Lorenzo</Text> */}
            <View className="gap-0">
              <Text className="text-slate-200 ">Balance</Text>
              <Text className="text-white font-bold text-lg">Rp{dataSiswa.balance}</Text>
            </View>
            <View className="gap-0 flex-row flex">

              <TouchableOpacity onPress={() => navigation.navigate('TopUp')}>
                <MaterialCommunityIcons name="credit-card-plus" color='white' size={32} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {loading ? <Text>No Product Available</Text> :
          <View style={styles.app} className=" px-3">
            {
              dataSiswa?.products.map(item =>
                <View key={item.id} style={styles.container}>
                  <CardProduct image={item.photo} name={item.name} desc={item.stock} price={item.price} />
                </View>
              )
            }
            {/* <FlatList
            data={dataSiswa}
            numColumns={2}
            keyExtractor={item => item.id}
            renderItem={({ item }) =>
              <View style={styles.container}>

                <CardProduct id={item.id} image={item.photo} name={item.name} desc={item.stock} price={item.price} />
              </View>
            }
          /> */}
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