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
import { Provider } from "react-redux";
import store from "./redux/store";
export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaView style={styles.container}>
        <Text style={styles.mainTitle}>Search</Text>
        <View style={styles.listContainer}>
          <MyList />
        </View>
        <StatusBar style="auto" />
      </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    flex: 1,
    backgroundColor: "#c0c0c0",
    alignItems: "center",
    justifyContent: "space-around",
  },
  mainTitle: {
    fontSize: 30,
    padding: 20,
  },
  listContainer: {
    width: "100%",
    height: "90%",
    alignItems: "center",
    // padding: 40,
  },
});
