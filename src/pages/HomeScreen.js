import { StatusBar } from "expo-status-bar";
import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import GlobalApi from "../services/GlobalApi";
import DetalleConjunto from "./Detalle";
import SeleccionRopa from "./SeleccionRopa";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <DetalleConjunto />
    </View>
  );

  // return <View style={styles.container}></View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
