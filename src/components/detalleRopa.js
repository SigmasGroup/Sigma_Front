import React from "react";
import { View, Text, Image, ScrollView } from "react-native";
import GlobalApi from "../services/GlobalApi";

export default function DetalleRopa(attributes) {
  return (
    <View style={{}}>
      <View
        style={{
          borderWidth: 1,
          borderRadius: 10,
          height: 130,
          paddingHorizontal: 10,
          margin: 2,
          justifyContent: "space-around",
          width: 320,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            maxHeight: 90,
          }}
        >
          {/* <Image
            src={GlobalApi.getImg({ attributes })}
            style={{
              width: 64,
              height: 64,
              borderRadius: 32,
            }}
          /> */}
          {console.log(attributes.img.data)}
          <View style={{ flex: 1, marginHorizontal: 12 }}>
            <Text style={{ fontSize: 16, fontWeight: "bold", color: "gray" }}>
              {attributes.nombre}
            </Text>
            <Text style={{ fontSize: 14, color: "gray" }}>
              {attributes.descripcion}
            </Text>
          </View>
          <Text style={{ fontSize: 16, fontWeight: "bold", color: "gray" }}>
            {attributes.color}
          </Text>
        </View>
      </View>
    </View>
  );
}
