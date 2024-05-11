import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import GlobalApi from "../services/GlobalApi";

const Card = ({ prenda }) => {
  const img = GlobalApi.getImg(prenda);
  return (
    <View style={styles.card}>
      <Image source={{ uri: img }} style={styles.image} />
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
