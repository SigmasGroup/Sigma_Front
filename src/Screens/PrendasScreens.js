import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from "react-native";
import prendas from "../prendas.json"; // Asegúrate de que la ruta sea correcta
import Card from "../components/Card";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";

const PrendasScreen = () => {
  const [selectedPrendas, setSelectedPrendas] = useState([]);
  const tiposPrenda = ["cabeza", "torso", "piernas", "pies"];
  const scrollViewRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(0);
  const navigation = useNavigation();

  // Función para manejar el movimiento al siguiente slider
  const handleNext = () => {
    if (currentPage < tiposPrenda.length - 1) {
      scrollViewRef.current.scrollTo({
        animated: true,
        x: (currentPage + 1) * Dimensions.get("window").width,
      });
      setCurrentPage(currentPage + 1);
    } else {
      navigation.navigate("home");
    }
  };

  // Función para manejar el desplazamiento entre sliders
  const handleScroll = (event) => {
    const slideIndex = Math.round(
      event.nativeEvent.contentOffset.x / Dimensions.get("window").width
    );
    setCurrentPage(slideIndex);
  };

  // Función para manejar la selección de tarjetas
  const handleSelectCard = (id) => {
    if (selectedPrendas.includes(id)) {
      setSelectedPrendas(selectedPrendas.filter((prendaId) => prendaId !== id));
    } else {
      setSelectedPrendas([...selectedPrendas, id]);
    }
  };

  // Función para filtrar las prendas por tipo
  const filtrarPrendasPorTipo = (tipo) => {
    return prendas.filter((prenda) => prenda.tipo === tipo);
  };

  // Función para dividir las prendas en lotes de 3 para cada fila
  const dividirPrendasPorFila = (prendas) => {
    const filas = [];
    for (let i = 0; i < prendas.length; i += 3) {
      filas.push(prendas.slice(i, i + 3));
    }
    return filas;
  };

  return (
    <LinearGradient colors={["#000", "#800080"]} style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        onScroll={handleScroll}
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}
      >
        {tiposPrenda.map((tipo, index) => (
          <View
            key={index}
            style={{
              width: Dimensions.get("window").width,
              paddingTop: 25,
              flex: 1,
            }}
          >
            <View style={styles.sliderContainer}>
              <Text style={styles.sliderTitle}>{tipo.toUpperCase()}</Text>
              <ScrollView showsVerticalScrollIndicator={false}>
                {dividirPrendasPorFila(filtrarPrendasPorTipo(tipo)).map(
                  (fila, filaIndex) => (
                    <View key={filaIndex} style={styles.rowContainer}>
                      {fila.map((prenda) => (
                        <TouchableOpacity
                          key={prenda.id}
                          style={[
                            styles.cardTouchable,
                            selectedPrendas.includes(prenda.id) &&
                              styles.selectedCard,
                          ]}
                          onPress={() => handleSelectCard(prenda.id)}
                        >
                          <Card
                            prenda={prenda}
                            selected={selectedPrendas.includes(prenda.id)}
                          />
                        </TouchableOpacity>
                      ))}
                    </View>
                  )
                )}
              </ScrollView>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Botón "Siguiente" */}
      <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
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
  sliderContainer: {
    flex: 1,
    padding: 10,
  },
  scrollViewContent: {
    alignItems: "center",
    zIndex: 10,
  },
  sliderTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "white", // Ajustamos el color del texto
  },
  cardTouchable: {
    // width: (Dimensions.get("window").width - 40) / 3, // Calcula el ancho de cada tarjeta (restando los márgenes)
    // // marginBottom: 10, // Agrega un margen inferior para separar las filas
    // // marginRight: 10, // Agrega un margen derecho para separar las tarjetas
  },
  selectedCard: {
    opacity: 0.5, // Hace la tarjeta translúcida cuando está seleccionada
    borderWidth: 2,
    borderColor: "orange",
    borderRadius: 5,
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between", // Alinea las tarjetas al espacio entre sí
    marginBottom: 10, // Agrega un margen inferior para separar las filas
  },
  nextButton: {
    backgroundColor: "#800080",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    margin: 10,
    alignSelf: "center",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 1,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default PrendasScreen;
