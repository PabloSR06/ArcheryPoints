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

const PartyStack = createNativeStackNavigator();

function PartyStackScreen() {
  return (
    <PartyStack.Navigator screenOptions={{ headerShown: false }}>
      <PartyStack.Screen name="Party" component={CreateParty} />
      <PartyStack.Screen name="NewPlay" component={PartyTable}/>
    </PartyStack.Navigator>
  );
}

const HomeStack = createNativeStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="FileList" component={Home} />
      <HomeStack.Screen name="OldPlay" component={PartyTable}/>
      <HomeStack.Screen name="GenerateQr" component={GenerateQr}/>
    </HomeStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

const MainStack = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen name="Home" component={HomeStackScreen} />
        <Tab.Screen name="Users" component={UserList} />
        <Tab.Screen name="Play" component={PartyStackScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default MainStack;