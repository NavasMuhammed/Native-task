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
  const isLoading = useSelector((state) => state.api.isLoading);
  const error = useSelector((state) => state.api.error);
  useEffect(() => {
    dispatch(fetchApiData());
  }, [dispatch]);

  const [dataApi, setData] = useState([]);

  useEffect(() => {
    if (data) {
      setData(data);
    }
  }, [data]);

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

  const filteredData = dataApi.filter(
    (item) =>
      item.description &&
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
      <View>
        <View style={styles.imageContainer}>
          <Image
            style={item.selected ? styles.imageSelected : styles.image}
            source={{ uri: item.url }}
            key={item.id}
          />
        </View>
        <Text style={styles.itemTitle}>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );

  if (isLoading) {
    return <Text style={styles.extraInfo}>Loading...</Text>;
  }

  if (error) {
    return <Text style={styles.extraInfo}>Error: {error}</Text>;
  }

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
      {dataApi.length > 0 && (
        <FlatList data={filteredData} renderItem={listItem} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  extraInfo: {
    fontSize: 30, 
    fontWeight: "bold",

  },
  imageContainer: {
    borderWidth: 1,
    borderRadius: 10,
    position: "relative",
    overflow: "hidden",
  },
  image: {
    width: 200,
    height: 200,
    borderWidth: 1,
  },
  imageSelected: {
    width: 200,
    height: 200,
    borderWidth: 1,
    opacity: 0.1,
  },
  listItem: {
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    gap: 20,
  },
  itemTitle: {
    width: 200,
    textAlign: "center",
    marginTop: 5,
  },
  radioIcon: {
    position: "absolute",
    zIndex: 1,
    left: "80%",
    top: "8%",
  },
  searchContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    width: "100%",
  },
  searchInput: {
    width: 300,
    height: 55,
    borderWidth: 1,
    borderRadius: 30,
    alignItems: "center",
    paddingHorizontal: 20,
  },
});

export default MyList;
