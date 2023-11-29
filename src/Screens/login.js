import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import GlobalApi from "../services/GlobalApi";
import AsyncStorage from "@react-native-async-storage/async-storage";

// const navigation = useNavigation();

const Login = () => {
  const navigation = useNavigation();
  // Tu función para iniciar sesión utilizando la configuración de la API
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    checkIfLoggedIn();
  }, []); // El segundo parámetro vacío asegura que el efecto se ejecute solo una vez al montar el componente

  const checkIfLoggedIn = async () => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      // Si hay un token, navega directamente a la pantalla principal
      navigation.replace("home");
    }
  };

  const handleLogin = async () => {
    try {
      const response = await GlobalApi.postUserLogin(email, password);
      console.log("id", response.data.user.id);
      // Verificar si la respuesta contiene un token de acceso
      if (response.data && response.data.jwt) {
        // Guardar el token en AsyncStorage para su uso posterior
        await AsyncStorage.setItem("token", response.data.jwt);
        await AsyncStorage.setItem("id", response.data.user.id.toString());

        // Navegar a la pantalla principal
        navigation.replace("home");
      } else {
        // Si la respuesta no contiene un token, puedes manejarlo como un error de inicio de sesión
        Alert.alert("Correo electrónico o contraseña incorrectos");
      }
    } catch (error) {
      console.error("Error de registro:", error);
      // Aquí puedes manejar el error, mostrar un mensaje de error, etc.
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require("../../assets/Sigma2.png")} style={styles.image} />
      <View style={styles.card}>
        {/* <Text style={styles.title}>Inicia Sesion En Sigma!</Text> */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Tu email</Text>
          <TextInput
            style={styles.input}
            placeholder="nombre@email.cl"
            onChangeText={(text) => setEmail(text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Tu contrasena</Text>
          <TextInput
            style={styles.input}
            placeholder="•••••••••••"
            secureTextEntry={true}
            onChangeText={(text) => setPassword(text)}
          />
        </View>
        {/* <View style={styles.forgotPasswordContainer}>
          <Text style={styles.forgotPassword}>Olvidaste tu contrasena?</Text>
        </View> */}
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Iniciar Sesion</Text>
        </TouchableOpacity>
        <Text style={styles.registerText}>
          No estas registrado?{" "}
          <Text
            style={styles.registerLink}
            onPress={() => navigation.replace("registro")}
          >
            Crear cuenta
          </Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    flexWrap: "wrap",
    alignContent: "center",
    justifyContent: "center",
    backgroundColor: "#F0F0F0",
  },
  card: {
    width: "100%",
    height: "60%",
    maxWidth: 360,
    padding: 16,
    backgroundColor: "#F0F0F0",
    marginBottom: 16,
    borderRadius: 15,
    shadowColor: "#F0F0F0",
    paddingTop: 0,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#b880e7",
    textShadowRadius: 1.5,
    textShadowColor: "black",
  },
  inputContainer: {
    marginTop: 96,
  },
  label: {
    marginBottom: 4,
    fontSize: 14,
    fontWeight: "bold",
    color: "#0F0F0F",
  },
  input: {
    backgroundColor: "#F0F0F0",
    borderBottomWidth: 1,
    borderColor: "gray",
    color: "gray",
    fontSize: 14,
    borderRadius: 8,
    padding: 10,
    marginBottom: 8,
  },
  forgotPasswordContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 64,
  },
  forgotPassword: {
    marginLeft: "auto",
    fontSize: 14,
    color: "blue",
    textDecorationLine: "underline",
  },
  button: {
    backgroundColor: "#0F0F0F",
    marginTop: 16,
    borderRadius: 8,
    alignItems: "center",
    paddingVertical: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  registerText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#0F0F0F",
    marginTop: 64,
  },
  registerLink: {
    color: "blue",
    textDecorationLine: "underline",
  },
  image: {
    width: "100%",
    height: 100,
    justifyContent: "center",
  },
});

export default Login;
