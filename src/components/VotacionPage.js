import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import GlobalApi from "../services/GlobalApi";
import DetalleConjunto from "./detalleConjunto";

const VotacionPage = () => {
  const [conjuntos, setConjuntos] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [prendas, setPrendas] = useState([]);

  useEffect(() => {
    cargarConjuntos();
  }, []);

  const cargarConjuntos = async () => {
    try {
      const respuesta = await GlobalApi.getDetalleComunidad();

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
    await GlobalApi.putPuntuacion(
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
    await GlobalApi.putPuntuacion(
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
    <View style={styles.container}>
      <View style={{ flex: 7, flexWrap: "wrap" }}>
        <DetalleConjunto
          {...conjuntos[currentIndex].attributes}
          prendas={prendas}
        />
      </View>

      <View style={styles.containerButton}>
        <TouchableOpacity style={styles.button} onPress={handleLike}>
          <Text style={styles.buttonText}>Like</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handlePass}>
          <Text style={styles.buttonText}>Pass</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleDislike}>
          <Text style={styles.buttonText}>Dislike</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default VotacionPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },
  containerButton: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 16,
    marginHorizontal: 20, // Ajusta el espacio horizontal entre los botones
  },
  button: {
    width: 100,
    paddingVertical: 10,
    backgroundColor: "blue", // Puedes personalizar el color de fondo
    borderRadius: 5,
    alignItems: "center",
    marginHorizontal: 10,
  },
  buttonText: {
    color: "white", // Puedes personalizar el color del texto
    fontWeight: "bold",
  },
});
