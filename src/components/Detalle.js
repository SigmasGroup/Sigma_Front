import React, { useEffect, useState } from "react";
import { View, ScrollView, Text, StyleSheet } from "react-native";
import GlobalApi from "../services/GlobalApi";
import DetalleConjunto from "./detalleConjunto";

export default function Detalle({ route }) {
  const value = route.params.data;
  const [detalle, setDetalle] = useState([]);

  useEffect(() => {
    getRopas();
  }, []);

  const getRopas = async () => {
    try {
      const response = await GlobalApi.getDetalleAdmin();
      const conjuntosFiltrados = filtrarConjuntos(response.data.data, value);

      setDetalle(conjuntosFiltrados);
    } catch (error) {
      console.error("Error fetching data:", error);
      // Puedes manejar el error de manera apropiada, como mostrar un mensaje al usuario.
    }
  };

  const filtrarConjuntos = (conjuntos, valores) => {
    return conjuntos.filter((conjunto) => {
      const idsRopas = conjunto.attributes.ropas.data.map((ropa) => ropa.id);
      // Verifica si al menos 3 IDs de ropa coinciden con los valores en la lista
      const coincidencias = idsRopas.filter((id) => valores.includes(id));
      return coincidencias.length >= 3;
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
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
