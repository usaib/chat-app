import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CreateRoom from '../screens/CreateRoom';
import MainScreen from '../screens/MainScreen';
import ChatScreen from '../screens/ChatScreen';

const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Main"
        component={MainScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Create Room"
        component={CreateRoom}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Chat Screen"
        component={ChatScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
export default HomeStack;
