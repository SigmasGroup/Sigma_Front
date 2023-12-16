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

const Registro = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [error2, setError2] = useState("");

  useEffect(() => {
    checkEmail();
    checkPassword();
  }, [email, password]);

  checkEmail = () => {
    if (email.includes("@") !== true && email.length >= 1) {
      setError("El correo electrónico debe contener un '@'");
    } else {
      setError("");
    }
  };
  checkPassword = () => {
    if (password.length < 8 && password > 1) {
      setError2("La contraseña tene que ser como minimo de 8 caracteres");
    } else {
      setError2("");
    }
  };

  const handleRegistro = async () => {
    try {
      // Aquí realizamos la solicitud de registro usando el método postUser de GlobalApi
      const response = await GlobalApi.postUser(username, email, password);
      console.log(response.data);
      if (response.data && response.data.jwt) {
        await AsyncStorage.setItem("token", response.data.jwt);
        await AsyncStorage.setItem("id", response.data.user.id.toString());

        navigation.replace("home");
      } else {
        // Si la respuesta no contiene un token, puedes manejarlo como un error de inicio de sesión
        Alert.alert(
          "Correo electrónico o nombre de usuario ya a sido utulizado"
        );
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
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Tu nombre de usuario</Text>
          <TextInput
            style={styles.input}
            placeholder="Tu nombre de usuario"
            onChangeText={(text) => setUsername(text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Tu email</Text>
          <TextInput
            style={styles.input}
            placeholder="nombre@email.cl"
            onChangeText={(text) => setEmail(text)}
          />
        </View>
        {error !== "" && <Text style={styles.errorText}>{error}</Text>}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Tu contraseña</Text>
          <TextInput
            style={styles.input}
            placeholder="•••••••••••"
            secureTextEntry={true}
            onChangeText={(text) => setPassword(text)}
          />
        </View>
        {error2 !== "" && <Text style={styles.errorText}>{error2}</Text>}
        <TouchableOpacity
          onPress={handleRegistro}
          style={styles.button}
          disabled={
            (error != "" && email < 1) ||
            password.length < 8 ||
            username.length < 1
          }
        >
          <Text style={styles.buttonText}>Registrarse</Text>
        </TouchableOpacity>
        <Text style={styles.registerText}>
          ¿Ya tienes una cuenta?{" "}
          <Text
            style={styles.registerLink}
            onPress={() => navigation.replace("login")}
          >
            Iniciar sesión
          </Text>
        </Text>
      </View>
      {console.log(username, email, password)}
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
    marginTop: 38,
  },
  label: {
    marginBottom: 4,
    fontSize: 14,
    fontWeight: "bold",
    color: "#0F0F0F",
  },
  input: {
    backgroundColor: "#F0F0F0",
    borderWidth: 1,
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
  errorText: {
    color: "red",
    fontSize: 14,
    marginTop: 8,
  },
});

export default Registro;
