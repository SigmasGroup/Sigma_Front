import React, { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import DetalleConjunto from "./detalleConjunto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import GlobalApi from "../services/GlobalApi";

export default function DetalleGuardado() {
  const [detalle, setDetalle] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getRopas();
  }, []);

  const getRopas = async () => {
    const storedUserId = await AsyncStorage.getItem("id");
    try {
      setLoading(true);
      const response = await GlobalApi.getDetalleFavorite(storedUserId);
      console.log("1", response.data.data);
      setDetalle(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateDetalle = async () => {
    await getRopas();
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        {loading ? (
          <View style={styles.centerContainer}>
            <ActivityIndicator size="large" color="#0000ff" />
            <Text style={{ fontSize: 16, textAlign: "center" }}>
              Buscando conjuntos...
            </Text>
          </View>
        ) : detalle.length ? (
          <View style={styles.centerContainer}>
            {detalle.map(({ attributes, id }) => (
              <DetalleConjunto
                key={id}
                atributes={attributes}
                id={id}
                updateDetalle={updateDetalle}
              />
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
