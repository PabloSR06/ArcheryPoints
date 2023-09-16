import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../Home';
import CreateParty from '../menu/CreateParty';
import UserInput from '../users/UserInput';
import UserList from '../users/UserList';
import PartyTable from '../points/PartyTable';
import GenerateQr from '../qr/GenerateQr';
import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';
//import Icon from 'react-native-vector-icons/Ionicons';
import { Icon } from 'react-native-elements';




const PartyStack = createNativeStackNavigator();

function PartyStackScreen() {
  return (
    <PartyStack.Navigator screenOptions={{ headerShown: false }}>
      <PartyStack.Screen name="Party" component={CreateParty} />
      <PartyStack.Screen name="NewPlay" component={PartyTable} />
    </PartyStack.Navigator>
  );
}

const HomeStack = createNativeStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="FileList" component={Home} />
      <HomeStack.Screen name="OldPlay" component={PartyTable} />
      <HomeStack.Screen name="GenerateQr" component={GenerateQr} />
    </HomeStack.Navigator>
  );
}

const Tab = createMaterialBottomTabNavigator();

const MainStack = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        activeColor="#f0edf6"
        screenOptions={{ headerShown: false }}
        inactiveColor="#3e2465"
        barStyle={{ backgroundColor: '#694fad' }}
      >
        <Tab.Screen name="Home" component={HomeStackScreen} />
        <Tab.Screen name="Users" component={UserList} />
        <Tab.Screen name="Play" component={PartyStackScreen} options={{
            tabBarIcon: ({ color }) => (
              <Icon name="rowing" color={color} size={26} />
            ),
          }}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default MainStack;