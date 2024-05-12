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
import GlobalApi from "../services/GlobalApi";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SeleccionRopa() {
  const [ropas, setRopas] = useState([]);
  useEffect(() => {
    getRopas();
  }, []);
  const getRopas = async () => {
    const storedUserId = await AsyncStorage.getItem("id");
    const respueta = (await GlobalApi.getRopasUser(storedUserId)).data.data;
    setRopas(respueta);
  };
  return (
    <View style={styles.container}>
      <SeleccionPrendas tipo={"detalle"} respuesta={ropas} />
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
