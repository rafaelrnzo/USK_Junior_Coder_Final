// In App.js in a new project

import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Provider as PaperProvider } from 'react-native-paper';
import TopUp from './screen/user/TopUp';
import MainUser from './screen/user/MainUser';
import SignInPage from './screen/auth/SIgnIn';
import LoginPage from './screen/auth/Login';
import HomeUser from './screen/user/HomeUser';
import MainCanteen from './screen/canteen/MainCanteen';
import CreateProduct from './screen/canteen/CreateProduct';
import MainAdmin from './screen/admin/MainAdmin';
import EditProduct from './screen/canteen/EditProduct';
import EditCategory from './screen/admin/categoryAction/EditCategory';
import MainBank from './screen/bank/MainBank';
import Withdraw from './screen/bank/Withdraw';
import CreateUser from './screen/admin/userAction/CreateUser';
import EditUser from './screen/admin/userAction/EditUser';
import CreateCategory from './screen/admin/categoryAction/CreateCategory';


const App = () => {
  const Stack = createNativeStackNavigator();
  const navigationRef = React.useRef();
  const checkAuth = async () => {
    const role = await AsyncStorage.getItem("role");
    const token = await AsyncStorage.getItem("token");
    console.log(role, token);
    if (token && role !== null) {
      switch (role) {
        case "admin":
          navigationRef.current?.navigate("MainAdmin");
          break;
        case "kantin":
          navigationRef.current?.navigate("MainCanteen");
          break;
        case "bank":
          navigationRef.current?.navigate("MainBank");
          break;
        default:
          navigationRef.current?.navigate("MainUser");
          break;
      }
    }
  };

  React.useEffect(() => {
    checkAuth();
  }, []);

  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
          headerShown: false
        }} initialRouteName='Login'>

          {/* Main Screen */}
          <Stack.Screen name="MainUser" component={MainUser} />
          <Stack.Screen name="MainCanteen" component={MainCanteen} />
          <Stack.Screen name="MainBank" component={MainBank} />
          <Stack.Screen name="MainAdmin" component={MainAdmin} />

          {/* Auth */}
          <Stack.Screen name="SignIn" component={SignInPage} />
          <Stack.Screen name="Login" component={LoginPage} />

          {/* User */}
          <Stack.Screen name="Home" component={HomeUser} />
          <Stack.Screen name="TopUp" component={TopUp} />
          
          {/* Bank */}
          <Stack.Screen name="Withdraw" component={Withdraw} />

          {/* Product */}
          <Stack.Screen name="CreateProduct" component={CreateProduct} />
          <Stack.Screen name="EditProduct" component={EditProduct} />

          {/* Admin */}
          <Stack.Screen name="CreateUser" component={CreateUser} />
          <Stack.Screen name="EditUser" component={EditUser} />
          <Stack.Screen name="CreateCategory" component={CreateCategory} />
          <Stack.Screen name="EditCategory" component={EditCategory} />

        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

export default App;