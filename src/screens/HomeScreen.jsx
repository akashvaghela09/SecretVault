import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
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
    <View style={styles.wrapper}>
      <FlatList
        data={itemList}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => handleItemPress(item)}
            style={styles.secretItem}
          >
            <Text style={styles.secretText}>{item.text}</Text>
          </TouchableOpacity>
        )}
      />
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
  secretItem: {
    backgroundColor: "#0f172a",
    margin: 10,
    padding: 6,
  },
  secretText: {
    fontSize: 24,
    color: "#94a3b8",
  },
});
