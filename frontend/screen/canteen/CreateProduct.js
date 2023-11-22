import { View, Text, Alert, TextInput, Button, Image, TouchableOpacity, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { SafeAreaView } from "react-native-safe-area-context";
import { textInputStyle, textInputStyleAdmin } from "../../assets/style/basic";
// import * as ImagePicker from "expo-image-picker";
import { Picker } from "@react-native-picker/picker";
import { API_BASE_URL } from "../constantApi";
// import API_BASE_URL from "../../../constant/ip";

const CreateProduct = ({ navigation }) => {
  const [nameProduct, setnameProduct] = useState("");
  const [priceProduct, setpriceProduct] = useState("");
  const [stockProduct, setstockProduct] = useState("");
  const [standProduct, setstandProduct] = useState("");
  const [displayPhoto, setdisplayPhoto] = useState();
  const [descProduct, setdescProduct] = useState("");
  const [categoryProduct, setcategoryProduct] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(0);

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
      Alert.alert("you dont pick photo");
    }
  };

  // const savePhoto = async (photo) => {
  //   setdisplayPhoto(photo);
  // };

  const getCategories = async () => {
    const token = await AsyncStorage.getItem("token");
    const response = await axios.get(`${API_BASE_URL}kantin`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setcategoryProduct(response.data.categories);
  };

  const createProduct = async () => {
    const token = await AsyncStorage.getItem("token");
    const formData = new FormData();
    formData.append("name", nameProduct);
    formData.append("price", priceProduct);
    formData.append("stock", stockProduct);
    formData.append("stand", standProduct);
    // formData.append("photo", {
    //   uri: displayPhoto,
    //   type: "image/png",
    //   name: "productphoto.png",
    // });
    formData.append("desc", descProduct);
    formData.append("categories_id", selectedCategory);
    await axios.post(`${API_BASE_URL}create-product`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    Alert.alert("success create product");
    navigation.navigate("MainCanteen", { successCreate: displayPhoto });
  };

  useEffect(() => {
    getCategories();
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
            <TouchableOpacity onPress={createProduct}>
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
          <View>
            <Text className="text-base font-bold py-2">Add image URL</Text>
            <TextInput
              value={displayPhoto}
              onChangeText={(e) => setdisplayPhoto(e)}
              placeholder="name"
              className={`${textInputStyle}`}
            />
          </View>  
        </View>
      </ScrollView>
    </SafeAreaView>
    
  );
};

export default CreateProduct;