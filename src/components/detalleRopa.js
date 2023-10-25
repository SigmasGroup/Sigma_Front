import React from "react";
import { View, Text, Image, ScrollView } from "react-native";
import GlobalApi from "../services/GlobalApi";

export default function DetalleRopa(attributes) {
  return (
    <View>
      <ScrollView>
        <View style={{ borderBottomWidth: 1, borderColor: "gray" }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingVertical: 16,
            }}
          >
            {console.log(GlobalApi.getImg({ attributes }))}
            <Image
              src={GlobalApi.getImg({ attributes })}
              style={{ width: 64, height: 64, borderRadius: 32 }}
            />
            <View style={{ flex: 1, marginLeft: 16 }}>
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
      </ScrollView>
    </View>
  );
}
