import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import GlobalApi from "../services/GlobalApi";
import Ionicons from "@expo/vector-icons/Ionicons";

//en el usestate que dice setValue, se guardan los 'value' de los elementos seleccionados. en forma de lista []
//tambien se puede llamar una lista para el setItems, por ahora deje esa array de ejemplo
export default function MyAcount() {
  const [userId, setUserId] = useState();
  const [user, setUser] = useState();
  const navigation = useNavigation();
  useEffect(() => {
    // Función para obtener el ID del usuario al cargar la pantalla
    const getStoredUserId = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem("id");
        console.log("id", storedUserId);
        const respueta = (await GlobalApi.getUser(storedUserId)).data.username;
        setUser(respueta);
        // setUserId(storedUserId);
      } catch (error) {
        console.error("Error al obtener el ID del usuario:", error);
      }
    };
    // const getUser = async () => {
    //   console.log(userId);

    //   console.log("data", respueta);
    // };

    getStoredUserId();
    // getUser();
  }, []);

  const handleLogout = async () => {
    // Borrar el token de AsyncStorage al cerrar sesión
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("id");
    // Redirigir a la pantalla de inicio de sesión
    navigation.replace("login");
  };

  const editUser = async () => {
    // Borrar el token de AsyncStorage al cerrar sesión
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("id");
    // Redirigir a la pantalla de inicio de sesión
    navigation.replace("editUser");
  };

  return (
    <View style={styles.container}>
      <Ionicons name="person" size={80} color="black" />
      <Text style={styles.title}>Mi cuenta</Text>
      <TouchableOpacity style={styles.button} onPress={editUser}>
        <Text style={styles.buttonText}>Editar Cuenta</Text>
      </TouchableOpacity>
      <Text style={styles.title}>{user}</Text>

      {/* Botón para cerrar sesión */}
      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Cerrar Sesión</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F0F0F0",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: "50%",
    marginTop: 40,
  },
  button: {
    backgroundColor: "#0F0F0F",
    marginTop: 16,
    borderRadius: 8,
    alignItems: "center",
    paddingVertical: 10,
    width: 200,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
