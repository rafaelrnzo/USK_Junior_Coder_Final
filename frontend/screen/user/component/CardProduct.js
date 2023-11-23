// import React, { useState } from 'react';
// import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import axios from 'axios';
// import { API_BASE_URL } from '../../constantApi';


// const CardProduct = ({
//   id,
//   name,
//   image,
//   stand,
//   stock,
//   price,
//   navigation,
// }) => {
//   const [quantity, setquantity] = useState("1");

//   const addToCart = async () => {
//     try {
//       const token = await AsyncStorage.getItem("token");
//       setquantity("1");
//       Alert.alert(
//         "Success",
//         "Cek Cart sekarang!!",
//         [
//           {
//             text: "OK",
//             onPress: () => {
//               navigation.navigate("CartUser", {
//                 successCart: [quantity, price, id],
//               });
//             },
//           },
//         ],
//         { cancelable: false }
//       );
//       await axios.post(
//         `${API_BASE_URL}addcart`,
//         {
//           products_id: id,
//           price: price,
//           quantity: parseInt(quantity),
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//     } catch (error) { }
//   };

//   return (
// <TouchableOpacity className="flex w-full bg-white shadow-lg rounded-lg flex-row my-1.5">
//   {/* <View className="flex flex-row"> */}

//   <View className="basis-1/3 h-auto">
//     <Image
//       // classNames="rounded-lg"
//       source={{ uri: image }}
//       style={styles.image}
//     // resizeMode="contain"
//     />
//   </View>

//   <View className="flex basis-1/3">
//     <View className="flex justify-between items-center flex-row mt-1">
//       {/* <Text className="text-sm">{name}</Text> */}
//       <TextInput
//         placeholder="quantity"
//         keyboardType="numeric"
//         value={quantity}
//         className="border"
//         onChangeText={(e) => setquantity(e)}
//       />
//     </View>
//     <Text className="text-base font-semibold text-blue-600 ">{price}K</Text>
//   </View>
//   <View className="basis-1/3 flex gap-2 justify-between items-end  py-2">
//     <Text className="text-sm">{stock}</Text>
//     <TouchableOpacity className="p-1.5 rounded-full bg-blue-600" onPress={() => addToCart(quantity)}>
//       <MaterialCommunityIcons name="plus" color='white' size={20} />
//     </TouchableOpacity>
//     {/* <TouchableOpacity>
//     <Text>halo</Text>
//   </TouchableOpacity> */}
//   </View>
//   {/* </View> */}
// </TouchableOpacity>
//   )
// };



// export default CardProduct;

import { View, Text, Image, Button, TextInput, Alert, TouchableOpacity, StyleSheet } from "react-native";
import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { API_BASE_URL } from "../../constantApi";
const CardProduct = ({
  id,
  name,
  photo,
  stand,
  stock,
  price,
  role,
  navigation,
  deleteProduct,
}) => {
  const [quantity, setquantity] = useState(1);

  const handleIncrease = () => {
    setquantity(quantity + 1);
  };

  const handleDecrease = () => {
    setquantity(quantity - 1 >= 0 ? quantity - 1 : 0);
  };

  const addToCart = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      setquantity("1");
      Alert.alert(
        "Success",
        "Cek Cart sekarang!!",
        [
          {
            text: "OK",
            onPress: () => {
              navigation.navigate("CartPage", {
                successCart: [quantity.toString(), price, id],
              });
            },
          },
        ],
        { cancelable: false }
      );
      await axios.post(
        `${API_BASE_URL}addcart`,
        {
          products_id: id,
          price: price,
          quantity: parseInt(quantity),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) { }
  };

  return (
    <View className=" flex w-auto bg-white  rounded-lg flex-row">
      <View className="flex flex-row w-full px-3 py-3 border-b border-slate-200">
        <View className="flex basis-1/4 max-w-lg h-auto ">
          <Image
            source={{ uri: photo }}
            style={styles.image}
          />
        </View>
        <View className="flex basis-2/4">
          <Text className="text-base font-semibold text-black ">{name}</Text>
          <Text className="text-base font-semibold text-blue-600 ">{price}K</Text>
          <View style={{ alignItems: 'center' }} className="flex flex-row">
            <TouchableOpacity onPress={handleDecrease} className="bg-blue-600 p-1 rounded-full">
              <MaterialCommunityIcons name="minus" color='white' size={20} />
            </TouchableOpacity>

            <TextInput
              style={{
                textAlign: 'center',
                margin: 10,
              }}
              keyboardType="numeric"
              value={quantity.toString()}
              onChangeText={(e) => setquantity(e)}
            />

            <TouchableOpacity onPress={handleIncrease} className="bg-blue-600 p-1 rounded-full">
              <MaterialCommunityIcons name="plus" color='white' size={20} />
            </TouchableOpacity>
          </View>
        </View>
        <View className="basis-1/4 flex gap-2 justify-between items-end  py-2">
          <View className="flex gap-x-1 flex-row">
            <MaterialCommunityIcons name="store-outline" color='black' size={20} />
            <Text className="text-sm">{stock}</Text>
          </View>
          <TouchableOpacity className="p-2 rounded-full bg-blue-600" onPress={() => addToCart(quantity)} >
            <MaterialCommunityIcons name="cart-outline" color='white' size={18} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  image: {
    width: '90%',
    height: 100,
    borderRadius: 8,
  },
});

export default CardProduct;