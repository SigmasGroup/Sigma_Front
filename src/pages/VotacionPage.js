import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet, ScrollView } from "react-native";
import GlobalApi from "../services/GlobalApi";
import DetalleConjunto from "../components/detalleConjunto";

const VotacionPage = () => {
  const [conjuntos, setConjuntos] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [prendas, setPrendas] = useState([]);

  useEffect(() => {
    cargarConjuntos();
  }, []);

  const cargarConjuntos = async () => {
    try {
      const respuesta = await GlobalApi.getDetalle();

      if (respuesta.ok) {
        setConjuntos(respuesta.data.data);
        cargarPrendas(respuesta.data.data);
      } else {
        console.error("Error al cargar los conjuntos");
      }
    } catch (error) {
      console.error("Error al obtener los conjuntos:", error);
    }
  };

  const cargarPrendas = async (conjuntos) => {
    const conjuntoActual = conjuntos[currentIndex];

    try {
      const respuesta = await GlobalApi.getRopas(conjuntoActual.id);

      if (respuesta.ok) {
        setPrendas(respuesta.data.data);
      } else {
        console.error("Error al cargar las prendas");
      }
    } catch (error) {
      console.error("Error al obtener las prendas:", error);
    }
  };

  const handleLike = async () => {
    const conjuntoActual = conjuntos[currentIndex];
    await GlobalApi.actualizarPuntuacion(
      conjuntoActual.id,
      conjuntoActual.attributes.puntaje + 1
    );
    setCurrentIndex(currentIndex + 1);
    cargarPrendas(conjuntos);
  };

  const handlePass = () => {
    setCurrentIndex(currentIndex + 1);
    cargarPrendas(conjuntos);
  };

  const handleDislike = async () => {
    const conjuntoActual = conjuntos[currentIndex];
    await GlobalApi.actualizarPuntuacion(
      conjuntoActual.id,
      conjuntoActual.attributes.puntaje - 1
    );
    setCurrentIndex(currentIndex + 1);
    cargarPrendas(conjuntos);
  };

  if (conjuntos.length === 0 || prendas.length === 0) {
    return <Text>Cargando conjuntos...</Text>;
  }

  if (currentIndex >= conjuntos.length) {
    return <Text>No hay más conjuntos para votar.</Text>;
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <DetalleConjunto
          {...conjuntos[currentIndex].attributes}
          prendas={prendas}
        />

        <Button title="Like" onPress={handleLike} />
        <Button title="Pass" onPress={handlePass} />
        <Button title="Dislike" onPress={handleDislike} />
      </View>
    </ScrollView>
  );
};

export default VotacionPage;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    alignItems: "center",
    justifyContent: "top",
    paddingHorizontal: 10,
    justifyContent: "space-evenly",
  },
});
