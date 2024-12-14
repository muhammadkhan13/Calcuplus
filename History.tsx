import React, { useState, useEffect } from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Button,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  useColorScheme,
  View,
  Dimensions,
} from 'react-native';

const History = ({ route }) => {
    const {inputHistory = [], ansHistory = []} = route.params || {};
    
    const historyItem = ({ item, index }) => (
        <View>
            <Text>{inputHistory[index]}</Text>
            <Text> = {ansHistory[index]}</Text>
        </View>
    );

    return(
        <View>
            <Text>Calculation History</Text>
            <FlatList
            data={inputHistory}
            renderItem={historyItem}
            keyExtractor={(item, index) => index.toString()}/>
        </View>
    );
};

const styles = StyleSheet.create ({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "orange",
    },
    histItem: {
        marginTop: 10,
        justifyContent: "right",
        alignContent: "right",
    },
});

export default History;
