import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ListScreen from './components/ListScreen';
import DetailScreen from './components/DetailScreen';
import FavScreen from './components/FavScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName="List">

      <Stack.Screen name="List" component={ListScreen} 
      options={{title: "Home"}}
      />

      <Stack.Screen name="Detail" component={DetailScreen}
      options={{title: "Video"}}
      options={ ({route}) => ({itemSelected: route.params.itemSelected}) }
       />

      <Stack.Screen name="Fav" component={FavScreen}
      options={{title: "Favorites"}}
       />
    </Stack.Navigator>
  </NavigationContainer>
  );
}

 
