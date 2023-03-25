import React from 'react';
import {View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomePage from '../view/homepage';
import BookMarkPage from '../view/bookmarkPage';

export default function AppNavigation() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <View style={{flex: 1}}>
        <Stack.Navigator
          screenOptions={{headerShown: false}}
          initialRouteName="home">
          <Stack.Screen name={'home'} component={HomePage} />
          <Stack.Screen name={'bookmark'} component={BookMarkPage} />
        </Stack.Navigator>
      </View>
    </NavigationContainer>
  );
}
