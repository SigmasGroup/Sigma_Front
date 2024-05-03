import { LinearGradient } from "expo-linear-gradient";
import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";

const WelcomeScreen = ({ navigation }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const scrollViewRef = useRef();

  const handleNext = () => {
    if (currentPage < 2) {
      // Número total de slides menos 1
      scrollViewRef.current.scrollTo({
        animated: true,
        x: (currentPage + 1) * Dimensions.get("window").width,
      });
    } else {
      navigation.navigate("home"); // Redirige al usuario al login después del último slide
    }
  };

  const handleScroll = (event) => {
    const slideIndex = Math.round(
      event.nativeEvent.contentOffset.x / Dimensions.get("window").width
    );
    setCurrentPage(slideIndex);
  };

  return (
    <LinearGradient colors={["#000", "#800080"]} style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={200}
        decelerationRate="fast"
        onScroll={handleScroll}
        contentContainerStyle={styles.scrollViewContent}
      >
        {/* Slide 1 */}
        <View style={styles.slide}>
          <Text style={styles.slideText}>Slide 1</Text>
        </View>
        {/* Slide 2 */}
        <View style={styles.slide}>
          <Text style={styles.slideText}>Slide 2</Text>
        </View>
        {/* Slide 3 */}
        <View style={styles.slide}>
          <Text style={styles.slideText}>Slide 3</Text>
        </View>
        {/* Agrega más slides según sea necesario */}
      </ScrollView>

      {/* Indicadores de slide */}
      <View style={styles.indicatorContainer}>
        {[...Array(3)].map((_, index) => (
          <View
            key={index}
            style={[
              styles.indicator,
              index === currentPage ? styles.activeIndicator : null,
            ]}
          />
        ))}
      </View>

      {/* Botón Siguiente */}
      <TouchableOpacity style={styles.button} onPress={handleNext}>
        <Text style={styles.buttonText}>Siguiente</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  scrollViewContent: {
    alignItems: "center",
  },
  slide: {
    width: Dimensions.get("window").width - 40, // Ancho de la tarjeta (40 es el espacio horizontal)
    marginHorizontal: 20, // Espacio horizontal entre tarjetas
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    overflow: "hidden", // Para asegurarse de que el texto no sobresalga de la tarjeta
    backgroundColor: "#fff", // Color de fondo de la tarjeta
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    height: 350,
  },
  slideText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  indicatorContainer: {
    flexDirection: "row",
    marginTop: 20,
  },
  indicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#ccc",
    marginHorizontal: 5,
  },
  activeIndicator: {
    backgroundColor: "#800080",
  },
  button: {
    backgroundColor: "#800080",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 20,
    marginBottom: 100,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default WelcomeScreen;
