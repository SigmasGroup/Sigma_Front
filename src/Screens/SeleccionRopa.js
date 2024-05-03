import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  Button,
  ScrollView,
  Dimensions,
} from "react-native";
import SeleccionPrendas from "../components/SeleccionPrendas";
import prendas from "../prendas.json"; // Asegúrate de que la ruta sea correcta

export default function SeleccionRopa() {
  return (
    <View style={styles.container}>
      <SeleccionPrendas prendas={prendas} tipo={"detalle"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  texto: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
});
