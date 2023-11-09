import GlobalApi from "../services/GlobalApi";
import DetalleRopa from "./detalleRopa";
import React, { useContext, useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";

export default function DetalleConjunto(atributes) {
  const [ropa, setRopa] = useState([]);
  const [conjuto, setconjunto] = useState([atributes]);
  useEffect(() => {
    getRopas();
  }, []);

  const getRopas = () => {
    if (conjuto.length) {
      datas = conjuto.map((x) => {
        return x.ropas.data;
      });
      setRopa(...datas);
    }
  };

  return (
    <View>
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
          flex: 2,
        }}
      >
        <View style={{ padding: 16, flex: 2 }}>
          <Text
            style={{
              fontSize: 24,
              fontWeight: "bold",
              color: "gray",
              width: 280,
            }}
          >
            {atributes.nombre}
          </Text>
          <Text style={{ marginTop: 8, fontSize: 14, color: "gray" }}>
            {atributes.descripcion}
          </Text>
        </View>
        <View style={{ flex: 1, justifyContent: "center" }}>
          {ropa.map(({ attributes, id }) => (
            <DetalleRopa key={id} {...attributes} />
          ))}
        </View>
      </View>

      {console.log("atributes", ropa)}
      {console.log(conjuto)}
    </View>
  );
}
