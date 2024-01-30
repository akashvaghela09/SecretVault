import { View, Text, Button, TouchableOpacity, FlatList } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

export const HomeScreen = ({ navigation }) => {
  const [itemList, setItemList] = useState([]);

  const fetchSecretList = async () => {
    let jsonList = await AsyncStorage.getItem("list");
    let parsedList = jsonList != null ? JSON.parse(jsonList) : [];

    console.log("list ", parsedList);
    setItemList(parsedList);
  };

  const handleItemPress = (item) => {
    navigation.navigate("Edit", { ...item });
  };

  useEffect(() => {
    fetchSecretList();
  }, [navigation]);

  return (
    <View>
      <Text>Home Screen</Text>
      <FlatList
        data={itemList}
        renderItem={({ item, index }) => (
          <TouchableOpacity onPress={() => handleItemPress(item)}>
            <Text>{item.text}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};
