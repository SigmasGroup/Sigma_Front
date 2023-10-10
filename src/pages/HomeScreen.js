import { StatusBar } from "expo-status-bar";
import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import GlobalApi from "../services/GlobalApi";

export default function HomeScreen() {
  const [data, setData] = useState();

  useEffect(() => {
    getRopas();
  }, []);

  const getRopas = async () => {
    const res = (await GlobalApi.getRopas()).data.data;
    console.log(res);
  };

  return (
    <View style={styles.container}>
      <Text>lala</Text>
      <StatusBar style="auto" />
    </View>
  );

  // return <View style={styles.container}></View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
