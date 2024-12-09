/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Button,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
  Dimensions,
} from 'react-native';

const screenWidth= Dimensions.get("window").width;

function App() {
    const [input, onChangeInput] = React.useState('');
    const [ans, setAns] = React.useState('');

    const handlePress = (value) => {
        onChangeInput((prev) => prev + value);
        };

    const handleArithmetic = () => {
        try {
            let equation = input.replace(/Ans/g, ans);
            console.log(equation);
            let result = eval(equation);
            onChangeInput(result.toString());
            setAns(result);
            console.log(ans);
            } catch (error) {
                console.log(error.message);
                onChangeInput("ERROR");
            }
        };

    const handleOperation = (operation) => {
        try {
            let equation = input.replace(/Ans/g, ans);
            const entry = parseFloat(eval(equation).toString());

            if (isNaN(entry)) {
                throw new Error("INPUT ERROR")
                }

            let result = 0;

            switch (operation) {
                case "sin":
                    result = Math.sin(entry);
                    break;
                case "cos":
                    result = Math.cos(entry);
                    break;
                case "tan":
                    result = Math.tan(entry);
                    break;
                case "log":
                    result = Math.log(entry);
                    break;
                default:
                    throw new Error("INVALID");
                    }

            onChangeInput(result.toString());
            setAns(result.toString());
        } catch (error) {
            onChangeInput("ERROR");
        }
    };

    const handleClear = () => {
        onChangeInput("");
        };

    const buttons = [
        ["sin", "cos", "tan", "log"],
        ["7", "8", "9", "/"],
        ["4", "5", "6", "*"],
        ["1", "2", "3", "+"],
        ["0", ".", "+/-", "="],
        ["C", "(", ")", "Ans"],
        ];

    return(
        <View style={styles.calculator}>
            <View style={styles.inputField}>
                <Text style={styles.inputCalculation}>{input}</Text>
            </View>
            <ScrollView style={styles.buttonGrid}>
                {buttons.map((buttonRow, buttonIndex) => (
                    <View
                    key={buttonIndex}
                    style={styles.buttonRow}>
                        {buttonRow.map((button, rowIndex) => (
                            <TouchableOpacity
                            key={rowIndex}
                            style={styles.button}
                            onPress={() =>
                                button === "=" ? handleArithmetic()
                                : button === "C" ? handleClear()
                                : button === "sin" || button === "cos" || button === "tan" || button === "log" ? handleOperation(button)
                                : handlePress(button)}>
                                <Text>{button}</Text>
                            </TouchableOpacity>
                            ))}
                    </View>))}
            </ScrollView>
        </View>
        );
    };

const styles = StyleSheet.create({
  calculator: {
      flex: 1,
      justifyContent: "flex-start",
      padding: 10,
      },
  inputField: {
      flex: 1,
      justifyContent: "center",
      alignItems: "flex-end",
      marginBottom: 10,
      },
  inputCalculation: {
      fontSize: 30,
      fontWeight: "bold",
      },
  buttonGrid: {
      flex: 4,
      },
  buttonGridItems: {
      justifyContent: "center",
      alignItems: "center",
      },
  buttonRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 10,
      },
  button: {
      width: 50,
      height: 50,
      justifyContent: "center",
      alignItems: "center",
      margin: 5,
      },
  });


export default App;
