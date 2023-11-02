import React, { useContext, useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import DetalleRopa from "../components/detalleRopa";
import GlobalApi from "../services/GlobalApi";

export default function DetalleConjunto() {
  const [data, setData] = useState([]);
  const [detalle, setDetalle] = useState([]);
  useEffect(() => {
    getRopas();
  }, []);

  const getRopas = async () => {
    const respueta = (await GlobalApi.getDetalle()).data.data;
    setDetalle(respueta);
  };

  useEffect(() => {
    // Llama a esta función cuando detalle cambie
    getDetalle();
  }, [detalle]);

  const getDetalle = () => {
    if (detalle.length) {
      ropas = detalle.map((x) => {
        return x.attributes.ropas.data;
      });
      setData(...ropas);
    }
  };

  return (
    <View>
      {detalle.length ? (
        <View
          style={{
            maxWidth: 340,
            backgroundColor: "white",
            borderWidth: 1,
            borderRadius: 8,
            shadowColor: "black",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            marginBottom: 16,
            flexDirection: "column",
          }}
        >
          {console.log(detalle)}
          {detalle.map((attributes, id) => (
            <View style={{ padding: 16 }} key={id}>
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: "bold",
                  color: "gray",
                  width: 280,
                }}
              >
                {attributes.attributes.nombre}
              </Text>
              <Text style={{ marginTop: 8, fontSize: 14, color: "gray" }}>
                {attributes.attributes.descripcion}
              </Text>
            </View>
          ))}
          <View style={{ flex: 1, justifyContent: "center" }}>
            {data.map(
              ({ attributes, id }) => (
                <DetalleRopa key={id} {...attributes} />
              )
              // console.log(attributes)
            )}
          </View>
        </View>
      ) : (
        <View></View>
      )}
    </View>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });
