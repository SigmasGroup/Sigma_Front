import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";

// const navigation = useNavigation();

const Login = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Image source={require("../../assets/Sigma2.png")} style={styles.image} />
      <View style={styles.card}>
        {/* <Text style={styles.title}>Inicia Sesion En Sigma!</Text> */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Tu email</Text>
          <TextInput style={styles.input} placeholder="nombre@email.cl" />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Tu contrasena</Text>
          <TextInput
            style={styles.input}
            placeholder="•••••••••••"
            secureTextEntry={true}
          />
        </View>
        <View style={styles.forgotPasswordContainer}>
          <Text style={styles.forgotPassword}>Olvidaste tu contrasena?</Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.replace("home")}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Iniciar Sesion</Text>
        </TouchableOpacity>
        <Text style={styles.registerText}>
          No estas registrado?{" "}
          <Text style={styles.registerLink}>Crear cuenta</Text>
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
