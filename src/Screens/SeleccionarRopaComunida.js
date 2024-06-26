import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  Button,
  StatusBar,
  TextInput,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import GlobalApi from "../services/GlobalApi";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const MIN_TITULO_LENGTH = 3;
const MAX_TITULO_LENGTH = 30;
const MIN_DESCRIPCION_LENGTH = 0;
const MAX_DESCRIPCION_LENGTH = 200;

//en el usestate que dice setValue, se guardan los 'value' de los elementos seleccionados. en forma de lista []
//tambien se puede llamar una lista para el setItems, por ahora deje esa array de ejemplo
export default function SeleccionRopaComunida() {
  const [value, setValue] = useState([]);
  const [openTorso, setOpenTorso] = useState(false);
  const [openPiernas, setOpenPiernas] = useState(false);
  const [openPies, setOpenPies] = useState(false);
  const [titulo, setTitulo] = useState(""); // Nuevo state para el título
  const [descripcion, setDescripcion] = useState(""); // Nuevo state para la descripción
  const [tituloError, setTituloError] = useState(null); // Nuevo state para el mensaje de error del título
  const [descripcionError, setDescripcionError] = useState(null); // Nuevo state para el mensaje de error de la descripción
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

  const handleCreacion = async () => {
    // Limpiar mensajes de error antes de realizar la validación
    setTituloError(null);
    setDescripcionError(null);

    try {
      if (
        titulo.length < MIN_TITULO_LENGTH ||
        titulo.length > MAX_TITULO_LENGTH
      ) {
        setTituloError("El título debe tener entre 3 y 30 caracteres.");
        return;
      }

      if (
        descripcion.length < MIN_DESCRIPCION_LENGTH ||
        descripcion.length > MAX_DESCRIPCION_LENGTH
      ) {
        setDescripcionError(
          "La descripción debe tener entre 10 y 200 caracteres."
        );
        return;
      }
      const storedUserId = await AsyncStorage.getItem("id");
      const respuesta = await GlobalApi.postConjunto(
        titulo,
        descripcion,
        value,
        storedUserId
      );

      if (respuesta && respuesta.data) {
        const datos = respuesta.data;
        navigation.navigate("Detalle Unico", { data: datos.data.id });
        setValue([]);
        setTitulo("");
        setDescripcion("");
      } else {
        console.warn("La respuesta del servidor no contiene datos.");
      }
    } catch (error) {
      console.error("Error de creación:", error);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.texto}>
        Selecciona tus prendas favoritas para que nosotros te recomendemos el
        outfit!
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Título"
        value={titulo}
        onChangeText={(text) => {
          setTitulo(text);
          setTituloError(null);
        }}
      />
      {tituloError && <Text style={styles.errorText}>{tituloError}</Text>}

      <TextInput
        style={styles.input}
        placeholder="Descripción"
        value={descripcion}
        onChangeText={(text) => {
          setDescripcion(text);
          setDescripcionError(null);
        }}
      />
      {descripcionError && (
        <Text style={styles.errorText}>{descripcionError}</Text>
      )}

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
          max={4}
          min={1}
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
          max={4}
          min={1}
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
          max={4}
          min={1}
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
        onPress={handleCreacion}
        disabled={!titulo || value.length < 3}
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
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    width: "100%",
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginLeft: 5,
  },
});
