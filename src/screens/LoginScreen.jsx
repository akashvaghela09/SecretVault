import { View, Text, Button, TextInput, StyleSheet, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from "react";

export const LoginScreen = ({ navigation }) => {
  const [pin, setPin] = useState("");

  const handlePinSubmit = async () => {
    if (pin !== "1234") {
      Alert.alert("Wrong Pin");
    } else {
      navigation.navigate("Home");

      try {
        await AsyncStorage.setItem("AUTH", "TRUE");
      } catch (error) {
        console.log("Something went wrong in async storage");
      }
    }

    setPin("");
  };

  // Check auth and route user based on Auth
  const checkAuth = async () => {
    const auth = await AsyncStorage.getItem("AUTH");

    if (auth === "TRUE") {
      navigation.reset({
        index: 0,
        routes: [{ name: "Home" }],
      });
    }
  };

  useEffect(() => {
    checkAuth();
  }, [navigation]);

  return (
    <View>
      <Text>Login PIN</Text>
      <TextInput
        placeholder="010203"
        onChangeText={setPin}
        value={pin}
        style={styles.input}
      />
      <Button title="Login" onPress={handlePinSubmit} />
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
