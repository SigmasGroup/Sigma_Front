import React, { useEffect, useState } from "react";
import { View, ScrollView, Text, StyleSheet } from "react-native";
import GlobalApi from "../services/GlobalApi";
import DetalleConjunto from "./detalleConjunto";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function DetalleGuardado() {
  const [detalle, setDetalle] = useState([]);

  useEffect(() => {
    getRopas();
  }, []);

  const getRopas = async () => {
    try {
      const storedUserId = await AsyncStorage.getItem("id");
      console.log(storedUserId);
      const response = await GlobalApi.getDetalleFavorite(storedUserId);
      setDetalle(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      // Puedes manejar el error de manera apropiada, como mostrar un mensaje al usuario.
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        {console.log(detalle)}
        {detalle.length ? (
          <View style={styles.centerContainer}>
            {detalle.map(({ attributes, id }) => (
              <DetalleConjunto key={id} atributes={attributes} id={id} />
            ))}
          </View>
        ) : (
          <View style={styles.centerContainer}>
            <Text style={{ fontSize: 20, textAlign: "center" }}>
              No se encontró ningún conjunto
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 100,
  },
});
