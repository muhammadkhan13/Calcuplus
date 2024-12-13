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


const Calculator = ({ navigation }) => {
    const screenWidth= Dimensions.get("window").width;
    const [input, onChangeInput] = React.useState('');
    const [ans, setAns] = React.useState('');
    const [resetDisplay, setResetDisplay] = React.useState(false);
    const [operandPressed, setOperandPressed] = React.useState(false);
    const [inputHistory, setInputHistory] = React.useState([]);
    const [ansHistory, setAnsHistory] = React.useState([]);

    const handlePress = (value: string) => {
        // If we have an answer, replace the display with that number
        if (resetDisplay) {
            onChangeInput(value);
            setResetDisplay(false);
        } else {
            onChangeInput((prev) => prev + value)
            setOperandPressed(false);
        }
      };

    const handleArithmetic = () => {
        try {
            let equation = input.replace(/Ans/g, ans);
            setInputHistory((prev) => [...prev, equation]);

            let result = eval(equation);
            onChangeInput(result.toString());
            setAns(result);
            setAnsHistory((prev) => [...prev, result.toString()]);
            setResetDisplay(true);
            setOperandPressed(false);
            } catch (error) {

                onChangeInput("ERROR");
            }
        };

    const handleOperation = (operation) => {
        try {
            let equation = input.replace(/Ans/g, ans);
            let history = operation + "(" + equation + ")";
            setInputHistory((prev) => [...prev, history]);
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
            setAnsHistory((prev) => [...prev, result.toString()]);
            setResetDisplay(true);
            setOperandPressed(false);
        } catch (error) {
            onChangeInput("ERROR");
        }
    };

    const handleOperandPressed = (operand: string) => {
        if (resetDisplay) {
            onChangeInput('Ans' + operand);
            setOperandPressed(true);
            setResetDisplay(false);
        } else {
            onChangeInput((prev) => prev + operand);
            setOperandPressed(false);
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
                            onPress={() => {
                                if (button === '=' && !operandPressed) {
                                    handleArithmetic();
                                } else if (button === '+' || button === '-' || button === '*' || button === '/') {
                                    handleOperandPressed(button);
                                } else if (button === "sin" || button === "cos" || button === "tan" || button === "log") {
                                    handleOperation(button);
                                } else if (button === 'C') {
                                    handleClear();
                                } else {
                                    handlePress(button);
                                }
                                }}>
                                <Text>{button}</Text>
                            </TouchableOpacity>
                            ))}
                    </View>))}
            </ScrollView>
            <TouchableOpacity
            onPress={() =>{navigation.navigate('History', {inputHistory, ansHistory});
            }}>
                <Text>View History</Text>
            </TouchableOpacity>
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

  export default Calculator;