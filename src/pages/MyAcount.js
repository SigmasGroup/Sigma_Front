import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

export default function MyAcount() {
  return (
    <View style={styles.container}>
      <Text>Cuenta</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
