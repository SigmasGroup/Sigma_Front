import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import GlobalApi from "../services/GlobalApi";
import DetalleConjunto from "./detalleConjunto";
import { Octicons } from "@expo/vector-icons";

const VotacionPage = () => {
  const [conjuntos, setConjuntos] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const dato = false;
  useEffect(() => {
    cargarConjuntos();
  }, [currentIndex]);

  const cargarConjuntos = async () => {
    try {
      const respuesta = await GlobalApi.getDetalleComunidad();

      if (respuesta.status === 200) {
        setConjuntos(respuesta.data.data);
        // cargarPrendas(respuesta.data.data);
      } else {
        console.error("Error al cargar los conjuntos");
      }
    } catch (error) {
      console.error("Error al obtener los conjuntos:", error);
    }
  };

  const handleLike = async () => {
    if (currentIndex < conjuntos.length - 1) {
      const conjuntoActual = conjuntos[currentIndex];
      console.log(currentIndex);
      await GlobalApi.putPuntuacion(
        conjuntoActual.id,
        conjuntoActual.attributes.puntaje + 1
      );
      if (conjuntoActual.attributes.puntaje + 1 >= 100) {
        await GlobalApi.putTipoConjunto(conjuntoActual.id);
      }
      setCurrentIndex(currentIndex + 1);
    } else {
      cargarConjuntos();
      Alert.alert("No hay más conjuntos para votar.");
    }
  };

  const handlePass = () => {
    if (currentIndex < conjuntos.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      cargarConjuntos();
      Alert.alert("No hay más conjuntos para votar.");
    }
  };

  const handleDislike = async () => {
    if (currentIndex < conjuntos.length - 1) {
      const conjuntoActual = conjuntos[currentIndex];
      await GlobalApi.putPuntuacion(
        conjuntoActual.id,
        conjuntoActual.attributes.puntaje - 1
      );
      setCurrentIndex(currentIndex + 1);
    } else {
      cargarConjuntos();
      Alert.alert("No hay más conjuntos para votar.");
    }
  };

  if (conjuntos.length === 0) {
    return <Text>Cargando conjuntos...</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={{ flex: 7, flexWrap: "wrap" }}>
        <DetalleConjunto
          atributes={conjuntos[currentIndex].attributes}
          id={conjuntos[currentIndex].id}
        />
      </View>

      <View style={styles.containerButton}>
        <TouchableOpacity style={styles.button} onPress={handleLike}>
          <Octicons name="thumbsup" size={30} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button2} onPress={handlePass}>
          <Octicons name="skip" size={30} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button3} onPress={handleDislike}>
          <Octicons name="thumbsdown" size={30} color="black" />
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
    marginHorizontal: 20,
  },
  button: {
    width: 50,
    paddingVertical: 10,
    backgroundColor: "#00FF00",
    borderRadius: 75,
    alignItems: "center",
    marginHorizontal: 20,
  },
  button2: {
    width: 50,
    paddingVertical: 10,
    backgroundColor: "#007CFF",
    borderRadius: 75,
    alignItems: "center",
    marginHorizontal: 20,
  },
  button3: {
    width: 50,
    paddingVertical: 10,
    backgroundColor: "#FF0000",
    borderRadius: 75,
    alignItems: "center",
    marginHorizontal: 20,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});
