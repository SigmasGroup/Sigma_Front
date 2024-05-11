import React, { useEffect, useState } from "react";
import prendas from "../prendas.json"; // Asegúrate de que la ruta sea correcta
import { StyleSheet, View } from "react-native";
import SeleccionPrendas from "../components/SeleccionPrendas";
import GlobalApi from "../services/GlobalApi";
const SeleccionArmario = () => {
  const [ropas, setRopas] = useState([]);
  useEffect(() => {
    getRopas();
  }, []);
  const getRopas = async () => {
    const respueta = (await GlobalApi.getRopas()).data.data;
    setRopas(respueta);
  };
  return (
    <SeleccionPrendas prendas={prendas} tipo={"armario"} respuesta={ropas} />
  );
};

export default SeleccionArmario;
