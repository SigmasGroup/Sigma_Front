import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import SeleccionRopaComunida from "./SeleccionarRopaComunida";

export default function Puntuar() {
  return (
    <View style={styles.container}>
      <SeleccionRopaComunida />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
