import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import VotacionPage from "../components/VotacionPage";

export default function Puntuar() {
  return (
    <View style={styles.container}>
      <VotacionPage />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
