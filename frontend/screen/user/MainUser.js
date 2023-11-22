import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeUser from './HomeUser';
import CartPage from './CartPage';
import ProfilePage from './Profile';

const Tab = createMaterialBottomTabNavigator();

function MainUser() {
  return (
    <Tab.Navigator
      initialRouteName="Feed"
      activeColor="#2563EB"
      barStyle={{ backgroundColor: 'white', }}
    >
      <Tab.Screen
        name="Home"
        component={HomeUser}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="CartPage"
        component={CartPage}
        options={{
          tabBarLabel: 'Cart',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="cart" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="ProfilePage"
        component={ProfilePage}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default MainUser;