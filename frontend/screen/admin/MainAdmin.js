import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DashboardAdmin from './DashboardAdmin';
import CategoryPage from './CategoryAdmin';

const Tab = createMaterialBottomTabNavigator();

function MainAdmin() {
  return (
    <Tab.Navigator
      initialRouteName="Feed"
      activeColor="#2563EB"
      barStyle={{ backgroundColor: 'white' }}
      style={{ borderTopWidth: 1, borderTopColor: '#E2E8F0' }} // Add a border on top
    >
      <Tab.Screen
        name="DashboardAdmin"
        component={DashboardAdmin}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="CategoryPage"
        component={CategoryPage}
        options={{
          tabBarLabel: 'Category',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="grid" color={color} size={26} />
          ),
        }}
      />
      {/* <Tab.Screen
        name="Top Up"
        component={TopUpListPage}
        options={{
          tabBarLabel: 'TopUp',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="card-plus" color={color} size={26} />
          ),
        }}
      /> */}

    </Tab.Navigator>
  );
}

export default MainAdmin;
