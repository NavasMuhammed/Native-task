import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";
import MyList from "./components/list";
import { SafeAreaView } from "react-native-safe-area-context";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.mainTitle}>Search</Text>
      <View style={styles.searchContainer}></View>
      <View style={styles.listContainer}>
        <MyList />
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    flex: 1,
    backgroundColor: "#c0c0c0",
    alignItems: "center",
    alignItems: "center",
  },
  mainTitle: {
    fontSize: 30,
    padding: 20,
  },
  listContainer: {
    width: "100%",
    height: "90%",
    alignItems: "center",
    padding: 40,
  },
  searchContainer: {
    flexDirection: "row",
  },
  searchInput: {
    width: 200,
    height: 35,
    borderWidth: 1,
    borderRadius: 20,
  },
  searchButton: {
    borderRadius: 10,
  },
});
