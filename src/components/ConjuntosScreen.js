import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const ConjuntoCard = ({ conjunto }) => {
  return (
    <View style={styles.card}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: conjunto.imagen }} style={styles.image} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{conjunto.titulo}</Text>
        <Text style={styles.description}>{conjunto.descripcion}</Text>
      </View>
    </View>
  );
};

const ConjuntosScreen = ({ conjuntos }) => {
  return (
    <View style={styles.container}>
      {conjuntos.map((conjunto, index) => (
        <ConjuntoCard key={index} conjunto={conjunto} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  imageContainer: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 200,
  },
  textContainer: {
    padding: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
  },
});

export default ConjuntosScreen;
