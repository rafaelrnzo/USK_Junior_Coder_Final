import { View, Text, TextInput, Image, Button, ScrollView, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Picker } from "@react-native-picker/picker";
// import * as ImagePicker from "expo-image-picker";
import { API_BASE_URL } from "../constantApi";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { textInputStyle } from "../../assets/style/basic";

const EditProduct = ({ navigation, route }) => {
  const [nameProduct, setnameProduct] = useState("");
  const [descProduct, setdescProduct] = useState("");
  const [photoProduct, setphotoProduct] = useState("");
  const [standProduct, setstandProduct] = useState("");
  const [stockProduct, setstockProduct] = useState("");
  const [priceProduct, setpriceProduct] = useState("");
  const [categoryProduct, setcategoryProduct] = useState([]);
  const [selectedCategory, setselectedCategory] = useState(0);
  const [loading, setloading] = useState(true);
  const { id } = route.params;

  const updateProduct = async () => {
    const token = await AsyncStorage.getItem("token");

    const formData = new FormData();
    formData.append("_method", "PUT");
    formData.append("name", nameProduct);
    formData.append("price", priceProduct);
    formData.append("stock", stockProduct);
    formData.append("stand", standProduct);
    // formData.append("photo", {
    //   uri: photoProduct,
    //   type: "image/png",
    //   name: "productphoto.png",
    // });
    formData.append("desc", descProduct);
    formData.append("categories_id", selectedCategory);

    try {
      const response = await axios.post(
        `${API_BASE_URL}product-update/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Update success:", response.data);

      navigation.navigate("MainCanteen", {
        successEdit: [
          nameProduct,
          descProduct,
          photoProduct,
          priceProduct,
          standProduct,
          stockProduct,
          selectedCategory,
        ],
      });
    } catch (error) {
      console.error("Error updating product:", error);
      // Handle error, tampilkan pesan kesalahan kepada pengguna
    }
  };

  const uploadPhoto = async () => {
    await ImagePicker.requestMediaLibraryPermissionsAsync();
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.canceled) {
      await savePhoto(result.assets[0].uri);
    } else {
      Alert.alert("u dont select any photo");
    }
  };
  const savePhoto = async (photo) => {
    setphotoProduct(photo);
  };

  const getDataProduct = async () => {
    const token = await AsyncStorage.getItem("token");
    const response = await axios.get(`${API_BASE_URL}product-edit/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setnameProduct(response.data.products.name);
    setdescProduct(response.data.products.desc);
    setstandProduct(response.data.products.stand.toString());
    setstockProduct(response.data.products.stock.toString());
    setpriceProduct(response.data.products.price.toString());
    setcategoryProduct(response.data.categories);
    // setphotoProduct(`http://192.168.1.10:8000${response.data.products.photo}`);
    setselectedCategory(response.data.products.categories_id);
    setloading(false);
  };

  useEffect(() => {
    getDataProduct();
  }, []);

  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView className="flex">
        <View className="text-2xl w-full gap-1 p-3 border-b justify-between border-slate-300 flex flex-row  items-center " >
          <View className="flex-row flex items-center">
            <TouchableOpacity onPress={() => navigation.navigate('MainCanteen')}>
              <MaterialCommunityIcons name="chevron-left" color='black' size={32} />
            </TouchableOpacity>
            <Text className="text-lg font-bold">Create Product</Text>
          </View>
          <View className="flex-row flex items-center">
            <TouchableOpacity onPress={updateProduct}>
              <Text className="text-base text-blue-600 font-bold ">Save</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View className="p-3 pt-6 flex gap-y-4">
          <View>
            <Text className="text-base font-bold py-2">Input your product name</Text>
            <TextInput
              value={nameProduct}
              onChangeText={(e) => setnameProduct(e)}
              placeholder="name"
              className={`${textInputStyle}`}
            />
          </View>
          <View>
            <Text className="text-base font-bold py-2">Price</Text>
            <TextInput
              value={priceProduct}
              onChangeText={(e) => setpriceProduct(e)}
              placeholder="name"
              className={`${textInputStyle}`}
            />
          </View>
          <View>
            <Text className="text-base font-bold py-2">Stock</Text>
            <TextInput
              value={stockProduct}
              onChangeText={(e) => setstockProduct(e)}
              placeholder="name"
              className={`${textInputStyle}`}
            />
          </View>
          <View>
            <Text className="text-base font-bold py-2">Description</Text>
            <TextInput
              value={descProduct}
              onChangeText={(e) => setdescProduct(e)}
              placeholder="name"
              className={`${textInputStyle}`}
            />
          </View>
          <View>
            <Text className="text-base font-bold py-2">Stand</Text>
            <TextInput
              value={standProduct}
              onChangeText={(e) => setstandProduct(e)}
              placeholder="name"
              className={`${textInputStyle}`}
            />
          </View>
          <View>
            <Text className="text-base font-bold py-2">Select Category</Text>
            <Picker
              className="border bg-slate-300 rounded-lg"
              selectedValue={selectedCategory}
              onValueChange={(item) => setSelectedCategory(item)}
            >
              {categoryProduct.map((value, index) => (
                <Picker.Item value={value.id} label={value.name} key={index} />
              ))}
            </Picker>
          </View>
          {/* <View>
            <Text className="text-base font-bold py-2">Add image URL</Text>
            <TextInput
              value={displayPhoto}
              onChangeText={(e) => setdisplayPhoto(e)}
              placeholder="name"
              className={`${textInputStyle}`}
            />
          </View> */}
          {/* <View className="">
          <Text className="text-md py-2">Password</Text>
          <TextInput
            value={password}
            className={`${textInputStyleLogin} border`}
            onChangeText={(text) => setpassword(text)}
            placeholder='Password'
          // value={text}S
          />
        </View> */}

        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditProduct;