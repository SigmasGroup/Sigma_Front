import React, { useContext, useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import DetalleRopa from "../components/detalleRopa";
import GlobalApi from "../services/GlobalApi";

export default function DetalleConjunto() {
  const [data, setData] = useState([]);
  useEffect(() => {
    getRopas();
  }, []);

  const getRopas = async () => {
    const res = (await GlobalApi.getRopas()).data.data;
    setData(res);
  };

  return (
    <View
      style={{
        maxWidth: 320,
        backgroundColor: "white",
        borderWidth: 1,
        borderColor: "gray",
        borderRadius: 8,
        shadowColor: "black",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        marginBottom: 16,
      }}
    >
      <TouchableOpacity
        onPress={() => {
          /* Add your navigation action here */
        }}
      >
        {/* <Image
          source={require("")}
          style={{ borderTopLeftRadius: 8, borderTopRightRadius: 8 }}
        /> */}
      </TouchableOpacity>
      <View style={{ padding: 16 }}>
        <TouchableOpacity
          onPress={() => {
            /* Add your navigation action here */
          }}
        >
          <Text style={{ fontSize: 24, fontWeight: "bold", color: "gray" }}>
            Noteworthy technology acquisitions 2021
          </Text>
        </TouchableOpacity>
        <Text style={{ marginTop: 8, fontSize: 14, color: "gray" }}>
          Here are the biggest enterprise technology acquisitions of 2021 so
          far, in reverse chronological order.
        </Text>
      </View>
      <View>
        {data.map(({ attributes, id }) => (
          <DetalleRopa key={id} {...attributes} />
        ))}
      </View>
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
