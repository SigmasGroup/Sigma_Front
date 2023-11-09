import { StatusBar } from "expo-status-bar";
import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import Detalle from "./Detalle";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Detalle />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
