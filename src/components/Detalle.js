import React, { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import GlobalApi from "../services/GlobalApi";
import DetalleConjunto from "./detalleConjunto";

export default function Detalle({ route }) {
  const value = route.params.data;
  const [detalle, setDetalle] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getRopas();
  }, []);

  const getRopas = async () => {
    try {
      setLoading(true); // Inicia la carga
      const response = await GlobalApi.getDetalleAdmin();
      const conjuntosFiltrados = filtrarConjuntos(response.data.data, value);
      setDetalle(conjuntosFiltrados);
      console.log("detalle", detalle);
    } catch (error) {
      console.error("Error fetching data:", error);
      // Puedes manejar el error de manera apropiada, como mostrar un mensaje al usuario.
    } finally {
      setLoading(false); // Finaliza la carga, ya sea con éxito o con error
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
        {loading ? (
          // Mientras carga la data, muestra el mensaje "Buscando conjuntos..."
          <View style={styles.centerContainer}>
            <ActivityIndicator size="large" color="#0000ff" />
            <Text style={{ fontSize: 16, textAlign: "center" }}>
              Buscando conjuntos...
            </Text>
          </View>
        ) : detalle.length ? (
          // Si hay datos en el response, mapea los detalles del conjunto
          <View style={styles.centerContainer}>
            {detalle.map(({ attributes, id }) => (
              <DetalleConjunto key={id} atributes={attributes} id={id} />
            ))}
            {console.log(detalle)}
          </View>
        ) : (
          // Si no hay datos en el response, muestra el mensaje "No se encontró ningún conjunto"
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
