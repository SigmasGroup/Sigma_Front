import React, { useEffect, useState } from "react";
import { Image, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import GlobalApi from "../services/GlobalApi";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as ImagePicker from "expo-image-picker";

export default function MyAcount() {
  const [user, setUser] = useState();
  const [hasGalleryPermission, setHasGalleryPermissions] = useState(null);
  const [image, setImage] = useState(null);
  const navigation = useNavigation();

  const handleLogout = async () => {
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("id");
    navigation.replace("login");
  };

  useEffect(() => {
    const getStoredUserId = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem("id");
        const respueta = (await GlobalApi.getUser(storedUserId)).data.username;
        setUser(respueta);
      } catch (error) {
        console.error("Error al obtener el ID del usuario:", error);
      }
    };
    getStoredUserId();
  }, []);

  useEffect(() => {
    (async () => {
      const galleryStatus =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermissions(galleryStatus.status === "granted");
    })();
  }, []);

  useEffect(() => {
    const loadProfileImage = async () => {
      try {
        const storedImage = await AsyncStorage.getItem("profileImage");
        if (storedImage) {
          setImage(storedImage);
        }
      } catch (error) {
        console.error("Error al cargar la imagen desde AsyncStorage:", error);
      }
    };

    loadProfileImage();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.uri);

      // Guardar la imagen en AsyncStorage
      try {
        await AsyncStorage.setItem("profileImage", result.uri);
      } catch (error) {
        console.error("Error al guardar la imagen en AsyncStorage:", error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: image }} style={[styles.image]} />
      <TouchableOpacity style={styles.cambutton} onPress={pickImage}>
        <Ionicons name="camera-sharp" size={30} color="white" />
      </TouchableOpacity>
      <Text style={styles.title}>{user}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("DetalleGuardado")}
      >
        <Text style={styles.buttonText}>conjuntos guardados</Text>
      </TouchableOpacity>
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
  cambutton: {
    backgroundColor: "#0F0F0F",
    marginTop: -48,
    marginLeft: 124,
    borderRadius: 75,
    alignItems: "center",
    paddingVertical: 10,
    width: 50,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  image: {
    borderRadius: 75,
    width: 150,
    height: 150,
    borderColor: "#000000",
    borderWidth: 5,
  },
});
