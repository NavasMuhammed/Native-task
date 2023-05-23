import React, { useState } from "react";
import {
  View,
  FlatList,
  TouchableOpacity,
  Text,
  StyleSheet,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const MyList = () => {
  const [data, setData] = useState([
    { id: 1, title: "Item 1", title: "cat", selected: false },
    { id: 2, title: "Item 2", title: "dog", selected: false },
    { id: 3, title: "Item 3", title: "man", selected: false },
    { id: 4, title: "Item 4", title: "women", selected: false },
    { id: 5, title: "Item 5", title: "car", selected: false },
  ]);
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearch = (text) => {
    setSearchQuery(text);
  };
  const handleItemPress = (item) => {
    const updatedData = data.map((d) => {
      if (d.id === item.id) {
        return { ...d, selected: !d.selected };
      }
      return d;
    });
    setData(updatedData);
  };
  const filteredData = data.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const listItem = ({ item }) => (
    <TouchableOpacity
      style={styles.listItem}
      onPress={() => handleItemPress(item)}
    >
      {item.selected ? (
        <Ionicons
          style={styles.radioIcon}
          name="checkmark-circle"
          size={24}
          color="green"
        />
      ) : (
        <Ionicons
          style={styles.radioIcon}
          name="ellipse-outline"
          size={24}
          color="gray"
        />
      )}
      <Text style={styles.itemTitle}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.listContainer}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search..."
          value={searchQuery}
          onChangeText={handleSearch}
        />
      </View>
      <FlatList data={filteredData} renderItem={listItem} />
    </View>
  );
};

const styles = StyleSheet.create({
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    gap: 10,
  },
  itemTitle: {
    width: 200,
    height: 150,
    borderWidth: 1,
  },
  radioIcon: {
    position: "absolute",
    zIndex: 1,
    left: "95%",
    top: "85%",
  },
  searchContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  searchInput: {
    width: 200,
    height: 55,
    borderWidth: 1,
    borderRadius: 30,
    alignItems: "center",
    paddingHorizontal: 20,
    color: "blue",
  },
});

export default MyList;
