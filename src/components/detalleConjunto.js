import GlobalApi from "../services/GlobalApi";
import DetalleRopa from "./detalleRopa";
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

export default function DetalleConjunto(atributes) {
  const [ropa, setRopa] = useState([]);
  const [conjuto, setconjunto] = useState([atributes]);
  useEffect(() => {
    getRopas();
  }, []);

  const getRopas = () => {
    if (conjuto.length) {
      datas = conjuto.map((x) => {
        return x.ropas.data;
      });
      setRopa(...datas);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{atributes.nombre}</Text>
          <Text style={styles.description}>{atributes.descripcion}</Text>
        </View>
        <View style={styles.ropaContainer}>
          {ropa.map(({ attributes, id }) => (
            <DetalleRopa key={id} {...attributes} />
          ))}
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    maxWidth: 500,
    marginBottom: 16,
  },
  card: {
    backgroundColor: "white",
    borderWidth: 1,
    borderRadius: 8,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
  },
  textContainer: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "gray",
  },
  description: {
    marginTop: 8,
    fontSize: 14,
    color: "gray",
  },
  ropaContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});
