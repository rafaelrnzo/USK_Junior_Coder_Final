import React, { Component, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { buttonStyle, textInputStyle } from '../../assets/style/basic';

function SignInPage({ navigation }) {
  const [text, onChangeText] = useState('Useless Text');

  return (
    <SafeAreaView className="bg-white h-full">
      <View className="flex">
        <View className="text-2xl w-full p-3 border-b border-slate-300 flex flex-row justify-between items-center" >
          <Text className="text-base font-bold">Sign In</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text className="text-md text-blue-600 font-bold">Login</Text>
          </TouchableOpacity>
        </View>
        <View className="p-3 pt-6">
          <View>
            <Text className="text-md py-2">Username</Text>
            <TextInput

              className={`${textInputStyle}`}
              onChangeText={onChangeText}
              placeholder='Username'
            // value={text}
            />
          </View>
          <View className="">
            <Text className="text-md py-2">Password</Text>
            <TextInput

              className={`${textInputStyle}`}
              onChangeText={onChangeText}
              placeholder='Password'
            // value={text}
            />
          </View>
          <View className="">
            <Text className="text-md py-2">Repeat Password</Text>
            <TextInput

              className={`${textInputStyle}`}
              onChangeText={onChangeText}
              placeholder='Password'
            // value={text}
            />
          </View>
          <View className="mt-4">
            <TouchableOpacity className={`${buttonStyle}`} onPress={() => navigation.navigate('MainCanteen')}>
              <Text className="text-white text-base font-bold">Continue</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({})

export default SignInPage;
