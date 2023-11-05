import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Button,
  ScrollView,
  StatusBar,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import GlobalApi from "../services/GlobalApi";

//en el usestate que dice setValue, se guardan los 'value' de los elementos seleccionados. en forma de lista []
//tambien se puede llamar una lista para el setItems, por ahora deje esa array de ejemplo
export default function SeleccionRopa() {
  const [openCabeza, setOpenCabeza] = useState(false);
  const [openTorso, setOpenTorso] = useState(false);
  const [openPiernas, setOpenPiernas] = useState(false);
  const [openPies, setOpenPies] = useState(false);
  const [value, setValue] = useState([]);
  const [cabeza, setItemsCabeza] = useState([
    { label: "Cabeza", value: "Cabeza" },
    { label: "Gorro de lana", value: "gorritodelana", parent: "Cabeza" },
    { label: "Yokie", value: "yokie", parent: "Cabeza" },
    {
      label: "Gorro de pescador",
      value: "gorritodepescador",
      parent: "Cabeza",
    },
  ]);
  const [torso, setItemsTorso] = useState([
    { label: "Torso", value: "Torso" },
    { label: "Polera", value: "polera", parent: "Torso" },
    { label: "Polo", value: "polo", parent: "Torso" },
    { label: "Camisa", value: "camisa", parent: "Torso" },
  ]);
  const [piernas, setItemsPiernas] = useState([
    { label: "Piernas", value: "piernas" },
    { label: "Jeans slim azules", value: "jeans1", parent: "piernas" },
    { label: "Jeans anchos negros", value: "jeans2", parent: "piernas" },
    { label: "Chinos azules", value: "chinosazules", parent: "piernas" },
  ]);
  const [pies, setItemsPies] = useState([
    { label: "Pies", value: "Pies" },
    { label: "Zapatos oxford", value: "zapatosoxford", parent: "Pies" },
    { label: "Zapatillas Adidas", value: "zapatillasadidas", parent: "Pies" },
    { label: "Jordan retro 4", value: "jordansitas", parent: "Pies" },
  ]);
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
      <View style={{ zIndex: openCabeza ? 1 : 0 }}>
        <DropDownPicker
          placeholder="Selecciona cabezas"
          categorySelectable={false}
          dropDownContainerStyle={{}}
          listParentLabelStyle={{
            fontWeight: "bold",
          }}
          listChildContainerStyle={{
            paddingLeft: 32,
          }}
          listItemContainer={{
            height: 100,
          }}
          open={openCabeza}
          value={value}
          items={cabeza}
          setOpen={setOpenCabeza}
          setValue={setValue}
          setItems={setItemsCabeza}
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
      <View style={{ zIndex: openTorso ? 1 : 0 }}>
        <DropDownPicker
          placeholder="Selecciona torsos"
          categorySelectable={false}
          dropDownContainerStyle={{}}
          listParentLabelStyle={{
            fontWeight: "bold",
          }}
          listChildContainerStyle={{
            paddingLeft: 32,
          }}
          listItemContainer={{
            height: 100,
          }}
          open={openTorso}
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
          categorySelectable={false}
          dropDownContainerStyle={{}}
          listParentLabelStyle={{
            fontWeight: "bold",
          }}
          listChildContainerStyle={{
            paddingLeft: 32,
          }}
          listItemContainer={{
            height: 100,
          }}
          open={openPiernas}
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
          categorySelectable={false}
          dropDownContainerStyle={{}}
          listParentLabelStyle={{
            fontWeight: "bold",
          }}
          listChildContainerStyle={{
            paddingLeft: 32,
          }}
          listItemContainer={{
            height: 100,
          }}
          open={openPies}
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
        onPress={() => console.log("wena")}
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
    paddingTop: StatusBar.currentHeight,
    paddingBottom: 64,
    paddingHorizontal: 15,
    justifyContent: "space-between",
  },
  texto: {
    fontSize: 16,
    textAlign: "center",
  },
});
