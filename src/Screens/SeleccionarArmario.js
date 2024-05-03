import React from "react";
import prendas from "../prendas.json"; // Asegúrate de que la ruta sea correcta
import { StyleSheet, View } from "react-native";
import SeleccionPrendas from "../components/SeleccionPrendas";
const SeleccionArmario = () => {
  return <SeleccionPrendas prendas={prendas} tipo={"armario"} />;
};

export default SeleccionArmario;
