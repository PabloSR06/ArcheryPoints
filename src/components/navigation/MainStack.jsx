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
import Icon from 'react-native-vector-icons/Ionicons';
import UserEdit from '../users/UserEdit';
import ProfileInput from '../users/profile/ProfileInput';
import ProfileEdit from '../users/profile/ProfileEdit';
//import { Icon } from 'react-native-elements';

const UserStack = createNativeStackNavigator();

function UserStackScreen() {
  return (
    <UserStack.Navigator screenOptions={{ headerShown: false }}>
      <UserStack.Screen name="User" component={UserList} />
      <UserStack.Screen name="NewUser" component={UserInput} />
      <UserStack.Screen name="EditUser" component={UserEdit} />
      <UserStack.Screen name="ProfileInput" component={ProfileInput} />
      <UserStack.Screen name="ProfileEdit" component={ProfileEdit} />
    </UserStack.Navigator>
  );
}

const PartyStack = createNativeStackNavigator();

function PartyStackScreen() {
  return (
    <PartyStack.Navigator screenOptions={{ headerShown: false }}>
      <PartyStack.Screen name="Party" component={CreateParty}/>
      <PartyStack.Screen name="Game" component={PartyTable}/>
    </PartyStack.Navigator>
  );
}

const HomeStack = createNativeStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="FileList" component={Home} />
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
        screenOptions={{ headerShown: false }}
        inactiveColor="#000"
        barStyle={{ backgroundColor: '#694fad'}}
      >
        <Tab.Screen name="Home" component={HomeStackScreen} options={{
            tabBarIcon: ({ color }) => (
              <Icon name="home" color={color} size={26} />
            ),
          }}/>
        <Tab.Screen name="Users" component={UserStackScreen} options={{
            tabBarIcon: ({ color }) => (
              <Icon name="people-outline" color={color} size={26} />
            ),
          }}/>
        <Tab.Screen name="Play" component={PartyStackScreen} options={{
            tabBarIcon: ({ color }) => (
              <Icon name="play" color={color} size={26} />
            ),
          }}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default MainStack;