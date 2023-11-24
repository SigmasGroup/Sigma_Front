import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  StyleSheet,
} from "react-native";

import GlobalApi from "../services/GlobalApi";
import DetalleConjunto from "../components/detalleConjunto";

export default function DetalleUnico({ route }) {
  const [detalle, setDetalle] = useState([]);
  useEffect(() => {
    // Obtén los datos de la ruta (route.params.data)
    const datos = route.params?.data;

    // Verifica si hay datos antes de llamar a getRopas
    if (datos) {
      console.log("Datos recibidos en Detalle:", datos);
      getRopas(datos);
    }
  }, []);

  const getRopas = async (id) => {
    const respueta = (await GlobalApi.getDetalleUnico(id)).data.data;
    console.log("lala");
    setDetalle([respueta]);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {detalle.length ? (
          <View style={styles.centerContainer}>
            {detalle.map(({ attributes, id }) => (
              <DetalleConjunto key={id} {...attributes} />
            ))}
          </View>
        ) : (
          <View></View>
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
