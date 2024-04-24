import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const Card = ({ prenda }) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: prenda.img }} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    // flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    marginHorizontal: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 5,
  },
  details: {
    flex: 1,
    marginLeft: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  info: {
    fontSize: 14,
    marginBottom: 3,
  },
});

export default Card;
