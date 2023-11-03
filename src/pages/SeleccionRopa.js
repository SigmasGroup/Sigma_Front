import React, { useState } from "react";
import { View, StyleSheet, Text, Button } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

//en el usestate que dice setValue, se guardan los 'value' de los elementos seleccionados. en forma de lista []
//tambien se puede llamar una lista para el setItems, por ahora deje esa array de ejemplo
export default function SeleccionRopa() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState([]);
  const [items, setItems] = useState([
    { label: "Cabeza", value: "Cabeza" },
    { label: "Gorro de lana", value: "gorritodelana", parent: "Cabeza" },
    { label: "Yokie", value: "yokie", parent: "Cabeza" },
    {
      label: "Gorro de pescador",
      value: "gorritodepescador",
      parent: "Cabeza",
    },

    { label: "Torso", value: "Torso" },
    { label: "Polera", value: "polera", parent: "Torso" },
    { label: "Polo", value: "polo", parent: "Torso" },
    { label: "Camisa", value: "camisa", parent: "Torso" },

    { label: "Piernas", value: "piernas" },
    { label: "Jeans slim azules", value: "jeans1", parent: "piernas" },
    { label: "Jeans anchos negros", value: "jeans2", parent: "piernas" },
    { label: "Chinos azules", value: "chinosazules", parent: "piernas" },

    { label: "Pies", value: "Pies" },
    { label: "Zapatos oxford", value: "zapatosoxford", parent: "Pies" },
    { label: "Zapatillas Adidas", value: "zapatillasadidas", parent: "Pies" },
    { label: "Jordan retro 4", value: "jordansitas", parent: "Pies" },
  ]);

  return (
    <View style={styles.container}>
      <Text style={styles.texto}>
        Selecciona tus prendas favoritas para que nosotros te recomendemos el
        outfit!
      </Text>
      <DropDownPicker
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
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
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
    paddingTop: 64,
    paddingBottom: 64,
    paddingHorizontal: 15,
    justifyContent: "space-between",
  },
  texto: {
    fontSize: 16,
    textAlign: "center",
  },
});
