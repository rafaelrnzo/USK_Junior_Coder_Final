import { View, Text, Alert, TextInput, Button, ScrollView, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Picker } from "@react-native-picker/picker";
import { API_BASE_URL } from "../../constantApi";
import { textInputStyle } from "../../../assets/style/basic";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


const EditUser = ({ navigation, route }) => {
  const [name, setname] = useState("");
  const [id, setid] = useState(0);
  const { pid } = route.params;
  const { pname } = route.params;

  const editCategory = async () => {
    const token = await AsyncStorage.getItem("token");
    await axios.put(
      `${API_BASE_URL}category-admin-update/${id}`,
      {
        name: name,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    navigation.navigate("MainAdmin", {
      editCategoryCallback: name,
    });
  };

  useEffect(() => {
    setname(pname);
    setid(pid);
  }, []);

  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView className="flex">
        <View className="text-2xl w-full gap-1 p-3 border-b justify-between border-slate-300 flex flex-row  items-center " >
          <View className="flex-row flex items-center">
            <TouchableOpacity onPress={() => navigation.navigate('MainAdmin')}>
              <MaterialCommunityIcons name="chevron-left" color='black' size={32} />
            </TouchableOpacity>
            <Text className="text-lg font-bold">Edit User</Text>
          </View>
          <View className="flex-row flex items-center">
            <TouchableOpacity onPress={editCategory}>
              <Text className="text-base text-blue-600 font-bold ">Save</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View className="p-3 pt-3 flex gap-y-4">
          <View className="flex gap-3">
            <Text className="font-bold text-base">Category Name</Text>
            <TextInput
              value={name}
              onChangeText={(e) => setname(e)}
              placeholder="name"
              className={`${textInputStyle}`}

            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>

  );
};

export default EditUser;