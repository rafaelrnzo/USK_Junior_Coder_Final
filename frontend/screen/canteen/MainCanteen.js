import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DashboardCanteenPage from './DashboardCanteen';
import OrderPage from './OrderPage';
import ProductCanteen from './ProductCanteen';

const Tab = createMaterialBottomTabNavigator();

function MainCanteen() {
  return (
    <Tab.Navigator
      initialRouteName="Feed"
      activeColor="#2563EB"
      barStyle={{ backgroundColor: 'white' }}
      style={{ borderTopWidth: 1, borderTopColor: '#E2E8F0' }} // Add a border on top
    >
      <Tab.Screen
        name="Dashboard"
        component={DashboardCanteenPage}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="ProductPage"
        component={ProductCanteen}
        options={{
          tabBarLabel: 'Cart',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="dresser" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="OrderPage"
        component={OrderPage}
        options={{
          tabBarLabel: 'Order',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="clipboard-text" color={color} size={26} />
          ),
        }}
      />
      {/* <Tab.Screen
        name="ProfilePage"
        component={ProfilePage}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}
      /> */}
    </Tab.Navigator>
  );
}

export default MainCanteen;
