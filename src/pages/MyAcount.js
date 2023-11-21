import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";

import SeleccionRopa from "./SeleccionRopa";

//en el usestate que dice setValue, se guardan los 'value' de los elementos seleccionados. en forma de lista []
//tambien se puede llamar una lista para el setItems, por ahora deje esa array de ejemplo
export default function MyAcount() {
  return (
    //
    <View style={{ flex: 1 }}>
      <SeleccionRopa />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    alignItems: "center",
    justifyContent: "top",

    paddingBottom: 64,
    paddingHorizontal: 15,
    justifyContent: "space-between",
  },
  texto: {
    fontSize: 16,
    textAlign: "center",
  },
});
