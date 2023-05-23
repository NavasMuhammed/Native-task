import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  TouchableOpacity,
  Text,
  StyleSheet,
  TextInput,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { fetchApiData } from "../redux/apiSlice";

const MyList = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.api);

  useEffect(() => {
    dispatch(fetchApiData());
  }, [dispatch]);

  const [dataApi, setData] = useState(data);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (text) => {
    setSearchQuery(text);
  };

  const handleItemPress = (item) => {
    const updatedData = dataApi.map((d) => {
      if (d.id === item.id) {
        return { ...d, selected: !d.selected };
      }
      return d;
    });
    setData(updatedData);
  };

  const filteredData = dataApi.filter((item) =>
    item.description.toLowerCase().includes(searchQuery.toLowerCase())
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
      <Text style={styles.itemTitle}>{item.description}</Text>
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
      {data && <FlatList data={filteredData} renderItem={listItem} />}
      {/* {counter && (
        <View>
          {data.map((item) => (
            <Image
              style={styles.image}
              source={{ uri: item.url }}
              key={item.id}
            />
          ))}
        </View>
      )} */}
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 200,
    borderWidth: 1,
    borderColor: "red",
  },
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
