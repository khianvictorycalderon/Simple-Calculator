import React, { useState } from 'react';
import { Text, SafeAreaView, StyleSheet, Dimensions, Pressable, View, TextInput, Linking } from 'react-native';
import { color1, color2, color3, color4, color5} from './colors';

const colors = [color1, color2, color3, color4, color5]
const screenDimension = Dimensions.get("window");

const styles = StyleSheet.create({
  body: {
    backgroundColor: "rgb(36, 36, 36)",
    flex: 1,
    height: screenDimension.height,
    width: screenDimension.width,
    alignItems: "center",
    justifyContent: "center"
  },
  title: {
    color: "white",
    marginBottom: 25
  },
  href: {
    color: "blue",
    textDecorationLine: "underline"
  },
  textField: {
    fontSize: 40,
    color: "black",
    width: "80%",
    textAlign: "right",
    backgroundColor: "white",
    padding: 5,
    borderRadius: 8
  },
  keyContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    margin: 10,
    gap: 20
  },
  button: {
    width: 70,
    height: 70,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    margin: 5
  },
  buttonText: {
    color: "white",
    fontSize: 80,
    marginTop: -17
  },
  buttonClicked: {
    opacity: 0.7,
    transform: [{ scale: 0.8 }] 
  }
})

export default function HomeScreen() {

  const [input, setInput] = useState<string>("");
  const [clickedButton, setClickedButton] = useState<number | null>(null);

  const handleOnClick = (character: string) => {
    // Special cases
    const special = ["=", "C", "<"]
    if(special.includes(character)) {

      // Clears the input / output
      character === "C" && setInput("");

      // Evaluates the answer
      if(character === "=") {
        try {
          const answer: string = eval(input);
          setInput(answer);
        } catch (error) {
          setInput("Invalid Expression")
        }
      }

      // Deletes the character
      character === "<" && setInput(prev => prev.slice(0, -1));
      return;
    }

    setInput(prev => prev + character);
  }

  const Buttons = [
    { label: "-", command: () => handleOnClick("-") },
    { label: "+", command: () => handleOnClick("+") },
    { label: "×", command: () => handleOnClick("*") },
    { label: "÷", command: () => handleOnClick("/") },
    { label: "%", command: () => handleOnClick("%") },
    { label: "1", command: () => handleOnClick("1") },
    { label: "2", command: () => handleOnClick("2") },
    { label: "3", command: () => handleOnClick("3") },
    { label: "4", command: () => handleOnClick("4") },
    { label: "5", command: () => handleOnClick("5") },
    { label: "6", command: () => handleOnClick("6") },
    { label: "7", command: () => handleOnClick("7") },
    { label: "8", command: () => handleOnClick("8") },
    { label: "9", command: () => handleOnClick("9") },
    { label: "0", command: () => handleOnClick("0") },
    { label: "=", command: () => handleOnClick("=") },
    { label: "<", command: () => handleOnClick("<") },
    { label: "C", command: () => handleOnClick("C") },
  ];

  return (
    <SafeAreaView style={styles.body}>
      <Text style={styles.title}>
        Simple Calculator with React-Native by <Pressable onPress={() => Linking.openURL("https://khian.netlify.app/")}>
          <Text style={styles.href}>
            Khian Victory D. Calderon
          </Text>
        </Pressable>
      </Text>
      <TextInput 
        value={input}
        style={styles.textField}
        editable={false}
      />
      <View style={styles.keyContainer}>
        {Buttons.map((item, index) => (
          <Pressable 
            style={[styles.button, {
              backgroundColor: colors[index % 5]
            },
              clickedButton === index && styles.buttonClicked
            ]} 
            key={`${index}${Buttons.length-index}`} 
            onPress={item.command}
            onPressIn={() => setClickedButton(index)}
            onPressOut={() => setClickedButton(null)}
            >
            <Text style={styles.buttonText}>{item.label}</Text>
          </Pressable>
        ))}
      </View>
    </SafeAreaView>
  );
}
