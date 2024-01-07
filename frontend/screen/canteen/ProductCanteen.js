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
// import CardProduct from './cardProd';
import AsyncStorage from "@react-native-async-storage/async-storage";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { NativeScreenNavigationContainer } from 'react-native-screens';
import { API_BASE_URL } from '../constantApi';


const ProductCanteen = ({ route, navigation }) => {
  const [dataKantin, setdataKantin] = useState([]);
  const { successCreate, successEdit } = route.params || {};
  const [refreshing, setRefreshing] = useState(false);

  const heightHeader = 90;

  const deleteProduct = async (id) => {
    const token = await AsyncStorage.getItem("token");
    await axios.delete(`${API_BASE_URL}delete-product-url/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("berhasil delete");
    getDataKantin();
  };

  const getDataKantin = async () => {
    const token = await AsyncStorage.getItem("token");
    // const role = await AsyncStorage.getItem("role");
    const response = await axios.get(`${API_BASE_URL}kantin`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data.products);
    setdataKantin(response.data);
    // setroleAuth(role);
    console.log(roleAuth);
    setloading(false);
  };

  useEffect(() => {
    getDataKantin();
    if (successCreate || successEdit) {
      getDataKantin();
    }
  }, [successCreate, successEdit]);

  const onRefresh = () => {
    setRefreshing(true);
    getDataKantin();
  };

  return (
    <SafeAreaView className="h-full bg-white">
      <View className="flex h-auto">
        <View className="text-2xl mt-8 w-full p-3 py-4 border-b border-slate-300 flex flex-row justify-between items-center bg-white align-middle " >
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
          <View className="border border-b p-3 border-slate-200">
            <Text>2 Product</Text>
          </View>
          {/* <View className=""> */}
          <View>

            <FlatList
              numColumns={1}
              keyExtractor={(item) => item.key}
              data={dataKantin.products}
              renderItem={({ item, index }) => (
                <ProductList
                  key={index}
                  name={item.name}
                  photo={`http://192.168.1.5:8000${item.photo}`}
                  // desc={item.desc}
                  price={item.price}
                  stand={item.stand}
                  // role={roleAuth}
                  stock={item.stock}
                  id={item.id}
                  navigation={navigation}
                  deleteProduct={deleteProduct}
                />
              )}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const ProductList = ({
  name, price, stock, deleteProduct, id, navigation, photo, stand
}) => {
  // const navigation = NativeScreenNavigationContainer()
  return (
    <View className="flex p-3 py-3 gap-3 border-b-8 border-slate-200">
      <View className="flex-row flex ">
        <View className="bg-blue-600 rounded-lg mr-3 basis-auto">
          <Image
            className="h-20 w-20 rounded-lg"
            source={{ uri: photo }}
          />
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



export default ProductCanteen;