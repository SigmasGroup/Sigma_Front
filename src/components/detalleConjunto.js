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
      <View style={styles.cardContainer}>
        <View style={styles.contentContainer}>
          <Text style={styles.title}>{atributes.nombre}</Text>
          <Text style={styles.description}>{atributes.descripcion}</Text>
        </View>
        <View style={{ flex: 4, justifyContent: "center" }}>
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
    flex: 1,
  },
  cardContainer: {
    maxWidth: 340,
    backgroundColor: "white",
    borderWidth: 1,
    borderRadius: 8,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    marginBottom: 16,
    flexDirection: "column",
    flex: 2,
  },
  contentContainer: {
    padding: 16,
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "gray",
    maxWidth: 280,
  },
  description: {
    marginTop: 8,
    fontSize: 14,
    color: "gray",
  },
});
