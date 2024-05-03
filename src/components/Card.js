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
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 5,
  },
});

export default Card;
