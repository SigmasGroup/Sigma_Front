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

const Login = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    checkIfLoggedIn();
    checkEmail();
  }, []);
  useEffect(() => {
    checkEmail();
  }, [email]);

  const checkIfLoggedIn = async () => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      navigation.replace("home");
    }
  };

  checkEmail = () => {
    if (email.includes("@") !== true && email.length >= 1) {
      setError("El correo electrónico debe contener un '@'");
    } else {
      console.log("lala");
      setError("");
    }
  };

  const handleLogin = async () => {
    try {
      const response = await GlobalApi.postUserLogin(email, password);
      console.log(response.data);

      if (response.data && response.data.jwt) {
        await AsyncStorage.setItem("token", response.data.jwt);
        await AsyncStorage.setItem("id", response.data.user.id.toString());

        navigation.replace("home");
      } else {
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
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Tu email</Text>
          <TextInput
            style={styles.input}
            placeholder="nombre@email.cl"
            onChangeText={(text) => {
              setEmail(text);
              setError("");
            }}
          />
          {console.log(email.includes("@"))}
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
        <TouchableOpacity
          style={styles.button}
          onPress={handleLogin}
          disabled={(error != "" && email < 1) || password.length < 1}
        >
          <Text style={styles.buttonText}>Iniciar Sesión</Text>
        </TouchableOpacity>
        <Text style={styles.registerText}>
          ¿No estás registrado?{" "}
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

export default Login;
