import React from "react";
import { View, Text, Image, ScrollView } from "react-native";

export default function DetalleRopa() {
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
            <Image
              source={require("../../assets/favicon.png")}
              style={{ width: 64, height: 64, borderRadius: 32 }}
            />
            <View style={{ flex: 1, marginLeft: 16 }}>
              <Text style={{ fontSize: 16, fontWeight: "bold", color: "gray" }}>
                Neil Sims
              </Text>
              <Text style={{ fontSize: 14, color: "gray" }}>
                email@windster.com
              </Text>
            </View>
            <Text style={{ fontSize: 16, fontWeight: "bold", color: "gray" }}>
              $320
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
