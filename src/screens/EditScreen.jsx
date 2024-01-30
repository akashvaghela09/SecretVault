import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
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
      const updatedList = parsedList.map(item => {
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
    <View>
      <Text>Edit Screen</Text>
      <View>
        <TextInput
          value={editedText}
          onChangeText={setEditedText}
          style={styles.input}
        />
        <Button title="Save" onPress={handleSave} />
        <Button title="Cancel" onPress={handleCancel} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
