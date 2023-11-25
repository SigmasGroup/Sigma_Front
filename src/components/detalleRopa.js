import React from "react";
import { View, Text, Image, ScrollView, StyleSheet } from "react-native";
import GlobalApi from "../services/GlobalApi";

export default function DetalleRopa(attributes) {
  const img = GlobalApi.getImg({ attributes });
  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        <View style={styles.rowContainer}>
          <Image src={GlobalApi.getImg({ attributes })} style={styles.image} />
          <View style={styles.textContainer}>
            <Text style={styles.name}>{attributes.nombre}</Text>
            <Text style={styles.description}>{attributes.descripcion}</Text>
          </View>
          <Text style={styles.color}>{attributes.color}</Text>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {},
  cardContainer: {
    borderWidth: 1,
    borderRadius: 10,
    height: 130,
    paddingHorizontal: 10,
    margin: 2,
    justifyContent: "space-around",
    width: 320,
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    maxHeight: 90,
  },
  image: {
    width: 64,
    height: 64,
    borderRadius: 32,
  },
  textContainer: {
    flex: 1,
    marginHorizontal: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    color: "gray",
  },
  description: {
    fontSize: 14,
    color: "gray",
  },
  color: {
    fontSize: 16,
    fontWeight: "bold",
    color: "gray",
  },
});
