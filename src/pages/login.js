import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";

// const navigation = useNavigation();

const Login = () => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 16,
        flexWrap: "wrap",
        alignContent: "center",
        justifyContent: "center",
      }}
    >
      <View
        style={{
          width: "100%",
          maxWidth: 320,
          padding: 16,
          backgroundColor: "white",
          borderWidth: 1,
          borderColor: "gray",
          borderRadius: 8,
          shadowColor: "black",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          marginBottom: 16,
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: "bold", color: "gray" }}>
          Sign in to our platform
        </Text>
        <View style={{ marginTop: 16 }}>
          <Text
            style={{
              marginBottom: 4,
              fontSize: 14,
              fontWeight: "bold",
              color: "gray",
            }}
          >
            Your email
          </Text>
          <TextInput
            style={{
              backgroundColor: "#F0F0F0",
              borderWidth: 1,
              borderColor: "gray",
              color: "gray",
              fontSize: 14,
              borderRadius: 8,
              padding: 10,
              marginBottom: 8,
            }}
            placeholder="name@company.com"
          />
        </View>
        <View style={{ marginTop: 16 }}>
          <Text
            style={{
              marginBottom: 4,
              fontSize: 14,
              fontWeight: "bold",
              color: "gray",
            }}
          >
            Your password
          </Text>
          <TextInput
            style={{
              backgroundColor: "#F0F0F0",
              borderWidth: 1,
              borderColor: "gray",
              color: "gray",
              fontSize: 14,
              borderRadius: 8,
              padding: 10,
              marginBottom: 8,
            }}
            placeholder="••••••••"
            secureTextEntry={true}
          />
        </View>
        <View
          style={{ flexDirection: "row", alignItems: "center", marginTop: 16 }}
        >
          <Text
            style={{
              marginLeft: "auto",
              fontSize: 14,
              color: "blue",
              textDecorationLine: "underline",
            }}
          >
            Lost Password?
          </Text>
        </View>
        <TouchableOpacity
          onPress={(e) => navigation.replace("home")}
          style={{
            backgroundColor: "blue",
            marginTop: 16,
            borderRadius: 8,
            alignItems: "center",
            paddingVertical: 10,
          }}
        >
          <Text style={{ color: "white", fontSize: 14, fontWeight: "bold" }}>
            Login to your account
          </Text>
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 14,
            fontWeight: "bold",
            color: "gray",
            marginTop: 16,
          }}
        >
          Not registered?{" "}
          <Text style={{ color: "blue", textDecorationLine: "underline" }}>
            Create account
          </Text>
        </Text>
      </View>
    </View>
  );
};

export default Login;
