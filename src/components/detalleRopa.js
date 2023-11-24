import React from "react";
import { View, Text, Image, ScrollView, StyleSheet } from "react-native";
import GlobalApi from "../services/GlobalApi";

export default function DetalleRopa(attributes) {
  const img = GlobalApi.getImg({ attributes });
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.rowContainer}>
          <Image src={img} style={styles.image} />
          <View style={styles.textContainer}>
            <Text style={styles.title}>{attributes.nombre}</Text>
            <Text style={styles.description}>{attributes.descripcion}</Text>
          </View>
          <Text style={styles.color}>{attributes.color}</Text>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  card: {
    borderWidth: 1,
    borderRadius: 10,
    height: 130,
    paddingHorizontal: 10,
    justifyContent: "space-around",
    width: 320,
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
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
  title: {
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
