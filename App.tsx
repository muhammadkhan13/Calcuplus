import React, { useState, useEffect } from 'react';
import type {PropsWithChildren} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Button,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
  Dimensions,
} from 'react-native';

import Calculator from "./Calculator.tsx";
import History from "./History.tsx";

function WelcomeScreen({ navigation }: { navigation: any }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Calcuplus</Text>
      <Text style={styles.subtitle}>By Ali Dawood and Muhammad Khan</Text>
      <TouchableOpacity
      style={styles.button}
      onPress={() => navigation.navigate('Calculator')}>
        <Text style={styles.buttonText}>Go To Calculator</Text>
      </TouchableOpacity>
      <TouchableOpacity
      style={styles.button}
      onPress={() => navigation.navigate('History')}>
        <Text style={styles.buttonText}>View History</Text>
      </TouchableOpacity>
    </View>
  );
};

const Stack = createStackNavigator();
function App() {
    return(
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Welcome">
                    <Stack.Screen name="Welcome" component={WelcomeScreen}/>
                    <Stack.Screen name="Calculator" component={Calculator}/>
                    <Stack.Screen name="History" component={History}/>
            </Stack.Navigator>
        </NavigationContainer>);
    };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  subtitle: {
      marginBottom: 20,
  },
  button: {
      backgroundColor: "orange",
      padding: 15,
      borderRadius: 5,
      width: 250,
      marginBottom: 15,
      alignItems: "center",
  },
  buttonText: {
      color: "white",
      fontSize: 15,
      fontWeight: "bold",
  },
});


export default App;

