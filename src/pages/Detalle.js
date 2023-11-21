import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";

import GlobalApi from "../services/GlobalApi";
import DetalleConjunto from "../components/detalleConjunto";

export default function Detalle() {
  const [data, setData] = useState([]);
  const [detalle, setDetalle] = useState([]);
  useEffect(() => {
    getRopas();
  }, []);

  const getRopas = async () => {
    const respueta = (await GlobalApi.getDetalle()).data.data;
    setDetalle(respueta);
  };

  return (
    <View>
      <ScrollView>
        {detalle.length ? (
          <View
            style={{
              flex: 1,
            }}
          >
            {/* <Carousel
              data={detalle}
              renderItem={detalle.map(({ attributes, id }) => (
                <DetalleConjunto key={id} {...attributes} />
              ))}
              sliderWidth={Dimensions.get("screen").width}
              itemWidth={500}
              layout="tinder"
            /> */}
            {detalle.map(({ attributes, id }) => (
              <DetalleConjunto key={id} {...attributes} />
            ))}
          </View>
        ) : (
          <View></View>
        )}
      </ScrollView>
    </View>
  );
}
