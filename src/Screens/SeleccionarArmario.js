import React, { useEffect, useState } from "react";
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
  return <SeleccionPrendas tipo={"armario"} respuesta={ropas} />;
};

export default SeleccionArmario;
