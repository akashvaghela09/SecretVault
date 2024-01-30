import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const EditScreen = ({ route, navigation }) => {
  const { id, text } = route.params;
  const [editedText, setEditedText] = useState(text);

  const handleSave = async () => {
    try {
      // Retrieve the existing list from AsyncStorage
      let jsonList = await AsyncStorage.getItem("list");
      let parsedList = jsonList != null ? JSON.parse(jsonList) : [];

      // Update the text for the specific item using the id
      const updatedList = parsedList.map((item) => {
        if (item.id === id) {
          return { ...item, text: editedText };
        }
        return item;
      });

      // Save the updated list back to AsyncStorage
      await AsyncStorage.setItem("list", JSON.stringify(updatedList));

      navigation.reset({
        index: 0,
        routes: [{ name: "Home" }],
      });
    } catch (error) {
      console.error("Error updating and saving data:", error);
    }
  };

  const handleCancel = () => {
    navigation.navigate("Home");
  };

  return (
    <View style={styles.wrapper}>
      <TextInput
        value={editedText}
        onChangeText={setEditedText}
        style={styles.input}
      />
      <View style={styles.buttonWrapper}>
        <Button title="Save" onPress={handleSave} />
        <Button title="Cancel" onPress={handleCancel} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "#334155",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  input: {
    margin: 12,
    borderWidth: 1,
    padding: 6,
    backgroundColor: "white",
    width: "80%",
    fontSize: 16
  },
  buttonWrapper: {
    flexDirection: "row",
    gap: 20
  }
});
