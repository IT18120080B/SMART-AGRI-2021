import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, View } from 'react-native';

import Splash from './src/screens/Splash';
import Dashboard from './src/screens/Dashboard';
import Register from './src/screens/Register';
import Login from './src/screens/Login';
import CropPrediction from './src/screens/CropPrediction';
import PricePrediction from './src/screens/PricePrediction';
import FertilizerIdentifier from './src/screens/FertilizerIdentifier';
import InsectIdentifier from './src/screens/InsectIdentifier';
import priceHome from './src/screens/priceHome';
import cropHome from './src/screens/cropHome';
import coconutPrice from './src/screens/coconutPrice';
import carrotPrice from './src/screens/carrotPrice';
import beansPrice from './src/screens/beansPrice';
import brinjolPrice from './src/screens/brinjolPrice';
import tomatoPrice from './src/screens/tomatoPrice';
import gingerCrop from './src/screens/gingerCrop';
import tomatoCrop from './src/screens/tomatoCrop';
import paddyCrop from './src/screens/paddyCrop';
import cornCrop from './src/screens/cornCrop';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator style={styles.container}>
        <Stack.Screen
          name="Splash"
          options={{ headerShown: false }}
          component={Splash}
        />
        <Stack.Screen
          name="Dashboard"
          component={Dashboard}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CropPrediction"
          component={CropPrediction}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PricePrediction"
          component={PricePrediction}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="FertilizerIdentifier"
          component={FertilizerIdentifier}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="InsectIdentifier"
          component={InsectIdentifier}
          options={{ headerShown: false }}
        />
         <Stack.Screen
          name="priceHome"
          component={priceHome}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="cropHome"
          component={cropHome}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="coconutPrice"
          component={coconutPrice}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="carrotPrice"
          component={carrotPrice}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="tomatoPrice"
          component={tomatoPrice}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="beansPrice"
          component={beansPrice}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="brinjolPrice"
          component={brinjolPrice}
          options={{ headerShown: false }}
        />
         <Stack.Screen
          name="gingerCrop"
          component={gingerCrop}
          options={{ headerShown: false }}
        />
         <Stack.Screen
          name="tomatoCrop"
          component={tomatoCrop}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="cornCrop"
          component={cornCrop}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="paddyCrop"
          component={paddyCrop}
          options={{ headerShown: false }}
        />







      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
  },
});

export default App;
