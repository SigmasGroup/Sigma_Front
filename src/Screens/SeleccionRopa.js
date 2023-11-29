import React, { useState, useCallback, useEffect } from "react";
import { View, StyleSheet, Text, Button, StatusBar } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import GlobalApi from "../services/GlobalApi";
import { useNavigation } from "@react-navigation/native";

//en el usestate que dice setValue, se guardan los 'value' de los elementos seleccionados. en forma de lista []
//tambien se puede llamar una lista para el setItems, por ahora deje esa array de ejemplo
export default function SeleccionRopa() {
  const [value, setValue] = useState([]);

  const [openTorso, setOpenTorso] = useState(false);
  const [openPiernas, setOpenPiernas] = useState(false);
  const [openPies, setOpenPies] = useState(false);
  const navigation = useNavigation();

  const onOpenTorso = useCallback(() => {
    setOpenPiernas(false);
    setOpenPies(false);
  }, []);
  const onOpenPiernas = useCallback(() => {
    setOpenTorso(false);
    setOpenPies(false);
  }, []);
  const onOpenPies = useCallback(() => {
    setOpenTorso(false);
    setOpenPiernas(false);
  }, []);

  const [torso, setItemsTorso] = useState([]);
  const [piernas, setItemsPiernas] = useState([]);
  const [pies, setItemsPies] = useState([]);
  useEffect(() => {
    getRopas();
  }, []);

  const getRopas = async () => {
    const respueta = (await GlobalApi.getRopas()).data.data;
    setItemsTorso(
      respueta
        .filter((attributes) => attributes.attributes.tipoPrenda === "troso")
        .map((attributes) => ({
          label: `${attributes.attributes.nombre}    ${attributes.attributes.color}    ${attributes.attributes.encaje}`,
          value: attributes.id,
        }))
    );

    setItemsPiernas(
      respueta
        .filter((attributes) => attributes.attributes.tipoPrenda === "piernas")
        .map((attributes) => ({
          label: `${attributes.attributes.nombre}    ${attributes.attributes.color}    ${attributes.attributes.encaje}`,
          value: attributes.id,
        }))
    );
    setItemsPies(
      respueta
        .filter((attributes) => attributes.attributes.tipoPrenda === "pies")
        .map((attributes) => ({
          label: `${attributes.attributes.nombre}    ${attributes.attributes.color}    ${attributes.attributes.encaje}`,
          value: attributes.id,
        }))
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.texto}>
        Selecciona tus prendas favoritas para que nosotros te recomendemos el
        outfit!
      </Text>
      <View style={{ zIndex: openTorso ? 1 : 0 }}>
        <DropDownPicker
          placeholder="Selecciona torsos"
          categorySelectable={true}
          dropDownContainerStyle={{}}
          listItemContainer={{
            height: 100,
          }}
          open={openTorso}
          onOpen={onOpenTorso}
          value={value}
          items={torso}
          setOpen={setOpenTorso}
          setValue={setValue}
          setItems={setItemsTorso}
          theme="DARK"
          multiple={true}
          mode="BADGE"
          badgeDotColors={[
            "#e76f51",
            "#00b4d8",
            "#e9c46a",
            "#e76f51",
            "#8ac926",
            "#00b4d8",
            "#e9c46a",
          ]}
        />
      </View>
      <View style={{ zIndex: openPiernas ? 1 : 0 }}>
        <DropDownPicker
          placeholder="Selecciona partes de abajo"
          categorySelectable={true}
          dropDownContainerStyle={{}}
          listItemContainer={{
            height: 100,
          }}
          open={openPiernas}
          onOpen={onOpenPiernas}
          value={value}
          items={piernas}
          setOpen={setOpenPiernas}
          setValue={setValue}
          setItems={setItemsPiernas}
          theme="DARK"
          multiple={true}
          mode="BADGE"
          badgeDotColors={[
            "#e76f51",
            "#00b4d8",
            "#e9c46a",
            "#e76f51",
            "#8ac926",
            "#00b4d8",
            "#e9c46a",
          ]}
        />
      </View>
      <View style={{ zIndex: openPies ? 1 : 0 }}>
        <DropDownPicker
          placeholder="Selecciona calzados"
          categorySelectable={true}
          dropDownContainerStyle={{}}
          listItemContainer={{
            height: 100,
          }}
          open={openPies}
          onOpen={onOpenPies}
          value={value}
          items={pies}
          setOpen={setOpenPies}
          setValue={setValue}
          setItems={setItemsPies}
          theme="DARK"
          multiple={true}
          mode="BADGE"
          badgeDotColors={[
            "#e76f51",
            "#00b4d8",
            "#e9c46a",
            "#e76f51",
            "#8ac926",
            "#00b4d8",
            "#e9c46a",
          ]}
        />
      </View>
      <Button
        title="Crear Conjunto"
        color="#b880e7"
        onPress={() => navigation.navigate("Detalle")}
        disabled={value.length < 3}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    alignItems: "center",
    justifyContent: "top",
    paddingBottom: 64,
    paddingHorizontal: 15,
    justifyContent: "space-between",
  },
  texto: {
    fontSize: 16,
    textAlign: "center",
  },
});
