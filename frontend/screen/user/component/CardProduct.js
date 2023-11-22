import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'axios';
import { API_BASE_URL } from '../../constantApi';


const CardProduct = (props) => {
  const [quantity, setquantity] = useState("");

  const addToCart = async (products_id, price, quantity) => {
    const tokenAuth = await AsyncStorage.getItem("token");
    try {
      await axios.post(
        `${API_BASE_URL}addcart`,
        {
          products_id: products_id,
          price: price,
          quantity: parseInt(quantity),
        },
        {
          headers: {
            Authorization: `Bearer ${tokenAuth}`,
          },
        }
      );
      setquantity("");
    } catch (error) {
      if (error.response) {
        console.log("Server responded with error status:", error.response.status);
        console.log("Server response data:", error.response.data);
      } else if (error.request) {
        console.log("No response received from the server");
      } else {
        console.log("Error setting up the request:", error.message);
      }
    }
  };

  return (
    <TouchableOpacity className="flex w-full bg-white shadow-lg rounded-lg flex-row my-1.5">
      {/* <View className="flex flex-row"> */}

      <View className="basis-1/3 h-auto">
        <Image
          // classNames="rounded-lg"
          source={{ uri: props.image }}
          style={styles.image}
        // resizeMode="contain"
        />
      </View>

      <View className="flex basis-1/3">
        <View className="flex justify-between items-center flex-row mt-1">
          {/* <Text className="text-sm">{props.name}</Text> */}
          <TextInput
            placeholder="quantity"
            keyboardType="numeric"
            value={quantity}
            className="border"
            onChangeText={(e) => setquantity(e)}
          />
        </View>
        <Text className="text-base font-semibold text-blue-600 ">{props.price}K</Text>
      </View>
      <View className="basis-1/3 flex gap-2 justify-between items-end  py-2">
        <Text className="text-sm">{props.desc}</Text>
        <TouchableOpacity className="p-1.5 rounded-full bg-blue-600" onPress={() => addToCart(props.id, props.price, quantity)}>
          <MaterialCommunityIcons name="plus" color='white' size={20} />
        </TouchableOpacity>
        {/* <TouchableOpacity>
        <Text>halo</Text>
      </TouchableOpacity> */}
      </View>
      {/* </View> */}
    </TouchableOpacity>
  )
};

const styles = StyleSheet.create({
  image: {
    width: '90%',
    height: 100,
    borderRadius: 8,
  },
});

export default CardProduct;
